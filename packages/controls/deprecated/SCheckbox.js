import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import $ from 'jquery';

/**
 * Displays a single checkbox control
 * @memberOf module:addons/controls
 * @class
 * @property {bool} value - Checked if true.
 * @property {onChange} onChange - Called when the value changes.
 * @property {string} label - The string label to display beside the checkbox.
 * @property {string} className - Additional classes to add to the checkbox.
 * @property {object} checkboxOpts - Custom Semantic UI options.
 * @property {bool} checkboxOpts.uncheckable - If true, user can't select the checkbox.
 */
export default class SCheckbox extends Component {
	static propTypes = {
		value: PropTypes.bool,
		onChange: PropTypes.func,
		label: PropTypes.string,
		className: PropTypes.string,
		checkboxOpts: PropTypes.shape({
			uncheckable: PropTypes.bool,
		}),
	};

	componentDidMount() {
		this._checkbox = $(this._checkboxNode).checkbox({
			...this.props.checkboxOpts,
			onChange: this.handleChange,
		});

		if (this.props.value === true) {
			this._checkbox.checkbox('set checked');
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.value !== this.props.value) {
			if (this.props.value) {
				this._checkbox.checkbox('set checked');
			} else {
				this._checkbox.checkbox('set unchecked');
			}
		}
	}

	componentWillUnmount() {
		this._checkbox.checkbox('destroy');
	}

	handleChange = () => {
		if (this.props.onChange) this.props.onChange(this._checkbox.checkbox('is checked'));
	}

	render() {
		return (
			<div className={cn('ui checkbox', this.props.className)} ref={node => (this._checkboxNode = node)}>
				<input type="checkbox"/>
				{this.props.label ? <label>{this.props.label}</label> : null}
			</div>
		);
	}
}
