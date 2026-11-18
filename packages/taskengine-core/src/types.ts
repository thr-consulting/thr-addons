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

export interface TaskStep<P> {
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
	vendorId?: string;
	pseudoVendor?: P | null;
}

export interface TaskConfig<P> {
	id: string;
	title: string;
	phases: Record<string, string>;
	steps: TaskStep<P>[];
	completionMessage?: string;
}

export interface TaskState {
	completedStepIds: string[];
	decisions: TaskDecisions;
	currentRole?: TaskUserType;
}

export interface ComputedStep<P> extends TaskStep<P> {
	isCompleted: boolean;
	isEnabled: boolean;
	isVisible: boolean;
	canComplete: boolean;
}

export interface TaskPhase<P> {
	key: string;
	label: string;
	steps: ComputedStep<P>[];
	completed: number;
	total: number;
}

export interface TaskProgress {
	completed: number;
	total: number;
	percent: number;
}
