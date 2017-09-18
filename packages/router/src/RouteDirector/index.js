// @flow

import React, {Component} from 'react';
import type {Element} from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';
import Reroute from '../Reroute';
import SwitchWithError from '../SwitchWithError';

const d = debug('thx:router:RouteDirector');

type RouteType = {
	path: string,
	exact?: boolean,
	strict?: boolean,
	redirect?: boolean,
	permissions?: string | string[],
	layout?: Element<*>,
};

type Props = {
	routes: RouteType[],
	defaults?: {
		exact?: boolean,
		strict?: boolean,
		redirect?: boolean,
		permissions?: string | string[],
		layout?: Element<*>,
	},
	onRouteChange?: () => {},
};

/**
 * RouteDirector - Component that manages multiple root routes, layouts, and permissions
 * @class
 */
export default class RouteDirector extends Component<Props> {
	static contextTypes = {
		store: PropTypes.object,
	};

	componentWillUpdate() {
		if (this.props.onRouteChange) this.props.onRouteChange();
	}

	props: Props;

	doRender = (props: any, route: RouteType) => {
		d(`Rendering route: ${route.path}`);
		// $FlowFixMe
		return <route.layout route={route} {...props}/>;
	};

	render() {
		d('Rendering RouteDirector');
		const defaultRoute = this.props.defaults ? this.props.defaults : {};

		return (
			<SwitchWithError>
				{this.props.routes.map(route => {
					const theRoute = Object.assign({}, defaultRoute, route);
					return <Reroute key={theRoute.path} render={props => this.doRender(props, theRoute)} {...theRoute}/>;
				})}
			</SwitchWithError>
		);
	}
}
