import actions from '../types/user';

export const setUser = (user) => {
	return ({
		type: actions.SET_USER,
		payload: user
	})
};

export const removeUser = () => {
	return {
		type: actions.REMOVE_USER,
	}
};
