import debug from 'debug';
import React from 'react';

const d = debug('thx.controls.Step');

interface StepProps {
	children?: JSX.Element | JSX.Element[];
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
