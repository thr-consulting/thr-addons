import React, {Component} from 'react';
import {Button, Image} from 'semantic-ui-react';
import debug from 'debug';
import {ScriptelContext} from '../Scriptel/ScriptelContext';

const d = debug('thx:ScriptelInput');

// type Props = {
// 	value?: Object,
// 	onChange?: () => {},
// };
//
// type State = {
// 	entering: boolean,
// };

/**
 * A signature enter and display control.
 */
export default class ScriptelInput extends Component {
	static contextType = ScriptelContext;

	static defaultProps = {
		value: {
			width: 0,
			height: 0,
			data: null,
		},
	};

	state = {
		entering: false,
	};

	componentDidMount() {
		this.context.addOnRender(this.onRender);
	}

	componentWillUnmount() {
		this.context.removeOnRender(this.onRender);
	}

	/**
	 * Called everytime the signature pad sends a new signature.
	 * We only record it if we are in the entering state.
	 * @param msg
	 */
	onRender = msg => {
		if (this.state.entering) {
			d('Image rendered');
			this.setState({
				entering: false,
			});
			if (this.props.onChange) {
				this.props.onChange({
					data: msg.data,
					type: msg.type,
				});
			}
		}
	};

	/**
	 * Called when the enter button is clicked.
	 */
	onEnterClick = () => {
		this.setState({entering: true});
	};

	/**
	 * Called when the cancel button is clicked.
	 */
	onCancelClick = () => {
		this.setState({entering: false});
	};

	/**
	 * Called when the clear button is clicked.
	 */
	onClearClick = () => {
		this.setState({
			entering: false,
		});
		if (this.props.onChange) this.props.onChange(null);
	};

	/**
	 * Renders the signature image and a clear button.
	 * @return {*}
	 */
	renderSignature() {
		const {data} = this.props.value;
		return (
			<div>
				<Image
					size="medium"
					src={data}
					bordered
				/>
				<Button size="mini" compact onClick={this.onClearClick}>Reset</Button>
			</div>
		);
	}

	/**
	 * Renders a cancel button.
	 * @return {*}
	 */
	renderEntering() {
		return (
			<div>
				<div>Enter a signature and click OK.</div>
				<Button onClick={this.onCancelClick} color="black">Cancel</Button>
			</div>
		);
	}

	/**
	 * Renders an enter button.
	 * @return {*}
	 */
	renderBlank() {
		return (
			<Button onClick={this.onEnterClick}>Enter Signature</Button>
		);
	}

	render() {
		const {entering} = this.state;
		const {value} = this.props;
		if (entering) {
			return this.renderEntering();
		}
		if (value && value.data) {
			return this.renderSignature();
		}
		return this.renderBlank();
	}
}
