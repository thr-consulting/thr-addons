import debug from 'debug';
import React, {useState} from 'react';
import {Button, Container, Form, Radio, Segment} from 'semantic-ui-react';
import {FormStep, StepProvider} from './index';
import {TForm} from '../form/TForm';

const d = debug('thx.controls.Step.stories');

export default {title: 'Step'};

const StepOne = ({onSubmit, values: propValues}) => {
	return (
		<TForm initialValues={propValues} onSubmit={onSubmit} >
			{({handleSubmit, setFieldValue, values}) => {
				return (
					<Form onSubmit={handleSubmit}>
						<Form.Input label="Reveal Step 3" >
							<Form.Radio toggle checked={values.checked} onClick={(e, val) => setFieldValue('checked', val.checked)} />
						</Form.Input>
						<Button positive type="submit">Next</Button>
					</Form>
				);
			}}
		</TForm>
	);
};

const StepTwo = ({onSubmit}) => {
	return (
		<Form onSubmit={onSubmit}>
			<Form.Input label="Name" />
			<Button positive type="submit">Next</Button>
		</Form>
	);
};

export const Step = () => {
	const [vertical, setVertical] = useState(false);
	return (
		<Container>
			<Segment basic>
				<StepProvider onSubmit={() => {}} vertical={vertical}>
					<FormStep title="step 1" children={<StepOne />}/>
					<FormStep title="step 2" children={<StepTwo />}/>
					<FormStep title="step 3" children={<div>The End</div>} hidden={state => !state[0]?.checked}/>
				</StepProvider>
			</Segment>
			<Segment>
				<Radio label="Vertical" toggle onClick={(e, val) => setVertical(val.checked)} />
			</Segment>
		</Container>
	);
};
