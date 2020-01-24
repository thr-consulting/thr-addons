import React, {Component, Children} from 'react';
import {Form, Radio, FormRadio} from 'semantic-ui-react';

// type Props = {
// 	/** Any components but handles Radio components specially. */
// 	children?: ChildrenArray<*>,
// 	/** Called when one of the Radio boxes is selected. */
// 	onChange?: (value: boolean | number | string | Object) => void,
// 	onBlur?: () => void,
// 	/** This value will select the correct Radio component with the matching value */
// 	value?: | boolean | number | string | Object,
// };

/**
 * Groups React Semantic UI Radio elements into a single group
 * @class
 * @property {Component[]} children - Radio or Form.Radio components
 * @property {onChange} onChange - Standard onChange handler
 * @property {bool|number|string|Object} value - The currently selected radio item
 */
export default class RadioGroup extends Component {
	static displayName = 'RadioGroup';

	static defaultProps = {
		children: null,
		onChange: null,
		onBlur: null,
		value: null,
	};

	handleChange = (e, {value}) => {
		if (this.props.onChange) this.props.onChange(value);
	};

	render() {
		const {children, value, onChange, onBlur, ...rest} = this.props;

		return (
			<Form.Group {...rest} onBlur={onBlur}>
				{Children.map(children, child => {
					if (child.type === FormRadio || child.type === Radio || child.type === Form.Radio) {
						return React.cloneElement(child, {
							onChange: this.handleChange,
							checked: value === child.props.value,
						});
					}
					return child;
				})}
			</Form.Group>
		);
	}
}
