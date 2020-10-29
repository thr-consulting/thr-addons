import React from 'react';

export const StepContext = React.createContext<{handleSubmit: (values: any) => void; state: any}>({
	handleSubmit: () => {},
	state: {},
});
