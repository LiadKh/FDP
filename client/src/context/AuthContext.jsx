import React from 'react';
import PropTypes from 'prop-types';

import { loginReq } from '../api/auth';
import { saveToLocalStorage } from '../utils/storage/localStorage';

var AuthStateContext = React.createContext();
var AuthDispatchContext = React.createContext();

const actions = {
	LOGIN_SUCCESS: 'LOGIN_SUCCESS',
	SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS'
	// LOGIN_FAILURE: 'LOGIN_FAILURE'
};
function authReducer(state, action) {
	switch (action.type) {
		case actions.LOGIN_SUCCESS:
			return {
				...state,
				isAuthenticated: true
			};
		case actions.SIGN_OUT_SUCCESS:
			return {
				...state,
				isAuthenticated: false
			};
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

function AuthProvider({ children }) {
	var [state, dispatch] = React.useReducer(authReducer, {
		isAuthenticated: false
	});

	// React.useEffect(() => {
	// 	checkAuth();
	// }, []);

	// const checkAuth = () =>
	// 	checkIsAuthenticated()
	// 		.then(() => setIsAuthenticated(true))
	// 		.catch(() => setIsAuthenticated(false))
	// 		.then(() => setIsLoading(false));

	return (
		<AuthStateContext.Provider value={state}>
			<AuthDispatchContext.Provider value={dispatch}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
}

AuthProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
};

function useAuthState() {
	var context = React.useContext(AuthStateContext);
	if (context === undefined) {
		throw new Error('useAuthState must be used within a AuthProvider');
	}
	return context;
}

function useAuthDispatch() {
	var context = React.useContext(AuthDispatchContext);
	if (context === undefined) {
		throw new Error('useAuthDispatch must be used within a AuthProvider');
	}
	return context;
}

export { AuthProvider, useAuthState, useAuthDispatch, loginUser, signOut };

// ###########################################################

async function loginUser(
	dispatch,
	email,
	password,
	rememberPassword,
	history,
	setIsLoading,
	setError
) {
	setError(false);
	setIsLoading(true);

	setTimeout(() => {
		loginReq({ email, password })
			.then(res => {
				let { token } = res;
				saveToLocalStorage({
					email,
					token,
					password,
					savePassword: rememberPassword
				});
				setError(null);
				setIsLoading(false);
				dispatch({
					type: actions.LOGIN_SUCCESS
				});

				history.push('/app/dashboard');
			})
			.catch(err => {
				// dispatch({
				// 	type: actions.LOGIN_FAILURE
				// });
				setError(true);
				setIsLoading(false);
			});
	}, 2000);
}

function signOut(dispatch, history) {
	localStorage.removeItem('id_token');
	dispatch({
		type: actions.SIGN_OUT_SUCCESS
	});
	history.push('/login');
}
