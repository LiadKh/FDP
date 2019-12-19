import actions from '../types/auth';

const initialState = {
  isLoading: false,
  user: null
};

export default function (state = initialState, action) {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case actions.USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
          user: payload
      };
    case actions.USER_LOADING_FINISH:
      return {
        ...state,
        isLoading: false
      }
      case actions.USER_LOGOUT:
        return {
          ...state,
          user: null
        }
        default:
          return state;
  }
}
