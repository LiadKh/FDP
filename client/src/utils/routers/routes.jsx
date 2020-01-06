import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAuthState } from '../../context/AuthContext';

const PublicRoute = ({ component: Component, restricted = false, ...rest }) => {
	const { isAuthenticated } = useAuthState();
	return (
		// restricted = false meaning public route
		// restricted = true meaning restricted route
		<Route
			{...rest}
			render={props =>
				isAuthenticated && restricted ? (
					<Redirect to="/dashboard" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated } = useAuthState();

	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /login page
		<Route
			{...rest}
			render={props =>
				// !isLoading ? (
				isAuthenticated ? (
					<Component {...props} />
				) : (
					// )
					<Redirect
						to={{
							pathname: '/login',
							state: {
								from: props.location,
							},
						}}
					/>
				)
			}
		/>
	);
};

PublicRoute.propTypes = {
	component: PropTypes.elementType.isRequired,
	restricted: PropTypes.bool,
};

PrivateRoute.propTypes = {
	component: PropTypes.elementType.isRequired,
};

export { PublicRoute, PrivateRoute };
