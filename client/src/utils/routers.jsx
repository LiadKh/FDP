import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../components/Auth/Auth';
import Loading from '../pages/Loading/Loading';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
	const { isAuthenticated, isLoading } = useContext(AuthContext);
	console.log(isAuthenticated && restricted);
	return (
		// restricted = false meaning public route
		// restricted = true meaning restricted route
		<Route
			{...rest}
			render={props =>
				!isLoading ? (
					isAuthenticated && restricted ? (
						<Redirect to="/dashboard" />
					) : (
						<Component {...props} />
					)
				) : (
					<Loading />
				)
			}
		/>
	);
};

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated, isLoading } = useContext(AuthContext);

	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /login page
		<Route
			{...rest}
			render={props =>
				!isLoading ? (
					isAuthenticated ? (
						<Component {...props} />
					) : (
						<Redirect to="/login" />
					)
				) : (
					<Loading />
				)
			}
		/>
	);
};

export { PublicRoute, PrivateRoute };
