/* eslint-disable prefer-destructuring */
import type {CSSObject, MantineColor, MantineTheme, PolymorphicComponentProps} from '@mantine/core';
import {Children} from 'react';

// export interface _BarItemBaseProps {
// 	children: React.ReactNode;
// 	active?: boolean;
// 	name?: string;
// 	onClick?: (name?: string) => void;
// 	link?: boolean;
// }
//
// type BarItemBaseProps<C extends React.ElementType> = PolymorphicComponentProps<C, _BarItemBaseProps>;

export function baseSx(theme: MantineTheme, props: BarItemBaseProps): CSSObject {
	const {active, children, link} = props;

	let backgroundColor: MantineColor;
	let hoverColor: MantineColor;
	let dividerColor: MantineColor;

	if (theme.colorScheme === 'dark') {
		backgroundColor = active ? theme.colors.gray[7] : 'none';
		hoverColor = theme.colors.gray[9];
		dividerColor = theme.colors.gray[8];
	} else {
		backgroundColor = active ? theme.colors.gray[4] : 'none';
		hoverColor = theme.colors.gray[2];
		dividerColor = theme.colors.gray[3];
	}

	const hover: CSSObject | undefined = link
		? {
				cursor: 'pointer',
				backgroundColor: hoverColor,
		  }
		: undefined;

	return {
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
		verticalAlign: 'middle',
		lineHeight: 1,
		textDecoration: 'none',
		flex: '0 0 auto',
		paddingTop: theme.spacing.sm,
		paddingBottom: theme.spacing.sm,
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
		textTransform: 'none',
		backgroundColor,
		':hover': hover,
		':before': {
			position: 'absolute',
			content: '""',
			top: 0,
			right: 0,
			height: '100%',
			width: '1px',
			backgroundColor: dividerColor,
		},
	};
}
