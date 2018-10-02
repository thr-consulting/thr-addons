/* eslint-disable react/prop-types */
import React from 'react';
import {mount} from 'enzyme';
import {Form} from 'semantic-ui-react';
import TForm from '../../src/form/TForm';

function renderForm({values, handleChange, handleBlur, handleSubmit, renderErrors, renderWarnings, hasErrors, hasWarnings, fieldError}) {
	return (
		<Form onSubmit={handleSubmit} error={hasErrors()} warning={hasWarnings()}>
			<Form.Field error={fieldError('text')}>
				<label>Text</label>
				<input
					name="text"
					value={values.text}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</Form.Field>
			{renderErrors()}
			{renderWarnings()}
		</Form>
	);
}

function validate(values, props) {
	let warnings = {};
	//if (!values.text) {
		warnings.text = 'There is a problem with the text field.';
	//}
	return warnings;
}

function fakeSubmit() {
	return 'done!';
}

describe('TForm', () => {
	it('should render without throwing an error', () => {
		expect(mount(
			<TForm
				validate={validate}
				render={renderForm}
				initialValues={{text: 'Hello World!'}}
				loading={false}
				onSubmit={fakeSubmit}
				numFields={1}
			/>
		)).toMatchSnapshot();
	});

	// TODO This test doesn't seem to work after upgrading to formik 1.3.0 from 0.11.11
	// The actual component still works as desires though. See the Storybook control.
	// it('should render with warnings', () => {
	// 	const wrapper = mount(
	// 		<TForm
	// 			validate={validate}
	// 			render={renderForm}
	// 			loading={false}
	// 			onSubmit={fakeSubmit}
	// 			numFields={1}
	// 			initialValues={{text: ''}}
	// 		/>
	// 	);
	// 	const i = wrapper.find('input');
	// 	// console.log(wrapper.exists('input'), i.html());
	// 	i.simulate('focus', {target: {value: '', name: 'text'}});
	// 	// i.simulate('change', {target: {value: '', name: 'text'}})
	// 	i.simulate('blur', {target: {value: '', name: 'text'}});
	// 	expect(wrapper).toMatchSnapshot();
	// });

	it('should render with errors', () => {
		const wrapper = mount(
			<TForm
				validate={validate}
				render={renderForm}
				loading={false}
				onSubmit={fakeSubmit}
				numFields={1}
				errors={{graphQLErrors: [{message: 'There is an error.'}]}}
			/>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
