import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import $ from 'jquery';
import TPropTypes from 'tproptypes';

/**
 * Displays a radio option. For use within SRadio.
 * @memberOf module:addons/controls
 * @class
 * @property {module:addons/TPropTypes~reactElements} children - Any additional React components to display after the radio input.
 * @property {string|number} value - The value of this specific SRadioOption option.
 * @property {string} [styled='radio'] A Semantic UI radio class.
 */
export default class SRadioOption extends Component {
	static propTypes = {
		children: TPropTypes.reactElements,
		value: TPropTypes.stringOrNumber.isRequired,
		styled: PropTypes.string,
	};

	static defaultProps = {
		styled: 'radio',
	};

	static contextTypes = {
		sRadioValue: TPropTypes.stringOrNumber,
		sRadioOnChange: PropTypes.func,
		sRadioName: PropTypes.string,
	};

	componentDidMount() {
		this._radio = $(this._radioNode).checkbox({
			onChange: this.handleChange,
		});
	}

	componentWillUnmount() {
		this._radio.checkbox('destroy');
	}

	handleChange = () => {
		this.context.sRadioOnChange(this.props.value);
	}

	render() {
		const checked = this.context.sRadioValue === this.props.value;
		const classes = cn('ui checkbox', this.props.styled);

		return (
			<div className="field">
				<div className={classes} ref={node => (this._radioNode = node)}>
					<input type="radio" name={this.context.sRadioName} defaultChecked={checked}/>
					{this.props.children}
				</div>
			</div>
		);
	}
}
