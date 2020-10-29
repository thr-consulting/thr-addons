import debug from 'debug';
import React, {Children} from 'react';
import {useStep} from './useStep';

const d = debug('thx.controls.FormStep');

interface FormStepProps {
	children: JSX.Element;
	title?: string;
	step?: number;
}

export function FormStep(props: FormStepProps) {
	const [state, handleSubmit] = useStep();
	const values = props.step !== null && props.step !== undefined ? state[props.step] : {};

	const form = React.cloneElement(Children.only(props.children), {
		values: values || {},
		onSubmit: handleSubmit,
	});

	return (
		<>
			<h1>{props.title}</h1>
			{form}
		</>
	);
}
