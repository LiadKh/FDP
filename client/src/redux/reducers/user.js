import actions from '../types/user';

const initialState = {
	user: null
};

export default function (state = initialState, action) {
	const {
		type,
		payload
	} = action;

	switch (type) {
		case actions.SET_USER:
			return {
				...state,
				user: payload
			};
		case actions.REMOVE_USER:
			return {
				...state,
				user: null
			};
		default:
			return state;
	}
}
