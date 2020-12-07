import debug from 'debug';
import React, {Children} from 'react';
import {useStep} from './useStep';

const d = debug('thx.controls.FormStep');

interface FormStepProps {
	children: JSX.Element;
	title?: string;
	stepKey: string;
	hidden?: boolean | ((state: any, step: number) => boolean);
}

export function FormStep(props: FormStepProps) {
	const [state, handleSubmit] = useStep();
	const values = state[props.stepKey] || {};

	const form = React.cloneElement(Children.only(props.children), {
		values: values || {},
		onSubmit: (vals: unknown) => handleSubmit(vals, props.stepKey),
	});

	return (
		<>
			<h1>{props.title}</h1>
			{form}
		</>
	);
}
