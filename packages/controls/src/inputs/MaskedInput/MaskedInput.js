// @flow

import React, {Component} from 'react';
import {Input} from 'semantic-ui-react';
import 'inputmask/dist/inputmask/inputmask.numeric.extensions';
import Inputmask from 'inputmask';

/**
 * See source code for detailed prop types or {@link https://github.com/RobinHerbots/jquery.inputmask|here} for more info.
 * @typedef {Object} inputmaskPropTypes
 */

type Props = {
	value?: string,
	onChange?: (data: string) => {},
	onBlur?: () => {},
	mask?: {
		placeholder?: string,
		optionalmarker?: {
			start: string,
			end: string,
		},
		quantifiermarker?: {
			start: string,
			end: string,
		},
		groupmarker?: {
			start: string,
			end: string,
		},
		alternatormarker?: string,
		escapeChar?: string,
		mask: string,
		repeat?: number,
		greedy?: boolean,
		autoUnmask?: boolean,
		removeMaskOnSubmit?: boolean,
		clearMaskOnLostFocus?: boolean,
		insertMode?: boolean,
		clearIncomplete?: boolean,
		alias?: string,
		onKeyDown?: (event: any, buffer: any, caretPos: number, opts?: Object) => {},
		onBeforeMask?: (initialValue: string, opts?: Object) => string,
		onBeforePaste?: (pastedValue: string, opts?: Object) => string,
		onBeforeWrite?: (event: any, buffer: any, caretPos: number, opts?: Object) => Object,
		onUnMask?: (maskedValue: string, unmaskedValue: string) => string,
		showMaskOnFocus?: boolean,
		showMaskOnHover?: boolean,
		onKeyValidation?: (key: any, result: any) => {},
		numericInput?: boolean,
		rightAlign?: boolean,
		undoOnEscape?: boolean,
		radixPoint?: string,
		groupSeparator?: string,
		keepStatic?: boolean,
		positionCaretOnTab?: boolean,
		tabThrough?: boolean,
		isComplete?: (buffer: any, opts?: Object) => boolean,
		canClearPosition?: (maskset: any, position: number, lastValidPosition: number, opts?: Object) => boolean,
		postValidation?: (buffer: any, currentResult: any, opts?: any) => boolean | Object,
		preValidation?: (buffer: any, pos: number, char: any, isSelection: boolean, opts?: Object) => boolean | Object,
		staticDefinitionSymbol?: string,
		nullable?: boolean,
		positionCaretOnClick?: string,
		casing?: string,
		inputmode?: string,
		colorMask?: string,
	}
};

/**
 * Displays a masked input form. Warning: this component uses jquery for masking so it renders quite slow. Do not use
 * hundreds of these on one screen at the same time.
 * @class
 * @property {string|number} [value=null] - The value to display
 * @property {onChange} [onChange=null] - Called when the value changes.
 * @property {inputmaskPropTypes} [mask=null] - The mask object specified at {@link https://github.com/RobinHerbots/jquery.inputmask|here}.
 */
export default class MaskedInput extends Component<Props> {
	static displayName = 'MaskedInput';

	static defaultProps = {
		value: null,
		onChange: null,
		mask: null,
	};

	componentDidMount() {
		if (this.props.value && this._input) this._input.value = this.props.value;
		const im = new Inputmask({
			...this.props.mask,
			oncomplete: this.handleComplete,
			oncleared: this.handleCleared,
			onincomplete: this.handleIncomplete,
		});
		im.mask(this._input);
	}

	componentDidUpdate(prevProps: Object) {
		if (prevProps.value !== this.props.value && this._input) {
			this._input.value = this.props.value || '';
		}
		if (prevProps.mask !== this.props.mask) {
			const im = new Inputmask({
				...this.props.mask,
				oncomplete: this.handleComplete,
				oncleared: this.handleCleared,
				onincomplete: this.handleIncomplete,
			});
			im.mask(this._input);
		}
	}

	handleComplete = (ev: Object) => {
		if (this.props.onChange) this.props.onChange(ev.target.value);
	};

	handleCleared = () => {
		if (this.props.onChange) this.props.onChange('');
	};

	handleIncomplete = (ev: Object) => {
		if (this.props.onChange) this.props.onChange(ev.target.value);
	};


	_input: ?HTMLInputElement;

	render() {
		const {value, onChange, onBlur, mask, ...rest} = this.props;
		return (
			<Input {...rest} >
				<input ref={r => (this._input = r)} onBlur={onBlur}/>
			</Input>
		);
	}
}
