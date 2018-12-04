// @flow

import React, {Component} from 'react';
import {Button, Icon, Input, Form} from 'semantic-ui-react';
import isEmpty from 'lodash/isEmpty';
import TSchemas from '@thx/tschemas';
import TForm from '../../form/TForm';
import MaskedInput from '../MaskedInput';

type Props = {
	/** Just the boolean value if a SIN exists or not */
	value?: boolean,
	/** Only returns boolean if the SIN is entered properly or not */
	onChange?: (value: boolean) => void,
	/** Called with the actual SIN text value */
	onSinChange?: (value: string) => void,
	onBlur?: () => void,
};

type State = {
	showEditor: boolean,
};

/**
 * A SIN entry control. The main value is a boolean to show whether the SIN has been entered or not. This way the actual information doesn't pass into the client.
 * The onSinChange() prop will be called with the actual SIN text which can be sent to the server separately.
 * @class
 * @property {boolean} value - Just the boolean value if a SIN exists or not
 * @property {function} onChange - Only returns boolean if the SIN is entered properly or not
 * @property {function} onSinChange
 * @property {function} onBlur
 */
export default class SinEntry extends Component<Props, State> {
	static displayName = 'SinEntry';

	static defaultProps = {
		value: false,
	};

	state = {
		showEditor: false,
	};

	handleEdit = () => {
		this.setState({showEditor: true});
	};

	handleCancel = () => {
		this.setState({showEditor: false});
		if (this.props.onBlur) this.props.onBlur();
	};

	handleSubmit = data => {
		if (this.props.onChange) this.props.onChange(!isEmpty(data.sin));
		if (this.props.onSinChange) this.props.onSinChange(data.sin);
		this.setState({showEditor: false});
		if (this.props.onBlur) this.props.onBlur();
	};

	handleClear = () => {
		if (this.props.onChange) this.props.onChange(false);
		if (this.props.onSinChange) this.props.onSinChange(null);
		this.setState({showEditor: false});
		if (this.props.onBlur) this.props.onBlur();
	};

	renderForm = ({handleSubmit, handleBlur, values, hasWarnings, setFieldValue}) => (
		<Form.Field error={hasWarnings()}>
			<Input type="text" action>
				<MaskedInput
					name="sin"
					mask={{mask: '999-999-999'}}
					onChange={v => setFieldValue('sin', v)}
					value={values.sin}
					onBlur={handleBlur}
					autoFocus
				/>
				<Button color="green" onClick={handleSubmit}>
					<Icon name="checkmark"/>
					Save
				</Button>
				<Button color="red" onClick={this.handleCancel}>
					Cancel
				</Button>
			</Input>
		</Form.Field>
	);


	render() {
		if (this.state.showEditor) {
			return (
				<TForm
					initialValues={{sin: ''}}
					render={this.renderForm}
					onSubmit={this.handleSubmit}
					validationSchema={TSchemas.sin()}
					numFields={1}
				/>
			);
		}

		if (this.props.value) {
			return (
				<Button.Group>
					<Button
						color="teal"
						content="SIN Entered"
						icon="checkmark"
					/>
					<Button color="grey" onClick={this.handleEdit}>Re-enter SIN</Button>
					<Button.Or/>
					<Button onClick={this.handleClear}>Clear SIN</Button>
				</Button.Group>
			);
		}

		return (<Button onClick={this.handleEdit}>Enter SIN</Button>);
	}
}
