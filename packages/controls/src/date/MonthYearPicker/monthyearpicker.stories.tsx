import {LocalDate} from '@js-joda/core';
import debug from 'debug';
import React, {useState} from 'react';
import {Container, Form, Segment} from 'semantic-ui-react';
import {InferType, object} from 'yup';
import {MonthYearPicker} from './MonthYearPicker';
import {localDateSchemaType} from '../../yupTypes';
import {TForm, TFormChildrenProps} from '../../form/TForm';

const d = debug('thx.controls.MonthYearPicker.stories');

export default {title: 'MonthYearPicker'};

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
			{(props: TFormChildrenProps<FormValidationType>) => {
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
