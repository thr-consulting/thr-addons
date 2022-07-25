import {createStyles} from '@mantine/core';
import debug from 'debug';

const d = debug('thx.controls.basic.Bar.Bar.styles');

export type BarVariant = 'subtle' | 'outline';
export type BarDirection = 'row' | 'column';

export interface BarStylesParams {
	direction: BarDirection;
}

export const useStyles = createStyles((theme, {direction}: BarStylesParams) => {
	return {
		root: {
			display: 'flex',
			flexWrap: 'nowrap',
			alignItems: 'center',
			height: '100%',
			flexDirection: direction,
		},
	};
});
