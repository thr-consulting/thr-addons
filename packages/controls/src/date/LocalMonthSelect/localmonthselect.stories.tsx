import debug from 'debug';
import React, {useState} from 'react';
// import {Container, Input, Segment, Form} from 'semantic-ui-react';
import {themes, Provider, Segment, Form, Input} from '@fluentui/react-northstar';
import {formatDate} from '@thx/date';
import type {LocalDate} from '@js-joda/core';
// import {InferType, object} from 'yup';
import {LocalMonthSelect} from './LocalMonthSelect';
// import {localDateSchemaType} from '../../yupTypes';
// import {TForm, TFormChildrenProps} from '../../form/TForm';

const d = debug('thx.controls.LocalMonthSelect.stories');

export default {title: 'LocalMonthSelect'};

export const Main = () => {
	const [value, setValue] = useState<LocalDate | null>();
	const [year, setYear] = useState(new Date().getFullYear());

	return (
		<Provider theme={themes.teams}>
			<Segment>
				<Form.Field
					label="Month"
					control={
						<LocalMonthSelect
							value={value}
							onChange={(v) => {
								d(`onChange: ${v}`);
								setValue(v);
							}}
							year={year}
							// @ts-ignore
							onBlur={() => d('onBlur')}
						/>
					}
				/>
				<Form.Field label="Year" control={<Input value={year} onChange={(ev, v) => setYear(parseInt(v?.value || '0', 10))} />} />
			</Segment>
			<Segment>
				<p>State: {formatDate(value)}</p>
			</Segment>
		</Provider>
	);
};

// const formValidation = object().shape({
// 	opt: localDateSchemaType().required(),
// });
// type FormValidationType = InferType<typeof formValidation>;
//
// export const withTForm = () => (
// 	<Container>
// 		<TForm<FormValidationType> initialValues={{opt: ''}} validationSchema={formValidation} onSubmit={() => {}}>
// 			{(props: TFormChildrenProps<FormValidationType>) => {
// 				const {values, handleSubmit, setFieldValue, setFieldTouched} = props;
//
// 				return (
// 					<Form onSubmit={handleSubmit}>
// 						<Form.Field width={6}>
// 							<label>Enter some value</label>
// 							<LocalMonthSelect name="opt" value={values.opt} onChange={v => setFieldValue('opt', v)} onBlur={() => setFieldTouched('opt')} />
// 						</Form.Field>
// 						<Form.Button type="submit">Submit</Form.Button>
// 					</Form>
// 				);
// 			}}
// 		</TForm>
// 	</Container>
// );
