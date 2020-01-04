import React from 'react';

var AuthStateContext = React.createContext();
var AuthDispatchContext = React.createContext();

function authReducer(state, action) {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			return {
				...state,
				isAuthenticated: true
			};
		case 'SIGN_OUT_SUCCESS':
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
		isAuthenticated: !!localStorage.getItem('id_token')
	});

	return (
		<AuthStateContext.Provider value={state}>
			<AuthDispatchContext.Provider value={dispatch}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
}

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

export { AuthProvider, useAuthState, useAuthDispatch, loginAuth, signOut };

// ###########################################################

function loginAuth(dispatch, login, password, history, setIsLoading, setError) {
	setError(false);
	setIsLoading(true);

	if (!!login && !!password) {
		setTimeout(() => {
			localStorage.setItem('id_token', 1);
			setError(null);
			setIsLoading(false);
			dispatch({
				type: 'LOGIN_SUCCESS'
			});

			history.push('/app/dashboard');
		}, 2000);
	} else {
		dispatch({
			type: 'LOGIN_FAILURE'
		});
		setError(true);
		setIsLoading(false);
	}
}

function signOut(dispatch, history) {
	localStorage.removeItem('id_token');
	dispatch({
		type: 'SIGN_OUT_SUCCESS'
	});
	history.push('/login');
}
