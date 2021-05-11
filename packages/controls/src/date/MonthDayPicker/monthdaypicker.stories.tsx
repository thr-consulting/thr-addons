import debug from 'debug';
import React, {useState} from 'react';
import {Container, Form, Segment} from 'semantic-ui-react';
import {InferType, object, number} from 'yup';
import {TForm} from '../../form/TForm';
import {MonthDayPicker} from './MonthDayPicker';

const d = debug('thx.controls.date.MonthDayPicker.monthdaypicker.stories');

export default {title: 'Date/MonthDayPicker'};

export const Main = () => {
	const [value, setValue] = useState();

	return (
		<Container>
			<Segment basic>
				<MonthDayPicker
					value={value}
					onChange={v => {
						d('Changed:', v);
						setValue(v);
					}}
				/>
			</Segment>
		</Container>
	);
};

const formValidation = object().shape({
	month: number().required(),
});
type FormValidationType = InferType<typeof formValidation>;

export const withTForm = () => (
	<Container>
		<TForm<FormValidationType> initialValues={{month: 0}} validationSchema={formValidation} onSubmit={() => {}}>
			{props => {
				const {values, handleSubmit, setFieldValue, handleBlur} = props;

				return (
					<Form onSubmit={handleSubmit}>
						<Form.Field width={6}>
							<label>Enter some value</label>
							<MonthDayPicker name="month" value={values.month} onChange={v => setFieldValue('month', v)} onBlur={handleBlur} />
						</Form.Field>
						<Form.Button type="submit">Submit</Form.Button>
					</Form>
				);
			}}
		</TForm>
	</Container>
);
