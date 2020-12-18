import debug from 'debug';
import React from 'react';
import {object, string, number} from 'yup';
import {Container, Form, Input} from 'semantic-ui-react';
import {useTForm} from './useTForm';
import type {TFormProps} from './types';

const d = debug('thx.controls.TForm.stories');

export default {title: 'Form/Add and Edit Forms'};

interface LockedEditForm {
	id: string;
	version: number;
}

function lockedEditFormValidation(a: any) {
	return a.clone().shape({
		id: string().required(),
		version: number().required(),
	});
}

/* ***************************************************************************** */

const addressFormValidation = object().shape({
	line1: string().required(),
	line2: string().notRequired(),
});
const addressEditFormValidation = lockedEditFormValidation(addressFormValidation);

interface AddressFormType {
	line1: string;
	line2?: string;
}
type AddressEditFormType = AddressFormType & LockedEditForm;

function AddressForm<T extends AddressFormType>(props: TFormProps<T>) {
	const {handleSubmit, formError, hasWarnings, values, handleChange, handleBlur, submitDisabled, isSubmitting} = props;

	return (
		<Form onSubmit={handleSubmit} error={formError} warning={hasWarnings}>
			<Form.Field width={6}>
				<label>Line 1</label>
				<Input name="line1" value={values.line1} onChange={handleChange} onBlur={handleBlur} />
			</Form.Field>
			<Form.Field width={6}>
				<label>Line 2</label>
				<Input name="line2" value={values.line2} onChange={handleChange} onBlur={handleBlur} />
			</Form.Field>
			<Form.Button disabled={submitDisabled} type="submit" loading={isSubmitting}>
				Submit
			</Form.Button>
		</Form>
	);
}

function AddressCreateForm() {
	const tform = useTForm<AddressFormType>({
		initialValues: {},
		validationSchema: addressFormValidation,
		onSubmit(value) {
			d(addressFormValidation.validateSync(value, {stripUnknown: true}));
		},
	});

	return <AddressForm {...tform} />;
}

function AddressEditForm() {
	const tform = useTForm<AddressEditFormType>({
		initialValues: {},
		validationSchema: addressEditFormValidation,
		onSubmit(value) {
			d(addressEditFormValidation.validateSync(value, {stripUnknown: true}));
		},
	});

	return <AddressForm {...tform} />;
}

export const Main = () => {
	return (
		<Container>
			<AddressCreateForm />
			<hr />
			<AddressEditForm />
		</Container>
	);
};
