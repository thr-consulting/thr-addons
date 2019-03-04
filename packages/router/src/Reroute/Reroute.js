// @flow

/* eslint-disable react/no-children-prop, react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import debug from 'debug';
import Unauthorized from '../components/Unauthorized';

const d = debug('thx:router:Reroute');

type Props = {
	component?: any,
	render?: any,
	children?: any,
	permissions?: string | string[],
	redirect?: boolean,
	path: string,
};

export default function Reroute({component, render, children, permissions, redirect, AuthContext, ...rest}: Props) {
	return (
		<AuthContext.Consumer>
			{({checkPermissions}) => {
				const {isAuthenticated, isAuthorized} = checkPermissions(permissions);

				d(`Permissions required: ${String(permissions)}, isAuthenticated: ${isAuthenticated}, isAuthorized: ${String(isAuthorized)}, willRedirect: ${String(redirect)}, Path: ${rest.path}`);

				// If redirect is true
				if (redirect) {
					return (
						<Route
							{...rest}
							render={props => {
								if (isAuthenticated && isAuthorized) {
									if (component) return <Route {...rest} component={component}/>;
									if (render) return <Route {...rest} render={render}/>;
									if (children) return <Route {...rest} children={children}/>;
									return null;
								} // Render component if logged in and have permissions.
								if (isAuthenticated && !isAuthorized) return <Unauthorized/>; // Render unauthorized if logged in but no permissions.
								// eslint-disable-next-line react/prop-types
								const from = props.location.pathname === '/signin' ? null : props.location;
								return (
									<Redirect
										to={{
											pathname: '/signin',
											state: {from},
										}}
									/>
								);
							}}
						/>
					);
				}

				// Not redirecting, just render null if not logged in or not authorized
				if (permissions && isAuthenticated && isAuthorized && component) return <Route {...rest} component={component}/>;
				if (permissions && isAuthenticated && isAuthorized && render) return <Route {...rest} render={render}/>;
				if (permissions && isAuthenticated && isAuthorized && children) return <Route {...rest} children={children}/>;
				if (permissions) return <Unauthorized/>;
				if (component) return <Route {...rest} component={component}/>;
				if (render) return <Route {...rest} render={render}/>;
				if (children) return <Route {...rest} children={children}/>;
				return null;
			}}
		</AuthContext.Consumer>
	);
}

Reroute.contextTypes = {
	store: PropTypes.object,
};

Reroute.propTypes = {
	redirect: PropTypes.bool,
	component: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.string,
	]),
	render: PropTypes.func,
	children: PropTypes.func,
	permissions: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.string),
	]),
	AuthContext: PropTypes.any,
};
