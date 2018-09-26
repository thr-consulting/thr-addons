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

function validate() {
	return {text: 'There is a problem with this field.'};
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

	it('should render with warnings', () => {
		const wrapper = mount(
			<TForm
				validate={validate}
				render={renderForm}
				loading={false}
				onSubmit={fakeSubmit}
				numFields={1}
			/>
		);
		const i = wrapper.find('input');
		// console.log(i.prop('onBlur')());
		// i.simulate('focus');
		i.simulate('blur');
		expect(wrapper).toMatchSnapshot();
	});

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
