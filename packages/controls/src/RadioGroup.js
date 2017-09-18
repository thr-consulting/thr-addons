// @flow

import React, {Component, Children} from 'react';
import type {ChildrenArray} from 'react';
import debug from 'debug';
import {Form} from 'semantic-ui-react';

const d = debug('thx:controls:RadioGroup');

type Props = {
	children: ChildrenArray<*>,
	onChange: (value: boolean | number | string | Object) => {},
	value: | boolean | number | string | Object,
};

/**
 * Groups React Semantic UI Radio elements into a single group
 * @class
 * @property {Component[]} children - Radio or Form.Radio components
 * @property {onChange} onChange - Standard onChange handler
 * @property {bool|number|string|Object} value - The currently selected radio item
 */
export default class RadioGroup extends Component<Props> {
	static defaultProps = {
		children: null,
		onChange: null,
		value: null,
	};

	props: Props;

	handleChange = (e: Event, {value}: {value: any}) => {
		d('Value changed to:', value);
		if (this.props.onChange) this.props.onChange(value);
	}

	render() {
		const {children, value, onChange, ...rest} = this.props;

		return (
			<Form.Group {...rest}>
				{Children.map(children, child => {
					if (child.type.name === 'FormRadio' || child.type.name === 'Radio') {
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
