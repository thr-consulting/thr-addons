import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
import {AppShell, Chip, Chips, Header, useMantineTheme} from '@mantine/core';
import {storyDecorator} from '../../storyDecorator';
import {Bar} from './Bar/Bar';
import {BarItem} from './BarItem/BarItem';

export default {
	title: 'Basic/Bar',
	argTypes: {
		activeItem: {type: 'string', control: {type: 'text'}},
		textInput: {type: 'string', control: {type: 'text'}},
	},
	decorators: [storyDecorator],
} as Meta;

const t: ComponentStory<any> = args => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [, updateArgs] = useArgs();
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const theme = useMantineTheme();
	const barHeight = 1 + theme.fontSizes.md + theme.spacing.sm * 2;

	const handleItemClick = (name?: string) => updateArgs({activeItem: name});

	return (
		<AppShell
			header={
				<Header height={barHeight}>
					<Bar>
						<BarItem component="div" name="one" onClick={handleItemClick} active={args.activeItem === 'one'}>
							One
						</BarItem>
						<BarItem name="two" onClick={handleItemClick} active={args.activeItem === 'two'} variant="outline">
							Two
						</BarItem>
						<BarItem name="three" onClick={handleItemClick} active={args.activeItem === 'three'} color="red">
							Three
						</BarItem>
						<BarItem name="four" onClick={handleItemClick} active={args.activeItem === 'four'} variant="outline" color="red">
							Four
						</BarItem>
						{/* <BarItem> */}
						{/*	<TextInput variant="unstyled" value={args.textInput} onChange={v => updateArgs({textInput: v.currentTarget.value})} /> */}
						{/* </BarItem> */}
					</Bar>
				</Header>
			}
			sx={{border: '1px solid white'}}
		>
			<div>
				<Chips color="orange" styles={{root: {border: '2px solid white'}}} mb={20}>
					<Chip>Stuff</Chip>
					<Chip>Stuff</Chip>
					<Chip>Stuff</Chip>
					<Chip>Stuff</Chip>
				</Chips>
			</div>
		</AppShell>
	);
};

export const Main: ComponentStory<any> = t.bind({});
Main.args = {
	activeItem: 'one',
	textInput: '',
};

export const OutlineVariant: ComponentStory<any> = t.bind({});
OutlineVariant.args = {
	...Main.args,
};
