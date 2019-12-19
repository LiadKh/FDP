import actions from '../types/error';

const initialState = {
  msg: {},
  error: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_ERRORS:
      return {
        msg: action.payload.msg,
          error: true
      };
    case actions.CLEAR_ERRORS:
      return {
        msg: {},
          error: false
      };
    default:
      return state;
  }
}
