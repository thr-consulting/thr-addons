import React, {Component, PropTypes} from 'react';
import TPropTypes from 'tproptypes';
import serializeForm from './lib/serializeForm';

/**
 * A simple form that serializes the data on submit. No validation.
 *
 * Note: State is stored in DOM! This is NOT the normal React way.
 * This component cannot be controlled and has no default values.
 *
 * It uses a non-jquery version of jquery.serializeJSON (https://github.com/marioizquierdo/jquery.serializeJSON)
 * for serializing the form. See their docs for more powerful ways of typing and naming form elements.
 *
 * @class
 * @memberOf module:addons/controls
 * @property {string|element} [component=form] - The type of component to use as the form.
 * @property {module:addons/controls.QuickForm.onSubmit} onSubmit - Called when the form sumbits.
 * @property {onChange} onChange - Called when the form changes.
 * @property {module:addons/TPropTypes~reactElements} children - Form children elements.
 */
export default class QuickForm extends Component {
	static propTypes = {
		component: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.element,
		]),
		onSubmit: PropTypes.func,
		onChange: PropTypes.func,
		children: TPropTypes.reactElements,
	};

	static defaultProps = {
		component: 'form',
	};

	handleSubmit = ev => {
		ev.preventDefault();
		const data = serializeForm(this._form);
		this.props.onSubmit(ev, data);
	}

	handleChange = () => {
		const data = serializeForm(this._form);
		this.props.onChange(data);
	}

	render() {
		const {
			children,
			component: Xomponent,
			onSubmit,
			onChange,
			...props
		} = this.props;

		return (
			<Xomponent
				{...props}
				onSubmit={onSubmit && this.handleSubmit}
				onChange={onChange && this.handleChange}
				ref={r => (this._form = r)}
			>
				{children}
			</Xomponent>
		);
	}
}

/**
 * Called when the form is submitting.
 * @memberOf module:addons/controls.QuickForm
 * @callback onSubmit
 * @param {object} event - Submit event
 * @param {object} data - Form data
 */
