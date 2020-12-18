import debug from 'debug';
import React, {useState} from 'react';
import {Container, Form, Segment} from 'semantic-ui-react';
import {LocalTime} from '@js-joda/core';
import {formatDate} from '@thx/date';
import {localTimeSchemaType} from '@thx/yup-types';
import {InferType, object} from 'yup';
import {LocalTimePicker} from './LocalTimePicker';
import {MaskedTimeInput} from './MaskedTimeInput';
import 'react-datepicker/dist/react-datepicker.css';
import '../DatePicker/styles.css';
import {TForm} from '../../form/TForm';

const d = debug('thx.controls.LocalTimePicker.stories');

export default {title: 'Date/LocalTimePicker'};

export const Main = () => {
	const [value, setValue] = useState<LocalTime | null>(LocalTime.now);

	return (
		<Container>
			<Segment basic>
				<LocalTimePicker
					value={value}
					onChange={v => {
						d(v);
						setValue(v);
					}}
					onBlur={() => d('onBlur')}
				/>
			</Segment>
			<Segment>
				<p>Value is: {formatDate(value, {time: true, date: false})}</p>
			</Segment>
		</Container>
	);
};

export const WithMaskedDateInput = () => {
	const [value, setValue] = useState();

	return (
		<Container>
			<Segment basic>
				<MaskedTimeInput
					value={value}
					onChange={v => {
						setValue(v.target.value);
					}}
				/>
			</Segment>
		</Container>
	);
};

const formValidation = object().shape({
	time: localTimeSchemaType().required(),
});
type FormValidationType = InferType<typeof formValidation>;

export const withTForm = () => (
	<Container>
		<TForm<FormValidationType> initialValues={{time: null}} validationSchema={formValidation} onSubmit={() => {}}>
			{props => {
				const {values, handleSubmit, setFieldValue, handleBlur} = props;

				return (
					<Form onSubmit={handleSubmit}>
						<Form.Field width={6}>
							<label>Enter some value</label>
							<LocalTimePicker name="time" value={values.time} onChange={v => setFieldValue('time', v)} onBlur={handleBlur} />
						</Form.Field>
						<Form.Button type="submit">Submit</Form.Button>
					</Form>
				);
			}}
		</TForm>
	</Container>
);
