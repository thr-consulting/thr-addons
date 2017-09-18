import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import isArray from 'lodash/isArray';
import $ from 'jquery';
import TPropTypes from 'tproptypes';

/**
 * Displays a SemanticUI dropdown select component.
 * @memberOf module:addons/controls
 * @class
 * @property {module:addons/TPropTypes~reactElements} children - Any children to display in the dropdown. Usually option or div depending on component.
 * @property {string} className - Additional classes applied to select.
 * @property {onChange} onChange - Called when the value changes.
 * @property {string|number|bool} value - The value of the currently selected item.
 * @property {string} [component=null] - Changes the type of dropdown. If null, renders a select. If 'menu' renders a div.
 */
export default class SSelect extends Component {
	static propTypes = {
		children: TPropTypes.reactElements,
		className: PropTypes.string,
		onChange: PropTypes.func,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
		component: PropTypes.string,
	};

	static defaultProps = {
		value: null,
	};

	componentDidMount() {
		this._mounting = true;
		this._select = $(this._selectNode)
			.dropdown({
				onChange: this.handleChange,
			});
		const dropdownValue = this._select.dropdown('get item', this.props.value);
		if (dropdownValue)	{
			this._select.dropdown('set selected', this.props.value);
		} else {
			this._select.dropdown('clear');
		}
		this._mounting = false;
	}

	componentDidUpdate() {
		let value = this._select.dropdown('get value');
		if (isArray(value)) value = value[0];
		this._mounting = true;
		if (value !== this.props.value) {
			const dropdownValue = this._select.dropdown('get item', this.props.value);
			if (dropdownValue) {
				this._select.dropdown('set selected', this.props.value);
			} else {
				this._select.dropdown('clear');
			}
		}
		this._mounting = false;
	}

	handleChange = value => {
		if (!this._mounting && this.props.onChange) this.props.onChange(value);
	}

	render() {
		const {className} = this.props;

		if (this.props.component === 'menu') {
			return (
				<div className={cn('ui dropdown', className)} ref={node => (this._selectNode = node)}>
					<div className="text"/>
					<i className="dropdown icon"/>
					<div className="menu">
						{this.props.children}
					</div>
				</div>
			);
		}

		return (
			<select className={cn('ui dropdown', className)} ref={node => (this._selectNode = node)}>
				{this.props.children}
			</select>
		);
	}
}
