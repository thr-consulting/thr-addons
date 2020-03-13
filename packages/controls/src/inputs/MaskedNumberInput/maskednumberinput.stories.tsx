import debug from 'debug';
import React, {useState} from 'react';
import {InferType, number, object} from 'yup';
import {Form, Container} from 'semantic-ui-react';
import {MaskedNumberInput} from './MaskedNumberInput';
import {TForm, TFormChildrenProps} from '../../form/TForm';

const d = debug('thx.controls.MaskedInput.stories');

export default {title: 'MaskedNumberInput'};

const withTypeNumberFormValidation = object().shape({
	masked: number().nullable(),
});
type withTypeNumberFormValidationType = InferType<typeof withTypeNumberFormValidation>;

export const WithTypeNumber = () => {
	const [val, setVal] = useState<number | null>();

	return (
		<Container>
			<TForm<withTypeNumberFormValidationType>
				initialValues={{masked: null}}
				validationSchema={withTypeNumberFormValidation}
				onSubmit={values => setVal(values.masked)}
			>
				{({
					values,
					handleSubmit,
					handleBlur,
					setFieldValue,
					renderWarnings,
					hasWarnings,
					hasErrors,
				}: TFormChildrenProps<withTypeNumberFormValidationType>) => {
					return (
						<Form onSubmit={handleSubmit} error={hasErrors} warning={hasWarnings}>
							<Form.Field width={6}>
								<label>Enter number</label>
								<MaskedNumberInput
									name="masked"
									mask={{mask: '99-99.99'}}
									value={values.masked || undefined}
									onChange={value => setFieldValue('masked', value)}
									onBlur={handleBlur}
								/>
							</Form.Field>
							<Form.Button type="submit">Submit</Form.Button>
							<label>return value: {val}</label>
							{renderWarnings()}
						</Form>
					);
				}}
			</TForm>
		</Container>
	);
};
