import {createContext} from 'react';

export const StepContext = createContext<{handleSubmit: (values: unknown, stepKey: string) => void; state: Record<string, any>}>({
	handleSubmit: () => {},
	state: {},
});
