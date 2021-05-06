import {Currencies} from '@thx/money';
import {moneySchemaType} from '@thx/yup-types';
import debug from 'debug';
import React from 'react';
import {Form, Container} from 'semantic-ui-react';
import {InferType, object} from 'yup';
import {TForm} from '../../form/TForm';
import {MoneyCurrencyInput} from './MoneyCurrencyInput';

const d = debug('thx.controls.money.MoneyCurrencyInput.moneycurrencyinput.stories');

export default {title: 'Inputs/MoneyCurrencyInput'};

const formValidation = object().shape({
	moneyOne: moneySchemaType().required(),
	moneyTwo: moneySchemaType().required(),
});
type FormValidationType = InferType<typeof formValidation>;

export const Main = () => (
	<Container>
		<TForm<FormValidationType> initialValues={{moneyOne: {amount: 10000, currency: 'CAD'}}} validationSchema={formValidation} onSubmit={d}>
			{props => {
				const {values, handleSubmit, handleBlur, setFieldValue} = props;

				return (
					<Form onSubmit={handleSubmit}>
						<Form.Field width={6}>
							<label>Enter some value</label>
							<MoneyCurrencyInput name="moneyOne" value={values.moneyOne} onChange={v => setFieldValue('moneyOne', v)} onBlur={handleBlur} />
						</Form.Field>
						<Form.Field width={6}>
							<label>Default of USD</label>
							<MoneyCurrencyInput
								defaultCurrency={Currencies.USD}
								name="moneyTwo"
								value={values.moneyTwo}
								onChange={v => setFieldValue('moneyTwo', v)}
								onBlur={handleBlur}
							/>
						</Form.Field>
						<Form.Button type="submit">Submit</Form.Button>
					</Form>
				);
			}}
		</TForm>
	</Container>
);
