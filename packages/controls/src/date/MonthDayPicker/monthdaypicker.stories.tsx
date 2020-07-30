import debug from 'debug';
import React, {useState} from 'react';
// import {InferType, object, number} from 'yup';
import {Provider, Segment, themes} from '@fluentui/react-northstar';
import type {LocalDate} from '@js-joda/core';
import {MonthDayPicker} from './MonthDayPicker';
// import {TForm, TFormChildrenProps} from '../../form/TForm';

const d = debug('thx.controls.MonthDayPicker.stories');

export default {title: 'MonthDayPicker'};

export const Main = () => {
	const [value, setValue] = useState<LocalDate>();

	return (
		<Provider theme={themes.teams}>
			<Segment>
				<MonthDayPicker
					value={value}
					onChange={v => {
						d('Changed:', v);
						setValue(v);
					}}
				/>
			</Segment>
		</Provider>
	);
};

// const formValidation = object().shape({
// 	month: number().required(),
// });
// type FormValidationType = InferType<typeof formValidation>;
//
// export const withTForm = () => (
// 	<Container>
// 		<TForm<FormValidationType> initialValues={{month: 0}} validationSchema={formValidation} onSubmit={() => {}}>
// 			{(props: TFormChildrenProps<FormValidationType>) => {
// 				const {values, handleSubmit, setFieldValue, handleBlur} = props;
//
// 				return (
// 					<Form onSubmit={handleSubmit}>
// 						<Form.Field width={6}>
// 							<label>Enter some value</label>
// 							<MonthDayPicker name="month" value={values.month} onChange={v => setFieldValue('month', v)} onBlur={handleBlur} />
// 						</Form.Field>
// 						<Form.Button type="submit">Submit</Form.Button>
// 					</Form>
// 				);
// 			}}
// 		</TForm>
// 	</Container>
// );
