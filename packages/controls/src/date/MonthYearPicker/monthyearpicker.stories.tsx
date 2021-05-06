import {LocalDate} from '@js-joda/core';
import {localDateSchemaType} from '@thx/yup-types';
import debug from 'debug';
import React, {useState} from 'react';
import {Container, Form, Segment} from 'semantic-ui-react';
import {InferType, object} from 'yup';
import {TForm} from '../../form/TForm';
import {MonthYearPicker} from './MonthYearPicker';

const d = debug('thx.controls.date.MonthYearPicker.monthyearpicker.stories');

export default {title: 'Date/MonthYearPicker'};

export const Main = () => {
	const [value, setValue] = useState<LocalDate>();

	return (
		<Container>
			<Segment basic>
				<MonthYearPicker
					value={value}
					onChange={v => {
						d('Changed:', v);
						setValue(v);
					}}
					minDate={LocalDate.now()}
					maxDate={LocalDate.now().withMonth(11).withDayOfMonth(1)}
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
				const {values, handleSubmit, setFieldValue, handleBlur} = props;

				return (
					<Form onSubmit={handleSubmit}>
						<Form.Field width={6}>
							<label>Enter some value</label>
							<MonthYearPicker name="date" value={values.date} onChange={v => setFieldValue('date', v)} onBlur={handleBlur} />
						</Form.Field>
						<Form.Button type="submit">Submit</Form.Button>
					</Form>
				);
			}}
		</TForm>
	</Container>
);
