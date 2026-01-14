import type {TaskStep, TaskConfig, TaskState, TaskDecisions, ComputedStep, TaskPhase, TaskProgress, TaskUserType} from './types';

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
	if (role === 'WORKSTATION' || role === 'SYSTEM') return true;
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
