/* eslint-disable jsx-a11y/no-static-element-interactions */
// @flow

import debug from 'debug';
import React, {Component} from 'react';
import {Input, Icon} from 'semantic-ui-react';
import Money from 'js-money';
import {makeMoney, roundTo} from '@thx/money';
import moneyInputMask from './moneyInputMask';

const d = debug('money:MoneyInput');

type Props = {
	value?: Money,
	onChange?: Money => void,
	currency?: string,
	onBlur?: () => void,
	onDetailsClick?: () => void,
	detailsIcon?: string,
	locked?: boolean,
	wholeNumber?: boolean,
};

/**
 * A masked money input. Defaults to CAD funds.
 * @class
 * @property {Money} value - The money value.
 * @property {string} [currency=CAD] - The currency if the value is set to null.
 * @property {onChange} onChange - Called when the value changes.
 * @property {function} onDetailsClick - Called when the details button is clicked.
 * @property {string} [detailsIcon=server] - The Semantic UI icon to display on the details button.
 * @property {bool} [locked=false] - If true, cannot edit the amount.
 * @property {function} onBlur - Called when the focus is lost.
 * @property {bool} [wholeNumber=false] - If true, Then decimals will be zero.
 */
export default class MoneyInput extends Component<Props> {
	static defaultProps = {
		detailsIcon: 'server',
		locked: false,
	};

	constructor(props) {
		super(props);
		if (props.value && props.currency && props.value.currency !== props.currency) {
			throw new Error(`Currency does not match ${props.value.currency} !== ${props.currency}`);
		}
	}

	componentDidMount() {
		d(`componentDidMount: ${this.props.value}`);
		if (this._input) {
			const {value, currency} = this.props;

			// Determine the currency
			let maskCurrency;
			if (currency) {
				maskCurrency = currency;
			} else if (value) {
				maskCurrency = value.currency;
			} else {
				maskCurrency = 'CAD';
			}

			// Set the input text to be the initial value prop
			this.props.wholeNumber ? this._input.value = roundTo(makeMoney(value).toDecimal(), 0) : this._input.value = makeMoney(value).toDecimal();

			moneyInputMask({
				element: this._input,
				onChange: this.handleChange,
				currency: maskCurrency,
			});
		}
	}

	componentDidUpdate(prevProps) {
		const money = makeMoney(this.props.value);
		const iv = makeMoney(this._input.value);
		if (!money.equals(iv)) {
			const prevMoney = prevProps.value;
			d(`componentDidUpdate: ${prevMoney} > ${money} | ${iv}`);

			this.props.wholeNumber ? this._input.value = roundTo(money.toDecimal(), 0) : this._input.value = money.toDecimal();
		}
	}

	componentWillUnmount() {
		delete this._input;
	}

	handleChange = value => {
		d(`handleChange: ${value}`);
		if (this.props.onChange) {
			const {currency, wholeNumber} = this.props;
			const money = makeMoney(wholeNumber ? roundTo(value, 0) : value, currency || 'CAD');
			this.props.onChange(money);
		}
	};

	renderDetailsButton = () => {
		const {detailsIcon, locked, onDetailsClick} = this.props;

		d(detailsIcon);

		return (
			<Icon
				name={detailsIcon}
				color={locked ? 'blue' : null}
				title="Details"
				onClick={onDetailsClick}
				style={{cursor: 'pointer', pointerEvents: 'inherit'}}
			/>
		);
	};


	render() {
		const {value, onChange, onBlur, onDetailsClick, detailsIcon, locked, ...rest} = this.props;
		d(`render: ${value}`);

		return (
			<Input icon={!!onDetailsClick} {...rest}>
				<input type="text" ref={r => (this._input = r)} onBlur={onBlur} readOnly={locked ? 'readonly' : null}/>
				{onDetailsClick ? this.renderDetailsButton() : null}
			</Input>
		);
	}
}
