/*
import React, {Component, PropTypes} from 'react';
import yup from 'yup';
import {SSelect, SRadio, SRadioOption} from 'controls';
import DateTimePicker from './DateTimePicker';

export const repeatSchema = yup.object({
	repeat: yup.object({
		type: yup.string(),
	}),
});

export const defaultRepeatValue = {
	type: 'monthly',
	repeatEvery: 1,
	start: null,
	end: {
		type: 'never',
		times: 1,
		date: null,
	},
	repeatOn: {
		sunday: false,
	},
	repeatBy: 'dom',
};

function getRepeatEveryText(value) {
	switch (value) {
		case 'daily': return 'day';
		case 'weekly': return 'week';
		case 'monthly': return 'month';
		case 'annually': return 'year';
		default: return 'day';
	}
}

export default class RecurringEdit extends Component {
	static propTypes = {
		value: PropTypes.shape({
			type: PropTypes.string,
			repeatEvery: PropTypes.number,
			start: PropTypes.instanceOf(Date),
			end: PropTypes.shape({
				type: PropTypes.string,
				times: PropTypes.number,
				date: PropTypes.instanceOf(Date),
			}),
			repeatOn: PropTypes.object,
			repeatBy: PropTypes.string,
		}),
		onChange: PropTypes.func,
	};

	static defaultProps = {
		value: defaultRepeatValue,
	};

	state = {
		startFocused: false,
	}

	componentDidMount() {
	}

	handleTypeChange = type => {
		if (this.props.onChange) {
			this.props.onChange({
				...this.props.value,
				type,
			});
		}
	}

	handleRepeatEveryChange = ev => {
		if (this.props.onChange) {
			this.props.onChange({
				...this.props.value,
				repeatEvery: parseInt(ev.target.value, 10),
			});
		}
	}

	handleStartChange = start => {
		if (this.props.onChange) {
			this.props.onChange({
				...this.props.value,
				start,
			});
		}
	}

	handleRepeatByChange = repeatBy => {
		if (this.props.onChange) {
			this.props.onChange({
				...this.props.value,
				repeatBy,
			});
		}
	}

	handleEndsChange = type => {
		if (this.props.onChange) {
			this.props.onChange({
				...this.props.value,
				end: {
					...this.props.value.end,
					type,
				},
			});
		}
	}

	render() {
		const {repeatEvery, type, start, repeatBy, end} = this.props.value;
		const repeatEveryText = getRepeatEveryText(type);

		const weekly = type === 'weekly' ? (
			<div className="inline field">
				<label>Repeat on</label>
			</div>
		) : null;

		const monthly = type === 'monthly' ? (
			<div className="inline field">
				<label>Repeat by</label>
				<SRadio name="repeatBy" onChange={this.handleRepeatByChange} value={repeatBy} style={{display: 'inline-flex'}}>
					<div className="inline fields">
						<div className="field"><SRadioOption value="dom"><label>day of month</label></SRadioOption></div>
						<div className="field"><SRadioOption value="dow"><label>day of week</label></SRadioOption></div>
					</div>
				</SRadio>
			</div>
		) : null;

		return (
			<div>
				<div className="inline field">
					<label>Repeats</label>
					<SSelect value={type} onChange={this.handleTypeChange} component="menu">
						<div className="item" data-value="daily">Daily</div>
						<div className="item" data-value="weekly">Weekly</div>
						<div className="item" data-value="monthly">Monthly</div>
						<div className="item" data-value="annually">Annually</div>
					</SSelect>
				</div>
				<div className="inline field">
					<label>Repeat every</label>
					<div className="ui input">
						<input type="number" onChange={this.handleRepeatEveryChange} value={repeatEvery}/>
					</div>
					<label style={{marginLeft: '1rem'}}>{repeatEveryText}</label>
				</div>
				{weekly}
				{monthly}
				<div className="inline field">
					<label>Starts on</label>
					<DateTimePicker time={false} onChange={this.handleStartChange} value={start} width="auto"/>
				</div>
				<div className="inline field">
					<label>Ends</label>
					<SRadio name="ends" onChange={this.handleEndsChange} value={end.type} className="slider">
						<div className="grouped fields">
							<div className="field"><SRadioOption value="never" className="slider"><label>never</label></SRadioOption></div>
							<div className="field"><SRadioOption value="after" className="slider"><label>after</label></SRadioOption></div>
							<div className="field"><SRadioOption value="on" className="slider"><label>on</label></SRadioOption></div>
						</div>
					</SRadio>
				</div>
			</div>
		);
	}
}
*/
