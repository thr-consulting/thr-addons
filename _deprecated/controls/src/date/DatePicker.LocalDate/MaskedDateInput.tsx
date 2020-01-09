import React, {Component} from 'react';
import MaskedInput from '../../inputs/MaskedInput';


/* eslint-disable react/prefer-stateless-function */
// If this is not a class then we get a ref error on the client.
export default class MaskedDateInput extends Component {
	render() {
		const {onChange, ...inputRest} = this.props;
		return (
			<MaskedInput
				mask={{mask: '99/99/9999'}}
				onChange={inputValue => onChange({target: {value: inputValue}})}
				{...inputRest}
			/>
		);
	}
}
