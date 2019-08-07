import {Label, Grid, Button, Form, FormInput} from 'semantic-ui-react';
import React, {Children, cloneElement, ReactElement} from 'react';
import debug from 'debug';
import {FieldArray} from 'formik';
import isEmpty from 'lodash/isEmpty';
import {SemanticWIDTHS} from 'semantic-ui-react/dist/commonjs/generic';

const d = debug('AddDynamicFormInputs');

interface Props {
	values: object[],
	setFieldValue: (position: string, value: {}) => void,
	name: string,
	label: string,
	disableAddButton?: boolean,
	children: ReactElement[],
	fieldError: (name: string | string[]) => boolean,
	handleBlur: (e: any) => void,
}

/**
 * Takes Form.Input as children
 * @param props
 * @constructor
 */
export default function AddDynamicFormInput(props: Props) {
	const renderAddButton = (label, arrayHelpers) => (
		<Form.Input style={{marginTop: 25}}>
			<Button color="green" disabled={props.disableAddButton} onClick={() => arrayHelpers.push({})} type="button">Add</Button>
			<Label fluid="true" size="large">{label}</Label>
		</Form.Input>
	);

	const renderRemoveButton = (index, arrayHelpers) => (
		<Form.Input style={{marginTop: 25}}>
			<Button color="red" onClick={() => arrayHelpers.remove(index)} type="button">Remove</Button>
		</Form.Input>
	);

	const renderChild = (Child, rowIndex, arrayHelpers, arrayObj, cName = null) => {
		const {name, fieldError, handleBlur} = props;
		const {onChange, value, error, children, name: childName, ...rest} = Child.props; // eslint-disable-line
		const n = `${name}.${rowIndex.toString()}.${childName || cName}`;
		const p = (children) ? {
			name: childName,
			error: fieldError(n),
			children: renderChild(children[0] || children, rowIndex, arrayHelpers, arrayObj, childName),
			...rest,
		} : {
			name: n,
			onBlur: handleBlur,
			error: fieldError(n),
			onChange: (arg1, arg2) => props.setFieldValue(n, arg2 ? arg2.value : arg1),
			value: arrayObj[childName || cName] || '',
			...rest,
		};

		return (cloneElement(Child, p));
	};

	const renderGrid = (arrayHelpers, arrayObj = {}, rowIndex = 0) => {
		const {children, label = 'label', name} = props;
		if (!children) throw new Error('There are no children defined for the AddDynamicFormInput component');

		return (
			<Grid stackable columns={children.length + 1 as SemanticWIDTHS} key={rowIndex}>
				<Grid.Row>
					<Grid.Column>
						{rowIndex < 1 ? renderAddButton(label, arrayHelpers) : renderRemoveButton(rowIndex, arrayHelpers)}
					</Grid.Column>
					{Children.map(children, (Child: ReactElement) => {
						if (Child.type !== FormInput) return <Form.Input label="Invalid Input Provided" placeholder="Must be a Form.Input" error/>;
						return (<Grid.Column key={name}>{renderChild(Child, rowIndex, arrayHelpers, arrayObj)}</Grid.Column>);
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
