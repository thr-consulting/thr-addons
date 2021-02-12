import debug from 'debug';
import React from 'react';
import {Form, Container} from 'semantic-ui-react';
import {moneySchemaType} from '@thx/yup-types';
import {InferType, object} from 'yup';
import {MoneyCurrencyInput} from './MoneyCurrencyInput';
import {TForm} from '../../form/TForm';

const d = debug('thx.controls.MoneyCurrencyInput.stories');

export default {title: 'Inputs/MoneyCurrencyInput'};

const formValidation = object().shape({
	money: moneySchemaType().required(),
});
type FormValidationType = InferType<typeof formValidation>;

export const Main = () => (
	<Container>
		<TForm<FormValidationType> initialValues={{money: {amount: 0, currency: 'CAD'}}} validationSchema={formValidation} onSubmit={d}>
			{props => {
				const {values, handleSubmit, handleBlur, setFieldValue} = props;

				return (
					<Form onSubmit={handleSubmit}>
						<Form.Field width={6}>
							<label>Enter some value</label>
							<MoneyCurrencyInput name="money" value={values.money} onChange={v => setFieldValue('money', v)} onBlur={handleBlur} />
						</Form.Field>
						<Form.Button type="submit">Submit</Form.Button>
					</Form>
				);
			}}
		</TForm>
	</Container>
);
