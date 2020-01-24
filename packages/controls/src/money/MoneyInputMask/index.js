/* eslint-disable jsx-a11y/no-static-element-interactions, react/no-unused-prop-types */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, Icon} from 'semantic-ui-react';
import Money from 'js-money';
import TextMask from 'react-text-mask';
import {createNumberMask} from 'text-mask-addons';
import isNaN from 'lodash/isNaN';
import debug from 'debug';

const d = debug('money:MoneyInputMask');

/**
 * A masked money input. Defaults to CAD funds.
 * @class
 * @property {Money} value - The money value.
 * @property {onChange} onChange - Called when the value changes.
 * @property {function} onDetailsClick - Called when the details button is clicked.
 * @property {string} [detailsIcon=server] - The Semantic UI icon to display on the details button.
 * @property {string} placeholder - The placeholder text to display.
 * @property {bool} [locked=false] - If true, cannot edit the amount.
 */
export default class MoneyInputMask extends Component {
	static propTypes = {
		value: PropTypes.instanceOf(Money),
		onChange: PropTypes.func,
		onBlur: PropTypes.func,
		onDetailsClick: PropTypes.func,
		detailsIcon: PropTypes.string,
		placeholder: PropTypes.string,
		locked: PropTypes.bool,
	};

	handleChange = value => {
		const {value: moneyString} = value.target;
		const flot = parseFloat(moneyString.replace(/,/g, ''));
		try {
			const money = Money.fromDecimal(isNaN(flot) ? 0 : flot, 'CAD');
			if (this.props.onChange) this.props.onChange(money);
		} catch (e) {
			d(e);
		}
	};

	renderDetailsButton = () => {
		const {detailsIcon, onDetailsClick, locked} = this.props;
		return (
			<Icon
				name={detailsIcon}
				color={locked ? 'blue' : null}
				link
				data-title="Details"
				data-content="Click for more details"
				onClick={onDetailsClick}
			/>
		);
	};

	render() {
		const {value} = this.props;
		const money = value ? value.toDecimal() : '';

		return (
			<TextMask
				mask={createNumberMask({
					allowDecimal: true,
					allowNegative: true,
					prefix: '',
				})}
				guide={false}
				onChange={this.handleChange}
				onBlur={this.props.onBlur}
				value={money}
				render={(ref, props) => {
					d(props);
					return (
						<Input
							onChange={props.onChange}
							onBlur={props.onBlur}
							placeholder={props.placeholder}
							icon={!!props.onDetailsClick}
						>
							<input type="text" ref={ref} style={{textAlign: 'right'}} readOnly={props.locked ? 'readonly' : null} />
							{props.onDetailsClick ? this.renderDetailsButton() : null}
						</Input>
					);
				}}
			/>
		);
	}
}
