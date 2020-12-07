import React from 'react';

export const StepContext = React.createContext<{handleSubmit: (values: unknown, stepKey: string) => void; state: Record<string, any>}>({
	handleSubmit: () => {},
	state: {},
});
