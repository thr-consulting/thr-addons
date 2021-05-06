import debug from 'debug';
import React, {Children, cloneElement} from 'react';
import {Form, Radio, FormRadio, FormGroupProps} from 'semantic-ui-react';

const d = debug('thx.controls.inputs.RadioGroup');

export interface RadioGroupProps {
	children?: JSX.Element[] | JSX.Element;
	onChange?: (value?: string | number) => void;
	value?: string | number;
}

export function RadioGroup(props: RadioGroupProps & Omit<FormGroupProps, 'children'>) {
	const {children, onChange, value, ...rest} = props;

	return (
		<Form.Group {...rest}>
			{Children.map(props.children, child => {
				if (child?.type === FormRadio || child?.type === Radio || child?.type === Form.Radio) {
					return cloneElement(child, {
						onChange: (ev: any, args: {value?: string | number}) => {
							if (onChange) onChange(args.value);
						},
						checked: value === child.props.value,
					});
				}
				return child;
			})}
		</Form.Group>
	);
}
