import {useState, useMemo, useCallback} from 'react';
import type {TaskConfig, TaskState, TaskUserType} from './types';
import * as utils from './utils';

export interface UseTaskEngineOptions {
	config: TaskConfig;
	initialState?: Partial<TaskState>;
	onStateChange?: (state: TaskState) => void;
}

export function useTaskEngine(options: UseTaskEngineOptions) {
	const {config, initialState, onStateChange} = options;

	const [state, setStateInternal] = useState<TaskState>({
		completedStepIds: initialState?.completedStepIds || [],
		decisions: initialState?.decisions || {},
		currentRole: initialState?.currentRole,
	});

	const setState = useCallback(
		(updater: (s: TaskState) => TaskState) => {
			setStateInternal(prev => {
				const next = updater(prev);
				onStateChange?.(next);
				return next;
			});
		},
		[onStateChange],
	);

	const steps = useMemo(() => utils.computeSteps(config, state), [config, state]);
	const currentStep = useMemo(() => utils.getCurrentStep(steps), [steps]);
	const nextSteps = useMemo(() => utils.getNextSteps(steps), [steps]);
	const waitingSteps = useMemo(() => utils.getWaitingSteps(steps, state.currentRole), [steps, state.currentRole]);
	const progress = useMemo(() => utils.getProgress(steps), [steps]);
	const phases = useMemo(() => utils.groupByPhase(steps, config.phases), [steps, config.phases]);

	const completeStep = useCallback(
		(stepId: string) => {
			setState(s => ({...s, completedStepIds: [...s.completedStepIds, stepId]}));
		},
		[setState],
	);

	const uncompleteStep = useCallback(
		(stepId: string) => {
			setState(s => ({...s, completedStepIds: s.completedStepIds.filter(id => id !== stepId)}));
		},
		[setState],
	);

	const toggleStep = useCallback(
		(stepId: string) => {
			setState(s => {
				const isCompleted = s.completedStepIds.includes(stepId);
				return {
					...s,
					completedStepIds: isCompleted ? s.completedStepIds.filter(id => id !== stepId) : [...s.completedStepIds, stepId],
				};
			});
		},
		[setState],
	);

	const setDecision = useCallback(
		(key: string, value: boolean) => {
			setState(s => ({...s, decisions: {...s.decisions, [key]: value}}));
		},
		[setState],
	);

	const setRole = useCallback(
		(role: TaskUserType) => {
			setState(s => ({...s, currentRole: role}));
		},
		[setState],
	);

	const reset = useCallback(() => {
		setState(() => ({completedStepIds: [], decisions: {}, currentRole: state.currentRole}));
	}, [setState, state.currentRole]);

	return {
		config,
		state,
		steps,
		currentStep,
		nextSteps,
		waitingSteps,
		progress,
		phases,
		isComplete: progress.completed === progress.total && progress.total > 0,
		completeStep,
		uncompleteStep,
		toggleStep,
		setDecision,
		setRole,
		reset,
	};
}
