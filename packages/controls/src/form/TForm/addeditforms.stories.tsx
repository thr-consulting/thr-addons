import {useArgs} from '@storybook/client-api';
import type {Meta} from '@storybook/react';
import debug from 'debug';
import {Form, Input} from 'semantic-ui-react';
import {number, object, string} from 'yup';
import type {TFormConfig, TFormProps} from './types';
import {useTForm} from './useTForm';

const d = debug('thx.controls.form.TForm.addeditforms.stories');

export default {
	title: 'Form/Add and Edit Forms',
	argTypes: {
		onSubmit: {type: 'function'},
		onChange: {type: 'function'},
		onValidate: {type: 'function'},
	},
} as Meta;

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

export function AddressCreateForm(args: {onSubmit: (value: any) => any}) {
	const [, updateArgs] = useArgs();

	const tform = useTForm<AddressFormType>({
		initialValues: {line1: '', line2: ''},
		validationSchema: addressFormValidation,
		onSubmit(value) {
			args.onSubmit && args.onSubmit(addressFormValidation.validateSync(value, {stripUnknown: true}));
		},
	});

	return <AddressForm {...tform} />;
}
AddressCreateForm.args = {
	enableReinitialize: false,
	loading: false,
};

export function AddressEditForm(args: TFormConfig<AddressEditFormType>) {
	const [, updateArgs] = useArgs();

	const tform = useTForm<AddressEditFormType>({
		...args,
		initialValues: {line1: '', line2: ''},
		validationSchema: addressEditFormValidation,
		async onSubmit(value, helpers) {
			await args.onSubmit(addressEditFormValidation.validateSync(value, {stripUnknown: true}), helpers);
		},
	});

	return <AddressForm {...tform} />;
}
AddressEditForm.args = {
	enableReinitialize: false,
	loading: false,
};
