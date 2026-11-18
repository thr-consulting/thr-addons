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

export interface TaskStep<P = string> {
	id: string;
	stepKey?: string;
	label: string;
	phase: string;
	sortOrder?: number;
	dependsOn: string[];
	conditional?: string | null;
	outputs?: string[];
	assignedTo: TaskUserType;
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
	decisionValue?: boolean | null;
	completedByWorkstation?: string | null;
	completedByClient?: string | null;
	completedDate?: string | null;
	files?: TaskFile[];
	completed?: boolean;
	vendorId?: string | null;
	pseudoVendor?: P | null;
}

export interface TaskConfig<P = string> {
	id: string;
	title: string;
	phases: Record<string, string>;
	steps: TaskStep<P>[];
	completionMessage?: string | null;
}

export interface TaskState {
	completedStepIds: string[];
	decisions: TaskDecisions;
	currentRole?: TaskUserType;
}

export interface ComputedStep<P = string> extends TaskStep<P> {
	isCompleted: boolean;
	isEnabled: boolean;
	isVisible: boolean;
	canComplete: boolean;
}

export interface TaskPhase<P = string> {
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
