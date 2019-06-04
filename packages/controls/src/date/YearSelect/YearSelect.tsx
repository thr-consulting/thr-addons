import React from 'react';
import {Icon, Button, Dropdown} from 'semantic-ui-react';
import debug from 'debug';

const d = debug('app.lib.YearSelect');

interface Props {
	year: number | string,
	onChange: (value: number) => void,
	minYear?: number | string,
	maxYear?: number | string,
}

export default function YearSelect(props: Props): JSX.Element {
	const thisYear = new Date().getFullYear();
	const {year = thisYear, onChange, minYear = 1970, maxYear = thisYear} = props;

	const getOptions = () => {
		const array: {value: number, text: number, key: number}[] = [];
		for (let i = maxYear as number; i >= minYear; i--) {
			array.push({value: i, text: i, key: i});
		}
		return array;
	};

	return (
		<div>
			<Button
				basic
				icon
				color="green"
				disabled={year as number === minYear as number}
				onClick={() => onChange(year as number - 1)}
			>
				<Icon name="arrow left"/>
			</Button>
			<Dropdown
				icon={<div/>}
				button
				basic
				scrolling
				value={year}
				options={getOptions()}
				onChange={(e, val) => onChange(val.value as number)}
			/>
			<Button
				basic
				icon
				color="green"
				disabled={year as number === maxYear as number}
				onClick={() => onChange(year as number + 1)}
			>
				<Icon name="arrow right"/>
			</Button>
		</div>
	);
}
