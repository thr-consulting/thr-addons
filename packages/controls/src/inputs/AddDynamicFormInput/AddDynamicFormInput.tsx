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
	disableAddName?: boolean,
	children: ReactElement[],
	fieldError: (name: string | string[]) => boolean,
	onBlur: (e: any) => void,
}

/**
 * Takes Form.Input as children
 * @param props
 * @constructor
 */
export default function AddDynamicFormInput(props: Props) {
	const handleChange = (e, child): void => {
		const {name, value} = child;
		props.setFieldValue(name, value);
	};

	const renderAddButton = (index, label, arrayHelpers) => (
		<Form.Input style={{marginTop: 25}}>
			<Label fluid="true" size="large">{label}</Label>
			<Button color="green" disabled={props.disableAddName} onClick={() => arrayHelpers.push({})} type="button">Add</Button>
		</Form.Input>
	);

	const renderGrid = (arrayHelpers, arrayObj = {}, rowIndex = 0, length = 0) => {
		const {children, label = 'label', fieldError, name, onBlur} = props;
		if (!children) throw new Error('There are no children defined for AddDynamicFormInput');

		return (
			<Grid stackable columns={children.length + 1 as SemanticWIDTHS} key={rowIndex}>
				<Grid.Row>
					<Grid.Column>
						{rowIndex < 1 ? renderAddButton(length, label, arrayHelpers) : null}
					</Grid.Column>
					{Children.map(children, (Child: ReactElement, columnIndex) => {
						const {type, props: childProps} = Child;
						if (type !== FormInput) return <Form.Input label="Invalid Input Provided" placeholder="Must be a Form.Input" error/>;
						// eslint-disable-next-line
						const {onChange, value, error, name: childName, ...rest} = childProps;

						// if there is more than one column and it is the last child element.
						const deleteAction = (
							(length > 1) && (columnIndex === children.length - 1))
							? {icon: 'delete', color: 'red', onClick: () => arrayHelpers.remove(rowIndex)}
							: null;

						const n = `${name}.${rowIndex.toString()}.${childName}`;

						const childElement = (
							cloneElement(Child, {
								name: n,
								index: rowIndex,
								error: fieldError(n),
								action: deleteAction,
								onChange: handleChange,
								value: arrayObj[childProps.name] || '',
								onBlur,
								...rest,
							}));

						return (<Grid.Column key={name}>{childElement}</Grid.Column>);
					})}
				</Grid.Row>
			</Grid>
		);
	};

	const renderGridWithValues = arrayHelpers => {
		const {values} = props;
		return values.map((arrayObj, index) => renderGrid(arrayHelpers, arrayObj, index, values.length));
	};

	return (
		<FieldArray
			name={props.name}
			render={arrayHelpers => (
				isEmpty(props.values) ? renderGrid(arrayHelpers) : renderGridWithValues(arrayHelpers)
			)}
		/>
	);
}
