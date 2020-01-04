import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// import LoadingPage from '../components/Loading/Loading';

// context
// import { useUserState } from '../context/UserContext';

// const text = 'Trying to login, please be patient';

const PublicRoute = ({ component, restricted = false, ...rest }) => {
	// const { isAuthenticated, isLoading } = useContext(AuthContext);
	return (
		// restricted = false meaning public route
		// restricted = true meaning restricted route
		<Route
			{...rest}
			render={
				props =>
					// !isLoading ? (
					// 	isAuthenticated && restricted ? (
					// 		<Redirect to="/dashboard" />
					// 	) : (
					React.createElement(component, props)
				// 	)
				// ) : (
				// 	<LoadingPage text={text} />
				// )
			}
		/>
	);
};

const PrivateRoute = ({ component, ...rest }) => {
	// const { isAuthenticated, isLoading } = useContext(AuthContext);

	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /login page
		<Route
			{...rest}
			render={
				props =>
					// !isLoading ? (
					// 	isAuthenticated ? (
					React.createElement(component, props)
				// ) : (
				// 	<Redirect
				// 		to={{
				// 			pathname: '/login',
				// 			state: {
				// 				from: props.location
				// 			}
				// 		}}
				// />
				// )
				// ) : (
				// 	<LoadingPage text={text} />
				// )
			}
		/>
	);
};

PublicRoute.prototype = {
	component: PropTypes.element.isRequired,
	restricted: PropTypes.bool
};

PrivateRoute.prototype = {
	component: PropTypes.element.isRequired
};

export { PublicRoute, PrivateRoute };
