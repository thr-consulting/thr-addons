/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, Icon} from 'semantic-ui-react';
import Money from 'js-money';
import TPropTypes from '@thx/tproptypes';
import debug from 'debug';
import moneyInputMask from './moneyInputMask';

const d = debug('money:MoneyInput');

function moneyFromProps(value) {
	d(`moneyFromProps(${value})`);
	let money;
	if (value) {
		if (value.toDecimal) {
			money = value;
		} else {
			money = new Money(value.amount, value.currency);
		}
	} else {
		money = new Money(0, 'CAD');
	}
	return money;
}

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
export default class MoneyInput extends Component {
	static propTypes = {
		value: TPropTypes.money,
		onChange: PropTypes.func,
		onDetailsClick: PropTypes.func,
		detailsIcon: PropTypes.string,
		placeholder: PropTypes.string,
		locked: PropTypes.bool,
	};

	static defaultProps = {
		detailsIcon: 'server',
		locked: false,
	};

	constructor(props) {
		super(props);
		const money = moneyFromProps(this.props.value);
		this.state = {money};
	}

	componentDidMount() {
		if (this._input) {
			this._input.value = this.state.money.toDecimal();
			moneyInputMask({
				element: this._input,
				onChange: this.handleChange,
				currency: this.state.money.currency,
			});
		}
	}

	componentDidUpdate(prevProps) {
		const money = moneyFromProps(this.props.value);
		const prevMoney = moneyFromProps(prevProps.value);
		if (!money.equals(prevMoney) && !money.equals(this.state.money)) {
			this._input.value = money.toDecimal();
		}
	}

	handleChange = value => {
		const money = Money.fromDecimal(value, this.state.money.currency);
		this.setState({money});
		if (this.props.onChange) this.props.onChange(money);
	}

	render() {
		const {onDetailsClick, placeholder, detailsIcon, locked} = this.props;

		const detailsButton = onDetailsClick ? (
			<Icon
				name={detailsIcon}
				color={locked ? 'blue' : null}
				link
				data-title="Details"
				data-content="Click for more details"
				onClick={onDetailsClick}
			/>
		) : null;

		return (
			<Input placeholder={placeholder} icon={!!onDetailsClick}>
				<input type="text" ref={r => (this._input = r)} readOnly={locked ? 'readonly' : null}/>
				{detailsButton}
			</Input>
		);
	}
}
