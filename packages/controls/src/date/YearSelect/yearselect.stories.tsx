import debug from 'debug';
import React, {useState} from 'react';
import {Container, Segment} from 'semantic-ui-react';
import {YearSelect} from './YearSelect';

const d = debug('thx.controls.YearSelect.stories');

export default {title: 'YearSelect'};

export const Main = () => {
	const [value1, setValue1] = useState(new Date().getFullYear());
	const [value2, setValue2] = useState(new Date().getFullYear());
	const [value3, setValue3] = useState(1990);

	return (
		<Container>
			<Segment basic>
				<div>
					<YearSelect
						value={value1}
						onChange={v => {
							setValue1(v);
						}}
						onBlur={() => {
							d('Blur yearselect');
						}}
					/>
				</div>
				<div>
					<YearSelect
						value={value2}
						onChange={v => {
							setValue2(v);
						}}
						error
					/>
				</div>
				<div>
					<YearSelect
						value={value3}
						onChange={v => {
							setValue3(v);
						}}
						minYear={1980}
						maxYear={1990}
					/>
				</div>
			</Segment>
		</Container>
	);
};
