import debug from 'debug';
import {cloneElement, Children} from 'react';
import {useStep} from './useStep';

const d = debug('thx.controls2.step.FormStep');

interface FormStepProps {
	children: JSX.Element;
	title?: string;
	stepKey: string;
	hidden?: boolean | ((state: any, step: number) => boolean);
}

export function FormStep(props: FormStepProps) {
	const [state, handleSubmit] = useStep();
	const values = state[props.stepKey] || {};

	const form = cloneElement(Children.only(props.children), {
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
