import {Box} from '@mantine/core';
import {baseSx, BarItemBaseProps} from './baseSx';

export function BarHeader(props: BarItemBaseProps) {
	const {children, onClick, name} = props;

	return (
		<Box
			sx={theme => ({
				...baseSx(theme, props),
				fontWeight: 'bold',
				':hover': undefined,
			})}
			onClick={() => {
				onClick && onClick(name);
			}}
		>
			{children}
		</Box>
	);
}
