import debug from 'debug';
import React from 'react';

const d = debug('thx.controls.Step');

interface StepProps {
	children?: JSX.Element | JSX.Element[];
	title?: string;
	step?: number;
}

export function Step(props: StepProps) {
	return <>{props.children}</>;
}
