import {useContext} from 'react';
import {StepContext} from './stepContext';

export function useStep(): [any, (values: unknown, stepKey: string) => void] {
	const {state, handleSubmit} = useContext(StepContext);

	return [state, handleSubmit];
}
