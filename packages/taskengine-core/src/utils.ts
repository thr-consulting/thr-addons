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
	return steps.filter(s => s.isVisible && s.isEnabled && !s.isCompleted && s.canComplete).slice(0, count);
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

export function validateConfig(config: TaskConfig): string[] {
	const ids = new Set(config.steps.map(s => s.id));
	const outputs = new Set(config.steps.flatMap(s => s.outputs || []));
	const errors: string[] = [];

	const hasCycle = (id: string, path = new Set<string>()): boolean => {
		if (path.has(id)) return true;
		const step = config.steps.find(s => s.id === id);
		return step?.dependsOn.some(d => hasCycle(d, new Set([...path, id]))) ?? false;
	};

	config.steps.forEach(s => {
		if (s.dependsOn.some(d => !ids.has(d))) errors.push(`"${s.id}" has unknown dependency`);
		if (s.conditional && !outputs.has(s.conditional)) errors.push(`"${s.id}" has unknown conditional`);
		if (hasCycle(s.id)) errors.push(`"${s.id}" has circular dependency`);
	});
	return errors;
}

export interface DbWorkflowPhase {
	key: string;
	label: string;
	sortOrder: number;
}

export interface DbWorkflowStep {
	stepKey: string;
	label: string;
	phase: {key: string};
	sortOrder: number;
	dependsOn: string[];
	conditional?: string | null;
	outputs: string[];
	assignedTo: string;
	isDecision: boolean;
	decisionLabel?: string | null;
	requiresFiles: boolean;
	fileTypeId?: string | null;
	fileTypes: string[];
	uploadButtonLabel?: string | null;
	helpText?: string | null;
	actionUrl?: string | null;
	actionUrlLabel?: string | null;
	vendor?: {id: string} | null;
}

export interface DbWorkflow {
	name: string;
	title: string;
	completionMessage?: string | null;
	phases: DbWorkflowPhase[];
	steps: DbWorkflowStep[];
}

export interface DbWorkflowStepInstance {
	workflowStep: {stepKey: string; outputs?: string[]; isDecision?: boolean};
	completedAt?: Date | string | null;
	completedByWorkstation?: {givenName?: string; surname?: string} | null;
	completedByClient?: {givenName?: string; surname?: string} | null;
	decisionValue?: boolean | null;
}

export interface DbWorkflowInstance {
	stepInstances: DbWorkflowStepInstance[];
}

// Normalize assignedTo value to uppercase to match TaskUserType enum
function normalizeUserType(value: string): TaskUserType {
	const upper = value.toUpperCase();
	if (upper === 'CLIENT') return TaskUserType.Client;
	if (upper === 'WORKSTATION') return TaskUserType.Workstation;
	if (upper === 'SYSTEM') return TaskUserType.System;
	return TaskUserType.Workstation;
}

export function workflowToConfig(workflow: DbWorkflow): TaskConfig {
	const phases = workflow.phases
		.sort((a, b) => a.sortOrder - b.sortOrder)
		.reduce((acc, p) => ({...acc, [p.key]: p.label}), {} as Record<string, string>);

	const steps: TaskStep[] = workflow.steps
		.sort((a, b) => a.sortOrder - b.sortOrder)
		.map(s => ({
			id: s.stepKey,
			label: s.label,
			phase: s.phase.key,
			dependsOn: s.dependsOn,
			conditional: s.conditional,
			outputs: s.outputs,
			assignedTo: normalizeUserType(s.assignedTo),
			isDecision: s.isDecision,
			decisionLabel: s.decisionLabel ?? undefined,
			requiresFiles: s.requiresFiles,
			fileTypeId: s.fileTypeId ?? undefined,
			fileTypes: s.fileTypes,
			uploadButtonLabel: s.uploadButtonLabel ?? undefined,
			helpText: s.helpText ?? undefined,
			actionUrl: s.actionUrl ?? undefined,
			actionUrlLabel: s.actionUrlLabel ?? undefined,
			vendorId: s.vendor?.id ?? undefined,
		}));

	return {
		id: workflow.name,
		title: workflow.title,
		completionMessage: workflow.completionMessage ?? undefined,
		phases,
		steps,
	};
}

export function cascadeDecisions(
	steps: Array<{id: string; isDecision?: boolean; conditional?: string | null}>,
	decisions: TaskDecisions,
): TaskDecisions {
	const result = {...decisions};
	while (
		steps.some(step => {
			if (step.isDecision && step.conditional && result[step.conditional] === false) {
				const stepKeyLower = step.id.toLowerCase();
				if (result[`${stepKeyLower}_yes`] !== false) {
					result[`${stepKeyLower}_completed`] = false;
					result[`${stepKeyLower}_yes`] = false;
					result[`${stepKeyLower}_no`] = false;
					return true;
				}
			}
			return false;
		})
	) {
		// continue until some() returns false
	}
	return result;
}

export function instanceToState(instance: DbWorkflowInstance | null | undefined, role?: TaskUserType): TaskState {
	if (!instance) {
		return {completedStepIds: [], decisions: {}, currentRole: role};
	}

	const completedStepIds = instance.stepInstances.filter(si => si.completedAt).map(si => si.workflowStep.stepKey);

	const decisions = instance.stepInstances
		.filter(si => si.decisionValue !== null && si.decisionValue !== undefined && si.workflowStep.isDecision)
		.reduce((acc, si) => {
			(si.workflowStep.outputs || []).forEach(output => {
				acc[output] = si.decisionValue!;
			});
			return acc;
		}, {} as TaskDecisions);

	return {completedStepIds, decisions, currentRole: role};
}

export function mergeInstanceIntoSteps(steps: TaskStep[], instance: DbWorkflowInstance | null | undefined): TaskStep[] {
	if (!instance) return steps;

	const instanceMap = new Map(instance.stepInstances.map(si => [si.workflowStep.stepKey, si]));

	return steps.map(step => {
		const si = instanceMap.get(step.id);
		if (!si) return step;

		return {
			...step,
			completed: !!si.completedAt,
			completedDate: si.completedAt ? new Date(si.completedAt as string).toISOString() : undefined,
			completedByWorkstation: si.completedByWorkstation
				? `${si.completedByWorkstation.givenName || ''} ${si.completedByWorkstation.surname || ''}`.trim() || undefined
				: undefined,
			completedByClient: si.completedByClient
				? `${si.completedByClient.givenName || ''} ${si.completedByClient.surname || ''}`.trim() || undefined
				: undefined,
			decisionValue: si.decisionValue ?? undefined,
		};
	});
}

export function getAssigneeLabel(assignedTo?: TaskUserType): string {
	if (assignedTo === TaskUserType.Client) return 'Client';
	if (assignedTo === TaskUserType.Workstation) return 'Workstation';
	if (assignedTo === TaskUserType.System) return 'System';
	return assignedTo || 'Unassigned';
}

export function getAssigneeColor(assignedTo?: TaskUserType): 'purple' | 'grey' | 'teal' {
	if (assignedTo === TaskUserType.Client) return 'purple';
	if (assignedTo === TaskUserType.System) return 'grey';
	return 'teal';
}

export function getAssigneeDisplayName(assignedTo?: TaskUserType | string): string {
	if (assignedTo === TaskUserType.Client) return 'the client';
	if (assignedTo === TaskUserType.Workstation) return 'the workstation team';
	if (assignedTo === TaskUserType.System) return 'the system';
	if (typeof assignedTo === 'string' && assignedTo.includes('@')) {
		const name = assignedTo.split('@')[0];
		return name.charAt(0).toUpperCase() + name.slice(1);
	}
	return assignedTo || 'other team members';
}

export function canCompleteStepWithFiles(step: ComputedStep, uploadedDocumentCount: number): boolean {
	if (!step.requiresFiles) return true;
	return uploadedDocumentCount > 0;
}
