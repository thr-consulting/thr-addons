import debug from 'debug';
import React, {useState} from 'react';
import {Container, Input, Segment, Form} from 'semantic-ui-react';
import {formatDate} from '@thx/date';
import {localDateSchemaType} from '@thx/yup-types';
import {InferType, object} from 'yup';
import {LocalMonthSelect} from './LocalMonthSelect';
import {TForm} from '../../form/TForm';

const d = debug('thx.controls.LocalMonthSelect.stories');

export default {title: 'Date/LocalMonthSelect'};

export const Main = () => {
	const [value, setValue] = useState();
	const [year, setYear] = useState(new Date().getFullYear());

	return (
		<Container>
			<Segment basic>
				<LocalMonthSelect value={value} onChange={v => setValue(v)} year={year} onBlur={() => d('onBlur')} />
				<Form.Field>
					<label>Year:</label>
					<Input value={year} onChange={v => setYear(parseInt(v.target.value || '0', 10))} />{' '}
				</Form.Field>
			</Segment>
			<Segment>
				<p>Month: {formatDate(value)}</p>
			</Segment>
		</Container>
	);
};

const formValidation = object().shape({
	opt: localDateSchemaType().required(),
});
type FormValidationType = InferType<typeof formValidation>;

export const withTForm = () => (
	<Container>
		<TForm<FormValidationType> initialValues={{opt: ''}} validationSchema={formValidation} onSubmit={() => {}}>
			{props => {
				const {values, handleSubmit, setFieldValue, setFieldTouched} = props;

				return (
					<Form onSubmit={handleSubmit}>
						<Form.Field width={6}>
							<label>Enter some value</label>
							<LocalMonthSelect name="opt" value={values.opt} onChange={v => setFieldValue('opt', v)} onBlur={() => setFieldTouched('opt')} />
						</Form.Field>
						<Form.Button type="submit">Submit</Form.Button>
					</Form>
				);
			}}
		</TForm>
	</Container>
);
