import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import TPropTypes from 'tproptypes';

/**
 * Groups a bunch of SRadioOption's together as a single form element.
 * @memberOf module:addons/controls
 * @class
 * @property {string} className - Additional classes for the grouping div.
 * @property {module:addons/TPropTypes~reactElements} children - Any React element children. Usually SRadioOption components.
 * @property {string|number} value - The value of a child SRadioOption.
 * @property {onChange} onChange - Called when the value changes.
 * @property {string} name - The name of the field.
 */
export default class SRadio extends Component {
	static propTypes = {
		className: PropTypes.string,
		children: TPropTypes.reactElements,
		value: TPropTypes.stringOrNumber,
		onChange: PropTypes.func,
		name: PropTypes.string.isRequired,
	};

	static defaultProps = {
		className: 'inline',
	};

	static childContextTypes = {
		sRadioValue: TPropTypes.stringOrNumber,
		sRadioOnChange: PropTypes.func,
		sRadioName: PropTypes.string,
	};

	getChildContext() {
		return {
			sRadioValue: this.props.value,
			sRadioOnChange: this.handleChange,
			sRadioName: this.props.name,
		};
	}

	handleChange = value => {
		this.props.onChange(value);
	}

	render() {
		return (
			<div className={cn(this.props.className, 'fields')}>
				{this.props.children}
			</div>
		);
	}
}
