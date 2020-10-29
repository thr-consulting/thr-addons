import {useContext} from 'react';
import {StepContext} from './stepContext';

export function useStep(): [any, (values: any) => void] {
	const {state, handleSubmit} = useContext(StepContext);

	return [state, handleSubmit];
}
