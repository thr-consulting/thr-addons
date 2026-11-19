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

export function normalizeUserType(value?: string | null): TaskUserType {
	if (!value) return TaskUserType.Workstation;
	const upper = value.toUpperCase();
	if (upper === 'CLIENT') return TaskUserType.Client;
	if (upper === 'WORKSTATION') return TaskUserType.Workstation;
	if (upper === 'SYSTEM') return TaskUserType.System;
	return TaskUserType.Workstation;
}

export function isStepEnabled(
	step: {dependsOn: string[]; conditional?: string | null},
	completedIds: Set<string>,
	decisions: TaskDecisions,
): boolean {
	const dependenciesMet = step.dependsOn.every(id => completedIds.has(id));
	if (!dependenciesMet) return false;
	if (step.conditional) return decisions[step.conditional] === true;
	return true;
}

export function isStepVisible(step: {conditional?: string | null}, decisions: TaskDecisions): boolean {
	if (!step.conditional) return true;
	return decisions[step.conditional] !== false;
}

export function canRoleComplete(step: {assignedTo?: TaskUserType | string}, role?: TaskUserType | string): boolean {
	if (!role) return true;
	const normalizedAssigned = typeof step.assignedTo === 'string' ? normalizeUserType(step.assignedTo) : step.assignedTo;
	const normalizedRole = typeof role === 'string' ? normalizeUserType(role) : role;
	if (normalizedAssigned === TaskUserType.System) return false;
	if (normalizedRole === TaskUserType.Workstation) return true;
	return normalizedAssigned === normalizedRole;
}

export function computeSteps<P = string>(config: TaskConfig<P>, state: TaskState): ComputedStep<P>[] {
	const completedSet = new Set(state.completedStepIds);
	return config.steps.map(step => ({
		...step,
		isCompleted: completedSet.has(step.id),
		isEnabled: isStepEnabled(step, completedSet, state.decisions),
		isVisible: isStepVisible(step, state.decisions),
		canComplete: canRoleComplete(step, state.currentRole),
	}));
}

export function getCurrentStep<P = string>(steps: ComputedStep<P>[]): ComputedStep<P> | null {
	return steps.find(s => s.isVisible && s.isEnabled && !s.isCompleted && s.canComplete) || null;
}

export function getNextSteps<P = string>(steps: ComputedStep<P>[], count = 3): ComputedStep<P>[] {
	return steps.filter(s => s.isVisible && s.isEnabled && !s.isCompleted && s.canComplete).slice(0, count);
}

export function getWaitingSteps<P = string>(steps: ComputedStep<P>[], currentRole?: TaskUserType): ComputedStep<P>[] {
	if (!currentRole) return [];
	return steps.filter(s => s.isVisible && s.isEnabled && !s.isCompleted && !s.canComplete);
}

export function groupByPhase<P = string>(steps: ComputedStep<P>[], phases: Record<string, string>): TaskPhase<P>[] {
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

export function getProgress<P = string>(steps: ComputedStep<P>[]): TaskProgress {
	const visible = steps.filter(s => s.isVisible);
	const completed = visible.filter(s => s.isCompleted).length;
	const total = visible.length;
	return {completed, total, percent: total > 0 ? Math.round((completed / total) * 100) : 0};
}

export function validateConfig<P = string>(config: TaskConfig<P>): string[] {
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
	id?: string;
	key: string;
	label: string;
	sortOrder: number;
}

export interface DbWorkflowStep<P = string> {
	id?: string;
	stepKey: string;
	label: string;
	phase: {key: string} | string;
	sortOrder?: number;
	dependsOn: string[];
	conditional?: string | null;
	outputs?: string[];
	assignedTo: string;
	isDecision?: boolean;
	decisionLabel?: string | null;
	requiresFiles?: boolean;
	fileTypeId?: string | null;
	fileTypes?: string[];
	uploadButtonLabel?: string | null;
	helpText?: string | null;
	actionUrl?: string | null;
	actionUrlLabel?: string | null;
	systemStepType?: string | null;
	vendor?: {id: string} | null;
	vendorId?: string | null;
	pseudoVendor?: P | null;
}

export interface DbWorkflow<P = string> {
	id?: string;
	name: string;
	title: string;
	completionMessage?: string | null;
	phases: DbWorkflowPhase[];
	steps: DbWorkflowStep<P>[];
}

export interface DbWorkflowStepInstance {
	workflowStep?: {stepKey?: string; outputs?: string[]; isDecision?: boolean} | null;
	completedAt?: Date | string | null;
	completedByWorkstation?: {givenName?: string; surname?: string} | null;
	completedByClient?: {givenName?: string; surname?: string} | null;
	decisionValue?: boolean | null;
}

export interface DbWorkflowInstance {
	stepInstances: DbWorkflowStepInstance[];
}

export function workflowToConfig<P = string>(workflow: DbWorkflow<P>): TaskConfig<P> {
	const phases = workflow.phases
		.slice()
		.sort((a, b) => a.sortOrder - b.sortOrder)
		.reduce((acc, p) => ({...acc, [p.key]: p.label}), {} as Record<string, string>);

	const phaseOrderMap = new Map(workflow.phases.map(p => [p.key, p.sortOrder]));

	const steps: TaskStep<P>[] = workflow.steps
		.slice()
		.sort((a, b) => {
			const phaseKeyA = typeof a.phase === 'string' ? a.phase : a.phase.key;
			const phaseKeyB = typeof b.phase === 'string' ? b.phase : b.phase.key;
			const phaseOrderA = phaseOrderMap.get(phaseKeyA) ?? 0;
			const phaseOrderB = phaseOrderMap.get(phaseKeyB) ?? 0;
			if (phaseOrderA !== phaseOrderB) return phaseOrderA - phaseOrderB;
			return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
		})
		.map(s => ({
			id: s.stepKey,
			stepKey: s.stepKey,
			label: s.label,
			phase: typeof s.phase === 'string' ? s.phase : s.phase.key,
			sortOrder: s.sortOrder,
			dependsOn: s.dependsOn,
			conditional: s.conditional,
			outputs: s.outputs,
			assignedTo: normalizeUserType(s.assignedTo),
			isDecision: s.isDecision,
			decisionLabel: s.decisionLabel,
			requiresFiles: s.requiresFiles,
			fileTypeId: s.fileTypeId,
			fileTypes: s.fileTypes,
			uploadButtonLabel: s.uploadButtonLabel,
			helpText: s.helpText,
			actionUrl: s.actionUrl,
			actionUrlLabel: s.actionUrlLabel,
			systemStepType: s.systemStepType,
			vendorId: s.vendor?.id ?? s.vendorId,
			pseudoVendor: s.pseudoVendor,
		}));

	return {
		id: workflow.name,
		title: workflow.title,
		completionMessage: workflow.completionMessage,
		phases,
		steps,
	};
}

export function cascadeDecisions(
	steps: Array<{id?: string; stepKey?: string; isDecision?: boolean; conditional?: string | null}>,
	decisions: TaskDecisions,
): TaskDecisions {
	const result = {...decisions};
	while (
		steps.some(step => {
			const stepId = step.stepKey || step.id;
			if (!stepId) return false;
			if (step.isDecision && step.conditional && result[step.conditional] === false) {
				const stepKeyLower = stepId.toLowerCase();
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

	const completedStepIds = instance.stepInstances.filter(si => si.completedAt && si.workflowStep?.stepKey).map(si => si.workflowStep!.stepKey!);

	const decisions = instance.stepInstances
		.filter(si => si.decisionValue !== null && si.decisionValue !== undefined && si.workflowStep?.isDecision)
		.reduce((acc, si) => {
			(si.workflowStep?.outputs || []).forEach(output => {
				acc[output] = si.decisionValue!;
			});
			return acc;
		}, {} as TaskDecisions);

	return {completedStepIds, decisions, currentRole: role};
}

export function mergeInstanceIntoSteps<P = string>(steps: TaskStep<P>[], instance: DbWorkflowInstance | null | undefined): TaskStep<P>[] {
	if (!instance) return steps;

	const instanceMap = new Map(instance.stepInstances.filter(si => si.workflowStep?.stepKey).map(si => [si.workflowStep!.stepKey!, si]));

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
	return 'Unassigned';
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

export function canCompleteStepWithFiles(step: {requiresFiles?: boolean | null}, uploadedDocumentCount: number): boolean {
	if (!step.requiresFiles) return true;
	return uploadedDocumentCount > 0;
}
