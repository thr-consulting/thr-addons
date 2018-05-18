// @flow

import React, {Component} from 'react';
import {Field} from 'react-formal';
import {Button, Icon, Input} from 'semantic-ui-react';
import TSchemas from '@thx/tschemas';
import SForm from './SForm';
import MaskedInput from './MaskedInput';

type Props = {
	value?: boolean,
	onChange?: Function,
};

type State = {
	edit: boolean,
};

export default class SinEntry extends Component<Props, State> {
	static defaultProps = {
		value: false,
	};

	state = {
		edit: false,
	};

	props: Props;

	handleEdit = () => {
		this.setState({edit: true});
	}

	handleCancel = () => {
		this.setState({edit: false});
	}

	handleSubmit = (data: {sin: string}) => {
		if (this.props.onChange) this.props.onChange(data);
		this.setState({edit: false});
	}

	handleClear = () => {
		if (this.props.onChange) this.props.onChange(null);
		this.setState({edit: false});
	}

	render() {
		if (this.state.edit) {
			return (
				<SForm
					schema={TSchemas.sin()}
					onSubmit={this.handleSubmit}
					showSummary
				>
					<SForm.Field for="sin">
						<Input type="text" action>
							<Field type={MaskedInput} name="sin" mask={{mask: '999-999-999'}}/>
							<Button color="green">
								<Icon name="checkmark"/>
								Save
							</Button>
							<Button color="red" onClick={this.handleCancel}>
								Cancel
							</Button>
						</Input>
					</SForm.Field>
				</SForm>
			);
		}

		if (this.props.value) {
			return (
				<div>
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
				</div>
			);
		}
		return (<Button onClick={this.handleEdit}>Enter SIN</Button>);
	}
}
