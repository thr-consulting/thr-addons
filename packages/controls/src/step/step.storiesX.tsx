import debug from 'debug';
import React, {useState} from 'react';
import {Button, Container, Form, Radio, Segment} from 'semantic-ui-react';
import {TForm} from '../form/TForm';
import {FormStep as CFormStep, StepProvider} from './index';

const d = debug('thx.controls.step.step.storiesX');

export default {title: 'Inputs/Step'};

const StepOne = ({onSubmit, values: propValues}) => {
	return (
		<TForm initialValues={propValues} onSubmit={onSubmit}>
			{({handleSubmit, setFieldValue, values}) => {
				return (
					<Form onSubmit={handleSubmit}>
						<Form.Input label="Reveal Step 3">
							<Form.Radio toggle checked={values.checked} onClick={(e, val) => setFieldValue('checked', val.checked)} />
						</Form.Input>
						<Button positive type="submit">
							Next
						</Button>
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
			<Button positive type="submit">
				Next
			</Button>
		</Form>
	);
};

export const FormStep = () => {
	const [vertical, setVertical] = useState(false);
	return (
		<Container>
			<Segment basic>
				<StepProvider onSubmit={() => {}} vertical={vertical}>
					<CFormStep title="step 1" stepKey="step1" children={<StepOne />} />
					<CFormStep title="step 2" stepKey="step2" children={<StepTwo />} />
					<CFormStep title="step 3" stepKey="step3" children={<div>The End</div>} hidden={state => !state.step1?.checked} />
				</StepProvider>
			</Segment>
			<Segment>
				<Radio label="Vertical" toggle onClick={(e, val) => setVertical(val.checked)} />
			</Segment>
		</Container>
	);
};
