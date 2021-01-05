import debug from 'debug';
import React, {useState} from 'react';
import {Button, Container, Form, Grid, Segment} from 'semantic-ui-react';
import {SinInput} from './SinInput';

const d = debug('thx.controls.YearSelect.stories');

export default {title: 'Inputs/SinInput'};

export const Main = () => {
	const [hasSin, setHasSin] = useState(false);
	const [val, setVal] = useState<string | undefined>(undefined)

	return (
		<Container>
			<Segment basic>
				<Grid columns="equal">
					<Grid.Row>
						<Grid.Column width={5}>
							<Form.Input>
								<SinInput hasSin={hasSin} onChange={val => setVal(val)} />
							</Form.Input>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
					    <Grid.Column>
							<Button positive type="submit" onClick={() => setHasSin(!hasSin)}>Save</Button>
					    </Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		</Container>
	);
};
