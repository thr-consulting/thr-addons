import React from 'react';
import {mount} from 'enzyme';
import {Form} from 'semantic-ui-react';
import AddDynamicFormInput from '../../src/inputs/AddDynamicFormInput';
import TForm from '../../src/form/TForm';

describe('MaskedInput', () => {
	it('should render without throwing an error', () => {
		expect(mount(
			<TForm
				render={({setFieldValue, values, fieldError, handleBlur}) => (
					<AddDynamicFormInput
						name="addDynamicFormInputs"
						label="Name(s) of account holder(s):"
						setFieldValue={setFieldValue}
						values={values.addDynamicFormInputs}
						fieldError={fieldError}
						onBlur={handleBlur}
					>
						<Form.Input name="firstName" label="First Name"/>
						<Form.Input name="lastName" label="Last Name"/>
					</AddDynamicFormInput>
				)}
			/>
		)).toMatchSnapshot();
	});
});
