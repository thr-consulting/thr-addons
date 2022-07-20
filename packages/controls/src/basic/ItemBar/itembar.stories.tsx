import type {ComponentStory, Meta} from '@storybook/react';
import {AppShell, Header} from '@mantine/core';
import {storyDecorator} from '../../storyDecorator';
import {ItemBar} from './ItemBar';

export default {
	title: 'Basic/Menu',
	argTypes: {},
	decorators: [storyDecorator],
} as Meta;

const t: ComponentStory<typeof ItemBar> = args => {
	// const [, updateArgs] = useArgs();

	return (
		<AppShell
			header={
				<Header height={45}>
					<ItemBar></ItemBar>
				</Header>
			}
			sx={{border: '1px solid white'}}
		>
			<div>test</div>
		</AppShell>
	);
};

export const Main: ComponentStory<typeof ItemBar> = t.bind({});
Main.args = {};
