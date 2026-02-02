export enum TaskUserType {
	Client = 'CLIENT',
	Workstation = 'WORKSTATION',
	System = 'SYSTEM',
}

export interface TaskFile {
	id: string;
	name: string;
	uploadedAt: string;
}

export interface TaskDecisions {
	[key: string]: boolean | undefined;
}

export interface TaskStep {
	id: string;
	label: string;
	phase: string;
	dependsOn: string[];
	conditional?: string | null;
	outputs?: string[];
	assignedTo: TaskUserType;
	isDecision?: boolean;
	decisionLabel?: string;
	requiresFiles?: boolean;
	fileTypeId?: string;
	fileTypes?: string[];
	uploadButtonLabel?: string;
	helpText?: string;
	actionUrl?: string;
	actionUrlLabel?: string;
	decisionValue?: boolean;
	completedByWorkstation?: string | null;
	completedByClient?: string | null;
	completedDate?: string;
	files?: TaskFile[];
	completed?: boolean;
}

export interface TaskConfig {
	id: string;
	title: string;
	phases: Record<string, string>;
	steps: TaskStep[];
	completionMessage?: string;
}

export interface TaskState {
	completedStepIds: string[];
	decisions: TaskDecisions;
	currentRole?: TaskUserType;
}

export interface ComputedStep extends TaskStep {
	isCompleted: boolean;
	isEnabled: boolean;
	isVisible: boolean;
	canComplete: boolean;
}

export interface TaskPhase {
	key: string;
	label: string;
	steps: ComputedStep[];
	completed: number;
	total: number;
}

export interface TaskProgress {
	completed: number;
	total: number;
	percent: number;
}
