import {Grid, Button, Form, FormInput, SemanticWIDTHS, SemanticWIDTHSNUMBER} from 'semantic-ui-react';
import React, {Children, cloneElement, ReactElement} from 'react';
import debug from 'debug';
import {FieldArray, FieldArrayRenderProps} from 'formik';
import isEmpty from 'lodash/isEmpty';

const d = debug('thx.controls.inputs.AddDynamicFormInputs');

interface Props<Values> {
	name: string;
	values: Values;
	children: JSX.Element | JSX.Element[];
	setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
	buttonLabel?: string;
	disableAddButton?: boolean;
	fieldError?: (fieldName: keyof Values | string | number) => boolean;
	onBlur?: (event: React.FocusEvent<any>) => void;
	columnCount?: SemanticWIDTHSNUMBER;
}

export function AddDynamicFormInput<Values extends any[]>(props: Props<Values>) {
	const {disableAddButton, children, buttonLabel, name, columnCount, fieldError, onBlur} = props;

	const renderAddButton = (label = 'Add', arrayHelpers: FieldArrayRenderProps) => (
		<Form.Input style={{marginTop: 22}}>
			<Button
				type="button"
				color="green"
				disabled={disableAddButton || false}
				onClick={() => {
					// There are no objects in the arrayHelpers.form.values on initial load, so we have to add two objects on
					// the first AddButton click.
					if (isEmpty(arrayHelpers.form.values[name])) arrayHelpers.push({});
					arrayHelpers.push({});
				}}
			>
				{label}
			</Button>
		</Form.Input>
	);

	const renderRemoveButton = (index: number, arrayHelpers: FieldArrayRenderProps) => (
		<Form.Input style={{marginTop: 22}}>
			<Button color="red" onClick={() => arrayHelpers.remove(index)} type="button">
				Remove
			</Button>
		</Form.Input>
	);

	const renderChild = (
		Child: ReactElement,
		rowIndex: number,
		arrayHelpers: FieldArrayRenderProps,
		arrayObj: {[index: string]: any},
		childName = null,
	): React.ReactElement => {
		const {children: childPropChildren, name: childPropName, value: childPropValue, ...rest} = Child.props;
		const fieldName = `${name}.${rowIndex}.${childPropName || childName}`;
		const error = fieldError ? fieldError(fieldName) : false;

		if (childPropChildren)
			return cloneElement(Child, {
				children: Children.map(childPropChildren, child =>
					renderChild(child, rowIndex, arrayHelpers, arrayObj, Child.props.name),
				),
				error,
				name: childPropName,
				value: childPropValue,
				...rest,
			});

		const setFieldValue = (arg1: any, arg2: {value: any}) => props.setFieldValue(fieldName, arg2 ? arg2.value : arg1);
		const value = childPropValue || arrayObj[childPropName || fieldName] || '';

		return cloneElement(Child, {value, error, name: fieldName, onBlur, onChange: setFieldValue, ...rest});
	};

	const renderGrid = (
		arrayHelpers: React.PropsWithChildren<FieldArrayRenderProps>,
		arrayObj: Values | object = {},
		rowIndex = 0,
	) => {
		if (!children) throw new Error('There are no children defined for the AddDynamicFormInput component');
		let columns = columnCount || Children.count(children); // children.length;
		if (columns > 15) columns = 15;
		if (columns < 1) columns = 1;

		return (
			<Grid stackable columns={(columns + 1) as SemanticWIDTHS} key={rowIndex}>
				<Grid.Row>
					<Grid.Column>
						{rowIndex < 1 ? renderAddButton(buttonLabel, arrayHelpers) : renderRemoveButton(rowIndex, arrayHelpers)}
					</Grid.Column>

					{Children.map(children, (Child: ReactElement, index) => {
						const width = Child.props.width ? Child.props.width : undefined;
						const key = `${name}${index}${rowIndex}`;
						return (
							<>
								{index > 0 && index % columns === 0 ? <Grid.Column /> : null}
								<Grid.Column width={width} key={key}>
									{Child.type !== FormInput ? Child : renderChild(Child, rowIndex, arrayHelpers, arrayObj)}
								</Grid.Column>
							</>
						);
					})}
				</Grid.Row>
			</Grid>
		);
	};

	return (
		<FieldArray
			name={props.name}
			render={(arrayHelpers: FieldArrayRenderProps) => {
				return isEmpty(props.values)
					? renderGrid(arrayHelpers)
					: props.values.map((arrayObj, index) => renderGrid(arrayHelpers, arrayObj, index));
			}}
		/>
	);
}
