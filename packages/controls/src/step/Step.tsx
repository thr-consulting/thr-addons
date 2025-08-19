import debug from 'debug';
import {type ReactElement} from 'react';

const d = debug('thx.controls.step.Step');

interface StepProps {
	children?: ReactElement | ReactElement[];
	title?: string;
	step?: number;
	hidden?: boolean | ((state: any, step: number) => boolean);
}

export function Step(props: StepProps) {
	return (
		<>
			<h1>{props.title}</h1>
			{props.children}
		</>
	);
}
