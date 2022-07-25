import type {ComponentStory, Meta} from '@storybook/react';
import {Contrast, MoonStars, Search, Settings, Sun} from 'tabler-icons-react';
import {ActionIcon, AppShell, Box, Header, Menu, Navbar, Sx, TextInput, useMantineColorScheme, useMantineTheme} from '@mantine/core';
import {storyDecorator} from '../../storyDecorator';

export default {
	title: 'Basic/BarTest',
	argTypes: {},
	decorators: [storyDecorator],
} as Meta;

const t: ComponentStory<any> = args => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	// const [, updateArgs] = useArgs();
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const theme = useMantineTheme();
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const {colorScheme, toggleColorScheme} = useMantineColorScheme();
	const barHeight = 1 + theme.fontSizes.md + theme.spacing.sm * 2;

	const barSx: Sx = {
		display: 'flex',
		flexWrap: 'nowrap',
		alignItems: 'center',
		height: '100%',
	};

	const barVertSx: Sx = {
		...barSx,
		flexDirection: 'column',
	};

	const celled: Sx = {
		':not(:first-child):before': {
			position: 'absolute',
			content: '""',
			top: 0,
			left: 0,
			width: '100%',
			height: '1px',
			backgroundColor: theme.colors.gray[8],
		},
	};

	const commonItemSx: Sx = {
		alignItems: 'center',
		position: 'relative',
		verticalAlign: 'middle',
		lineHeight: 1,
		paddingTop: theme.spacing.sm,
		paddingBottom: theme.spacing.sm,
	};

	const itemSx: Sx = {
		...commonItemSx,
		display: 'flex',
		flex: '0 0 auto',
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
	};

	const itemVertSx: Sx = {
		...commonItemSx,
		width: '100%',
		paddingLeft: theme.spacing.sm,
		paddingRight: theme.spacing.sm,
		...celled,
	};

	const linkSx: Sx = {
		':hover': {
			cursor: 'pointer',
			backgroundColor: theme.colors.gray[7],
		},
		textDecoration: 'none',
		textTransform: 'none',
	};

	const headerSx: Sx = {
		...itemSx,
		fontWeight: 'bold',
	};

	const customSx: Sx = {
		...itemSx,
		paddingTop: 0,
		paddingBottom: 0,
	};

	return (
		<AppShell
			header={
				<>
					<Header height={barHeight}>
						<Box sx={barSx}>
							<Box sx={headerSx}>One</Box>
							<Box component="a" href="#" sx={{...itemSx, ...linkSx}}>
								Two
							</Box>
							<Box component="a" href="#" sx={{...itemSx, ...linkSx}}>
								Three
							</Box>
							<Box component="a" href="#" sx={{...itemSx, ...linkSx}}>
								Four
							</Box>
							<Box sx={{...customSx, marginLeft: 'auto'}}>
								<Box sx={{customSx}}>
									<ActionIcon
										variant="outline"
										color={colorScheme === 'dark' ? 'yellow' : 'blue'}
										onClick={() => toggleColorScheme()}
										title="Toggle color scheme"
									>
										{colorScheme === 'dark' ? <Sun size={18} /> : <MoonStars size={18} />}
									</ActionIcon>
								</Box>
								<Box sx={customSx}>
									<TextInput variant="filled" size="sm" icon={<Search size={14} />} />
								</Box>
								<Box sx={{customSx}}>
									<Menu>
										<Menu.Label>Stuff</Menu.Label>
										<Menu.Item icon={<Settings />}>Settings</Menu.Item>
									</Menu>
								</Box>
							</Box>
						</Box>
					</Header>
					<Header height={barHeight}>
						<Box sx={barSx}>
							<Box sx={headerSx}>One</Box>
							<Box component="a" href="#" sx={{...itemSx, ...linkSx}}>
								Two
							</Box>
						</Box>
					</Header>
				</>
			}
			navbar={
				<Navbar p="md" hiddenBreakpoint="sm" width={{sm: 200, lg: 300}} px={0} py={0}>
					<Box sx={barVertSx}>
						<Box sx={{...itemVertSx, ...linkSx}}>
							First
							<Box component="span" sx={{verticalAlign: 'middle', float: 'right'}}>
								<Settings size={16} />
							</Box>
						</Box>
						<Box sx={{...itemVertSx, ...linkSx}}>
							Second
							<Box component="span" sx={{verticalAlign: 'middle', float: 'right'}}>
								<Contrast size={16} />
							</Box>
						</Box>
					</Box>
				</Navbar>
			}
			sx={{border: '1px solid white'}}
		>
			<div>
				<TextInput variant="default" />
			</div>
		</AppShell>
	);
};

export const Main: ComponentStory<any> = t.bind({});
Main.args = {};
