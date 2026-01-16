import {
	type TaskStep,
	type TaskConfig,
	type TaskState,
	type TaskDecisions,
	type ComputedStep,
	type TaskPhase,
	type TaskProgress,
	TaskUserType,
} from './types';

// Derive decisions from completed steps that have decision values
export function deriveDecisions(steps: TaskStep[], completedIds: Set<string>): TaskDecisions {
	return steps
		.filter(step => step.isDecision && completedIds.has(step.id) && step.decisionValue !== undefined)
		.reduce((decisions, step) => {
			const key = step.outputs?.[0];
			return key ? {...decisions, [key]: step.decisionValue} : decisions;
		}, {} as TaskDecisions);
}

export function isStepEnabled(step: TaskStep, completedIds: Set<string>, decisions: TaskDecisions): boolean {
	const dependenciesMet = step.dependsOn.every(id => completedIds.has(id));
	if (!dependenciesMet) return false;
	if (step.conditional) return decisions[step.conditional] === true;
	return true;
}

export function isStepVisible(step: TaskStep, decisions: TaskDecisions): boolean {
	if (!step.conditional) return true;
	return decisions[step.conditional] !== false;
}

export function canRoleComplete(step: TaskStep, role?: TaskUserType): boolean {
	if (!role || !step.assignedTo) return true;
	if (step.assignedTo === TaskUserType.System) return false;
	if (role === TaskUserType.Workstation) return true;
	return step.assignedTo === role;
}

export function computeSteps(config: TaskConfig, state: TaskState): ComputedStep[] {
	const completedSet = new Set(state.completedStepIds);
	return config.steps.map(step => ({
		...step,
		isCompleted: completedSet.has(step.id),
		isEnabled: isStepEnabled(step, completedSet, state.decisions),
		isVisible: isStepVisible(step, state.decisions),
		canComplete: canRoleComplete(step, state.currentRole),
	}));
}

export function getCurrentStep(steps: ComputedStep[]): ComputedStep | null {
	return steps.find(s => s.isVisible && s.isEnabled && !s.isCompleted && s.canComplete) || null;
}

export function getNextSteps(steps: ComputedStep[], count = 3): ComputedStep[] {
	return steps.filter(s => s.isVisible && !s.isCompleted && s.canComplete).slice(0, count);
}

export function getWaitingSteps(steps: ComputedStep[], currentRole?: TaskUserType): ComputedStep[] {
	if (!currentRole) return [];
	return steps.filter(s => s.isVisible && s.isEnabled && !s.isCompleted && !s.canComplete);
}

export function groupByPhase(steps: ComputedStep[], phases: Record<string, string>): TaskPhase[] {
	return Object.entries(phases).map(([key, label]) => {
		const phaseSteps = steps.filter(s => s.phase === key && s.isVisible);
		return {
			key,
			label,
			steps: phaseSteps,
			completed: phaseSteps.filter(s => s.isCompleted).length,
			total: phaseSteps.length,
		};
	});
}

export function getProgress(steps: ComputedStep[]): TaskProgress {
	const visible = steps.filter(s => s.isVisible);
	const completed = visible.filter(s => s.isCompleted).length;
	const total = visible.length;
	return {completed, total, percent: total > 0 ? Math.round((completed / total) * 100) : 0};
}

export interface ConfigValidationError {
	stepId: string;
	message: string;
}

// Validate config for errors (missing references etc.)
export function validateConfig(config: TaskConfig): ConfigValidationError[] {
	const stepIds = new Set(config.steps.map(s => s.id));

	return config.steps.flatMap(step => {
		const stepErrors: ConfigValidationError[] = [];

		// Check dependsOn references
		step.dependsOn
			.filter(depId => !stepIds.has(depId))
			.forEach(depId => {
				stepErrors.push({stepId: step.id, message: `dependsOn references non-existent step: ${depId}`});
			});

		// Check conditional references
		if (step.conditional) {
			const outputExists = config.steps.some(s => s.outputs?.includes(step.conditional!));
			if (!outputExists) {
				stepErrors.push({stepId: step.id, message: `conditional references non-existent output: ${step.conditional}`});
			}
		}

		return stepErrors;
	});
}

export interface ServerStepData {
	stepId: string;
	completedAt?: Date | string | null;
	completedByWorkstation?: {givenName?: string; surname?: string} | null;
	completedByClient?: {givenName?: string; surname?: string} | null;
	decisionValue?: boolean | null;
}

export function reconcileWithServer(configSteps: TaskStep[], serverSteps: ServerStepData[]): {steps: TaskStep[]; completedIds: Set<string>} {
	const completedIds = new Set<string>();
	const serverMap = new Map(serverSteps.map(s => [s.stepId, s]));

	const steps = configSteps.map(localStep => {
		const serverStep = serverMap.get(localStep.id);
		if (!serverStep) return localStep;

		if (serverStep.completedAt) {
			completedIds.add(localStep.id);
		}

		return {
			...localStep,
			completedDate: serverStep.completedAt ? new Date(serverStep.completedAt).toISOString() : undefined,
			completedByWorkstation: serverStep.completedByWorkstation
				? `${serverStep.completedByWorkstation.givenName || ''} ${serverStep.completedByWorkstation.surname || ''}`.trim()
				: undefined,
			completedByClient: serverStep.completedByClient
				? `${serverStep.completedByClient.givenName || ''} ${serverStep.completedByClient.surname || ''}`.trim()
				: undefined,
			decisionValue: serverStep.decisionValue ?? localStep.decisionValue,
		};
	});

	return {steps, completedIds};
}
