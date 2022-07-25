import {forwardRef} from 'react';
import {
	Box,
	DefaultProps,
	MantineColor,
	MantineSize,
	PolymorphicComponentProps,
	PolymorphicRef,
	Selectors,
	useMantineDefaultProps,
} from '@mantine/core';
import debug from 'debug';
import {BarItemVariant, useStyles} from './BarItem.styles';

const d = debug('thx.controls.basic.Bar.BarItem');

export type BarItemStylesNames = Selectors<typeof useStyles>;

export interface SharedBarItemProps extends DefaultProps<BarItemStylesNames> {
	size?: MantineSize;
	color?: MantineColor;
	children?: React.ReactNode;
	active?: boolean;
	name?: string;
	variant?: BarItemVariant;
	onClick?: (name?: string) => void;
}

export type BarItemProps<C> = PolymorphicComponentProps<C, SharedBarItemProps>;

type BarItemComponent = (<C = 'div'>(props: BarItemProps<C>) => React.ReactElement) & {
	displayName?: string;
};

const defaultProps: Partial<BarItemProps<any>> = {
	size: 'md',
	active: false,
	variant: 'subtle',
};

export const BarItem: BarItemComponent = forwardRef((props: BarItemProps<'div'>, ref: PolymorphicRef<'div'>) => {
	const {component, className, size, classNames, styles, children, active, variant, color, name, onClick, ...others} = useMantineDefaultProps(
		'BarItem',
		defaultProps,
		props,
	);

	// @ts-expect-error
	const {classes, cx} = useStyles({size, active, color}, {classNames, styles, name: 'BarItem'});

	return (
		<Box
			component={component}
			ref={ref}
			{...others}
			// @ts-expect-error
			className={cx(classes[variant], {}, classes.root, className)}
			onClick={() => {
				onClick && onClick(name);
			}}
		>
			<span className={classes.label}>{children}</span>
		</Box>
	);
}) as any;

BarItem.displayName = 'BarItem';
