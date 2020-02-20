import debug from 'debug';
import React, {useState} from 'react';
import {Form, Container, Segment, Radio} from 'semantic-ui-react';
import {RadioGroup} from './RadioGroup';

const d = debug('thx.controls.RadioGroup.stories');

export default {title: 'RadioGroup'};

export const Main = () => {
	const [value1, setValue1] = useState();
	const [value2, setValue2] = useState();

	return (
		<Container>
			<Segment basic>
				<Form>
					<Form.Field>
						<label>Radio Group: {value1}</label>
						<RadioGroup onChange={value => setValue1(value)} value={value1} inline onBlur={() => d('onBlur')}>
							<Radio label="Choice A" value="a" />
							<Radio label="Choice B" value="b" />
						</RadioGroup>
					</Form.Field>
					<Form.Field width={6}>
						<label>Semantic Radio Group: {value2}</label>
						<Radio label="Choice A" name="radioGroup" value="aa" checked={value2 === 'aa'} onChange={(e, {value}) => setValue2(value)} />
						<Radio label="Choice B" name="radioGroup" value="bb" checked={value2 === 'bb'} onChange={(e, {value}) => setValue2(value)} />
					</Form.Field>
				</Form>
			</Segment>
		</Container>
	);
};
