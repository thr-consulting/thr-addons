import {LocalDate} from '@js-joda/core';
import {formatDate} from '@thx/date';
import {localDateSchemaType} from '@thx/yup-types';
import debug from 'debug';
import React, {useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {Container, Form, Segment} from 'semantic-ui-react';
import {InferType, object} from 'yup';
import {TForm} from '../../form/TForm';
import '../DatePicker/styles.css';
import {LocalDatePicker} from './LocalDatePicker';
import {MaskedDateInput} from './MaskedDateInput';

const d = debug('thx.controls.date.LocalDatePicker.localdatepicker.stories');


export default {title: 'Date/LocalDatePicker'};

export const Main = () => {
	const [value, setValue] = useState<LocalDate | null>(LocalDate.now);

	return (
		<Container>
			<Segment basic>
				<LocalDatePicker value={value} onChange={v => setValue(v)} onBlur={() => d('onBlur')} />
			</Segment>
			<Segment>
				<p>Value is: {formatDate(value)}</p>
			</Segment>
		</Container>
	);
};

export const WithMaskedDateInput = () => {
	const [value, setValue] = useState();

	return (
		<Container>
			<Segment basic>
				<MaskedDateInput
					value={value}
					onChange={v => {
						setValue(v.target.value);
					}}
					onBlur={() => d('onBlur')}
				/>
			</Segment>
		</Container>
	);
};

const formValidation = object().shape({
	date: localDateSchemaType().required(),
});
type FormValidationType = InferType<typeof formValidation>;

export const withTForm = () => (
	<Container>
		<TForm<FormValidationType> initialValues={{date: null}} validationSchema={formValidation} onSubmit={() => {}}>
			{props => {
				const {values, handleSubmit, handleBlur, setFieldValue} = props;

				return (
					<Form onSubmit={handleSubmit}>
						<Form.Field width={6}>
							<label>Enter some value</label>
							<LocalDatePicker name="date" value={values.date} onChange={v => setFieldValue('date', v)} onBlur={handleBlur} />
						</Form.Field>
						<Form.Button type="submit">Submit</Form.Button>
					</Form>
				);
			}}
		</TForm>
	</Container>
);
