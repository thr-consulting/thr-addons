import {Grid, Button, Form, FormInput} from 'semantic-ui-react';
import React, {Children, cloneElement, ReactElement} from 'react';
import debug from 'debug';
import {FieldArray} from 'formik';
import isEmpty from 'lodash/isEmpty';
import {SemanticWIDTHS} from 'semantic-ui-react/dist/commonjs/generic';

const d = debug('thx.controls.inputs.AddDynamicFormInputs');

interface Props {
	name: string,
	values: object[],
	children: ReactElement[],
	setFieldValue: (position: string, value: {}) => void,
	buttonLabel?: string,
	disableAddButton?: boolean,
	fieldError?: (name: string | string[]) => boolean,
	handleBlur?: (event) => void,
	columnCount? : number | string,
}

/**
 * Takes Form.Input as children
 * @param props
 * @constructor
 */
export default function AddDynamicFormInput(props: Props) {
	const renderAddButton = (label = 'Add', arrayHelpers) => (
		<Form.Input style={{marginTop: 22}}>
			<Button
				color="green"
				disabled={props.disableAddButton}
				onClick={() => {
					// There are no objects in the arrayHelpers form values on initial load, so we have to add two objects on
					// the first AddButton click.
					if (isEmpty(arrayHelpers.form.values)) arrayHelpers.push({});
					arrayHelpers.push({});
				}}
				type="button"
			>{label}
			</Button>
		</Form.Input>
	);

	const renderRemoveButton = (index, arrayHelpers) => (
		<Form.Input style={{marginTop: 22}}>
			<Button color="red" onClick={() => arrayHelpers.remove(index)} type="button">Remove</Button>
		</Form.Input>
	);

	const renderChild = (Child, rowIndex, arrayHelpers, arrayObj, cName = null) => {
		const {name, fieldError, handleBlur} = props; // these are the AddDynamicFormInput props.
		const {children, ...rest} = Child.props; // eslint-disable-line
		const n = `${name}.${rowIndex.toString()}.${Child.props.name || cName}`;

		const setFieldValue = ((arg1, arg2) => props.setFieldValue(n, arg2 ? arg2.value : arg1));
		const value = Child.props.value || arrayObj[Child.props.name || cName] || '';
		const error = fieldError ? fieldError(n) : false;

		const p = (children)
			? {children: Children.map(children, child => renderChild(child, rowIndex, arrayHelpers, arrayObj, Child.props.name)), error, ...rest}
			: {value, error, name: n, onBlur: handleBlur, onChange: setFieldValue, ...rest};

		return (cloneElement(Child, p));
	};

	const renderGrid = (arrayHelpers, arrayObj = {}, rowIndex = 0) => {
		const {children, buttonLabel, name, columnCount} = props; // these are the AddDynamicFormInput props.
		if (!children) throw new Error('There are no children defined for the AddDynamicFormInput component');
		const columns = columnCount || children.length;

		return (
			<Grid stackable columns={(columns as number + 1) as SemanticWIDTHS} key={rowIndex}>
				<Grid.Row>
					<Grid.Column>
						{rowIndex < 1 ? renderAddButton(buttonLabel, arrayHelpers) : renderRemoveButton(rowIndex, arrayHelpers)}
					</Grid.Column>

					{Children.map(children, (Child: ReactElement, index) => {
						const width = Child.props.width ? Child.props.width : undefined;
						const key = name.concat(index.toString()).concat(rowIndex.toString());

						if (Child.type !== FormInput) return <Form.Input key={key} label="Invalid Input Provided" placeholder="Must be a Form.Input" error/>;
						return (<Grid.Column width={width} key={key}>{renderChild(Child, rowIndex, arrayHelpers, arrayObj)}</Grid.Column>);
					})}
				</Grid.Row>
			</Grid>
		);
	};

	return (
		<FieldArray
			name={props.name}
			render={arrayHelpers => (
				isEmpty(props.values)
					? renderGrid(arrayHelpers)
					: props.values.map((arrayObj, index) => renderGrid(arrayHelpers, arrayObj, index))
			)}
		/>
	);
}
