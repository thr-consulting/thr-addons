// @flow

/* eslint-disable react/forbid-prop-types */
import React, {Component} from 'react';
import type {Element} from 'react';
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
	AuthContext?: any,
};

/**
 * RouteDirector - Component that manages multiple root routes, layouts, and permissions.
 * @class
 */
export default class RouteDirector extends Component<Props> {
	componentWillUpdate() {
		// TODO expand onRouteChange calls
		if (this.props.onRouteChange) this.props.onRouteChange();
	}

	doRender = (props: any, routeProps: RouteType) => {
		d(`Rendering route: ${routeProps.path}`);
		if (routeProps.layout) {
			return <routeProps.layout route={routeProps} {...props}/>;
		}
		if (routeProps.content) {
			return <routeProps.content route={routeProps} {...props}/>;
		}
		return null;
	};


	render() {
		d('Rendering RouteDirector');
		const defaultRouteProps = this.props.defaults ? this.props.defaults : {};

		return (
			<SwitchWithError>
				{this.props.routes.map(route => {
					// Apply default route options and then apply specific route options
					const routeProps = Object.assign({}, defaultRouteProps, route);
					return (
						<Reroute
							key={routeProps.path}
							render={props => this.doRender(props, routeProps)}
							AuthContext={this.props.AuthContext}
							{...routeProps}
						/>
					);
				})}
			</SwitchWithError>
		);
	}
}
