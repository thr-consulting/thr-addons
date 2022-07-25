// import {Box, DefaultProps, MantineSize, PolymorphicComponentProps, PolymorphicRef, Selectors, useMantineDefaultProps} from '@mantine/core';
// import {forwardRef} from 'react';
// import {useStyles} from './Bar.styles';
//
// export type BarStylesNames = Selectors<typeof useStyles>;
//
// export interface SharedBarProps extends DefaultProps<BarStylesNames> {
// 	size?: MantineSize;
// 	children?: React.ReactNode;
// }
//
// export type BarProps<C> = PolymorphicComponentProps<C, SharedBarProps>;
//
// type BarComponent = (<C = 'div'>(props: BarProps<C>) => React.ReactElement) & {
// 	displayName?: string;
// };
//
// const defaultProps: Partial<BarProps<any>> = {
// 	size: 'md',
// };
//
// export const Bar: BarComponent = forwardRef((props: BarProps<'div'>, ref: PolymorphicRef<'div'>) => {
// 	const {children, size, className, classNames, styles, ...others} = useMantineDefaultProps('Bar', defaultProps, props);
//
// 	// @ts-expect-error
// 	const {classes, cx} = useStyles({size}, {classNames, styles, name: 'Bar'});
//
// 	return (
// 		<Box component="div" ref={ref} {...others} className={cx(classes.root, className)}>
// 			{children}
// 		</Box>
// 	);
// }) as any;
//
// Bar.displayName = 'Bar';

import type {DefaultProps, MantineColor} from '@mantine/core';
import {cloneElement} from 'react';
import {Box, filterChildrenByType, useMantineDefaultProps} from '@mantine/core';
import type {BarItemStylesNames} from '../BarItem/BarItem';
import {BarItem} from '../BarItem/BarItem';
import type {BarDirection, BarVariant} from './Bar.styles';
import {useStyles} from './Bar.styles';

export interface BarProps extends DefaultProps<BarItemStylesNames> {
	children?: React.ReactNode;
	color?: MantineColor;
	variant?: BarVariant;
	direction?: BarDirection;
	celled?: boolean;
}

const defaultProps: Partial<BarProps> = {
	variant: 'subtle',
	celled: false,
	direction: 'row',
};

export function Bar(props: BarProps) {
	const {classNames, children, direction, celled, className, color, variant, styles, ...others} = useMantineDefaultProps('Bar', defaultProps, props);

	const {cx, classes} = useStyles({direction}, {classNames, styles, name: 'Bar'});

	const items = filterChildrenByType(children, BarItem).map((child) => {
		return cloneElement(child, {
			classNames,
			styles,
		});
	});

	return (
		<Box className={cx(classes.root, className)} {...others}>
			{items}
		</Box>
	);
}
