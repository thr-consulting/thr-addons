// @flow

/* eslint-disable react/forbid-prop-types */
import React, {Component} from 'react';
import type {Element} from 'react';
import debug from 'debug';
import {withRouter} from 'react-router';
import {parse, stringify} from 'query-string';
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
class RouteDirector extends Component<Props> {
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

	restoreRoute = routeKey => {
		const search = parse(this.props.location.search);
		delete search[routeKey];
		this.props.history.push({
			...this.props.location,
			search: stringify(search),
		});
	};

	render() {
		d(`Rendering RouteDirector: ${this.props.location.pathname}${this.props.location.search}${this.props.location.hash}`);
		const defaultRouteProps = this.props.defaults ? this.props.defaults : {};

		const search = parse(this.props.location.search);

		return (
			<div>
				<SwitchWithError>
					{this.props.routes.map(route => {
						// Apply default route options and then apply specific route options
						const routeProps = Object.assign({}, defaultRouteProps, route);

						// If the route is a portal route, don't render it here
						if (routeProps.portal) return null;

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
				{this.props.routes.map(route => {
					// If the route is not a portal route or if the current key isn't present, don't render it here
					if (!route.portal || !search[route.key]) return null;
					return <route.portal key={route.key} routeKey={route.key} restoreRoute={this.restoreRoute} {...route}/>;
				})}
			</div>
		);
	}
}

export default withRouter(RouteDirector);
