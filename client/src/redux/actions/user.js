import actions from '../types/user';

export const setUser = (user) => dispatch => {
	dispatch({
		type: actions.SET_USER,
		payload: user
	})
};

export const removeUser = () => dispatch => {
	dispatch({
		type: actions.REMOVE_USER,
	})
};
