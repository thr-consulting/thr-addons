import debug from 'debug';
import {Children, cloneElement, type ReactElement} from 'react';
import {Form, Radio, FormRadio, type FormGroupProps, type FormRadioProps} from 'semantic-ui-react';

const d = debug('thx.controls.inputs.RadioGroup');

export interface RadioGroupProps {
	children?: ReactElement[] | ReactElement;
	onChange?: (value?: string | number) => void;
	value?: string | number;
}

export function RadioGroup(props: RadioGroupProps & Omit<FormGroupProps, 'children'>) {
	const {children, onChange, value, ...rest} = props;

	return (
		<Form.Group {...rest}>
			{Children.map(props.children, child => {
				if (child && typeof child === 'object' && 'props' in child) {
					if (child.type === FormRadio || child.type === Radio || child.type === Form.Radio) {
						const radioChild = child as ReactElement<FormRadioProps>;
						return cloneElement(radioChild, {
							onChange: (ev: any, args: {value?: string | number}) => {
								if (onChange) onChange(args.value);
							},
							checked: value === radioChild.props.value,
						});
					}
				}
				return child;
			})}
		</Form.Group>
	);
}
