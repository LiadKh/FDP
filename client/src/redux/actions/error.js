import actions from '../types/error';

// RETURN ERRORS
export const returnErrors = (msg) => {
  return {
    type: actions.GET_ERRORS,
    payload: {
      msg,
    }
  };
};

// CLEAR ERRORS
export const clearErrors = () => dispatch => {
  dispatch({
    type: actions.CLEAR_ERRORS
  })
};
