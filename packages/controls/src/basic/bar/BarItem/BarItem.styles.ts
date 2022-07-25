import {createStyles, MantineColor, MantineSize, MantineTheme} from '@mantine/core';
import debug from 'debug';

const d = debug('thx.controls.basic.Bar.BarItem.styles');

export type BarItemVariant = 'subtle' | 'outline';

export interface BarItemStylesParams {
	size: MantineSize;
	active: boolean;
	color: MantineColor;
}

interface GetVariantStyles {
	theme: MantineTheme;
	color: MantineColor;
	variant: BarItemVariant;
	active: boolean;
}

function getVariantStyles({variant, theme, color, active}: GetVariantStyles) {
	const colors = active ? theme.fn.variant({color, variant: 'filled'}) : theme.fn.variant({color, variant});

	return {
		backgroundColor: colors.background,
		backgroundImage: colors.background,
		color: colors.color,
		...theme.fn.hover({
			backgroundColor: colors.hover,
		}),
	};
}

export const useStyles = createStyles((theme, {size, active, color}: BarItemStylesParams, getRef) => {
	return {
		subtle: getVariantStyles({variant: 'subtle', theme, color, active}),
		outline: getVariantStyles({variant: 'outline', theme, color, active}),
		root: {
			display: 'flex',
			alignItems: 'center',
			position: 'relative',
			verticalAlign: 'middle',
			lineHeight: 1,
			flex: '0 0 auto',
			paddingTop: theme.spacing.sm,
			paddingBottom: theme.spacing.sm,
			paddingLeft: theme.spacing.md,
			paddingRight: theme.spacing.md,
			':hover': {
				cursor: 'pointer',
			},
		},
		label: {
			textDecoration: 'none',
			textTransform: 'none',
		},
	};
});
