import {ColorScheme, ColorSchemeProvider, MantineProvider} from '@mantine/core';
import type {StoryFn} from '@storybook/react';
import {useState} from 'react';

export function Wrapper({children}: {children: JSX.Element}) {
	// @ts-ignore
	const [colorScheme, setColorScheme] = useState<ColorScheme>(import.meta.env.VITE_THEME === 'light' ? 'light' : 'dark');
	const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider
				theme={{
					colorScheme,
					fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
					// fontSizes: {
					// 	xs: 10,
					// 	sm: 12,
					// 	md: 14,
					// 	lg: 16,
					// 	xl: 18,
					// },
					// primaryColor: 'orange',
				}}
				withGlobalStyles
				withNormalizeCSS
			>
				{children}
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

export const storyDecorator = (Story: StoryFn) => (
	<Wrapper>
		<Story />
	</Wrapper>
);
