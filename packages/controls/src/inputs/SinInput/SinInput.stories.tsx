import debug from 'debug';
import React, {useState} from 'react';
import {Button, Container, Form, Grid, Segment} from 'semantic-ui-react';
import {string, object} from 'yup';
import {useTForm} from '../../form/TForm';
import {SinInput} from './SinInput';

const d = debug('thx.controls.inputs.SinInput.SinInput.stories');

export default {title: 'Inputs/SinInput'};

export const Main = () => {
	const [hasSin, setHasSin] = useState(false);

	return (
		<Container>
			<Segment basic>
				<Form>
					<Grid columns="equal">
						<Grid.Row>
							<Grid.Column width={5}>
								<Form.Input label="SIN">
									<SinInput hasSin={hasSin} />
								</Form.Input>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<Button positive type="submit" onClick={() => setHasSin(!hasSin)}>
									Save
								</Button>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Form>
			</Segment>
		</Container>
	);
};

const validationSchema = object().shape({
	sin: string().nullable().notRequired(),
});

export const WithTForm = () => {
	const [val, setVal] = useState<string | undefined>(undefined);
	const {handleSubmit, hasErrors, hasWarnings, setFieldValue, renderWarnings} = useTForm({
		validationSchema,
		onSubmit: v => setVal(v),
		initialValues: {sin: undefined},
	});

	return (
		<Container>
			<Segment basic>
				<Form error={hasErrors} warning={hasWarnings} onSubmit={handleSubmit}>
					<Grid columns="equal">
						<Grid.Row>
							<Grid.Column width={5}>
								<Form.Input label="SIN">
									<SinInput hasSin={!!val} onChange={v => setFieldValue('sin', v)} />
								</Form.Input>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>{renderWarnings()}</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<Button positive type="submit">
									Save
								</Button>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Form>
			</Segment>
		</Container>
	);
};
