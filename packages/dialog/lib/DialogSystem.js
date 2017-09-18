// @flow

/* eslint-disable react/no-did-update-set-state */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import type {ChildrenArray, Element} from 'react';
import Dock from 'react-dock';
import styles from './dialog.css';

const defaultOptions = {
	position: 'bottom',
	isVisible: false,
	dimMode: 'opaque',
	zIndex: 9997,
};

type Props = {
	children: ChildrenArray<*>,
};

type State = {
	position: string,
	isVisible: boolean,
	dimMode: string,
	zIndex: number,
	component: ?Element<*>,
	height: number,
};

/**
 * Wrap your app with a DialogSystem instance to make dialogs available. You only need one of these per app.
 * @class
 * @property {Component[]} children - Your application components.
 */
export default class DialogSystem extends Component<Props, State> {
	static childContextTypes = {
		showDialog: PropTypes.func,
		closeDialog: PropTypes.func,
	};

	constructor(props: Object) {
		super(props);
		this.state = {
			...defaultOptions,
			component: null,
			height: 0,
		};
	}

	getChildContext() {
		return {
			showDialog: this.showDialog,
			closeDialog: this.closeDialog,
		};
	}

	componentDidUpdate() {
		if (this._contentNode) {
			const height = this._contentNode.offsetHeight;

			if (height !== this.state.height) {
				this.setState({
					height,
				});
			}
		}
	}

	props: Props;
	_contentNode: ?HTMLElement;

	/**
	 * Shows a dialog. This method is available via the React Context.
	 * @function showDialog
	 * @memberOf DialogSystem
	 * @tag Context
	 * @param {Element} component - The Dialog component to display.
	 * @param {object} options - Custom React Dock props.
	 */
	showDialog = (component: Element<*>, options: Object = defaultOptions) => {
		this.setState({
			...options,
			component,
			isVisible: true,
			height: 0,
		});
	};

	closeDialog = () => {
		this.setState({
			isVisible: false,
			component: null, // TODO This hides (removes) the dialog component before it slides down.
		});
	};

	render() {
		return (
			<div className={styles.dialogSystem}>
				{this.props.children}
				<Dock
					position={this.state.position}
					isVisible={this.state.isVisible}
					dimMode={this.state.dimMode}
					zIndex={this.state.zIndex}
					size={this.state.height}
					fluid={false}
				>
					<div ref={r => (this._contentNode = r)}>
						{this.state.component ? React.cloneElement(this.state.component, {
							showDialog: this.showDialog,
							closeDialog: this.closeDialog,
						}) : null}
					</div>
				</Dock>
			</div>
		);
	}
}
