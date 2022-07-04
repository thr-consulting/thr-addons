import {MantineProvider} from '@mantine/core';
import type {StoryFn} from '@storybook/react';

export function Wrapper({children}: {children: JSX.Element}) {
	return (
		<MantineProvider
			theme={{
				// @ts-ignore
				colorScheme: import.meta.env.VITE_THEME === 'light' ? 'light' : 'dark',
				fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
			}}
			withGlobalStyles
			withNormalizeCSS
		>
			{children}
		</MantineProvider>
	);
}

export const storyDecorator = (Story: StoryFn) => (
	<Wrapper>
		<Story />
	</Wrapper>
);
