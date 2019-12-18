import axios from 'axios'
import actions from '../types/auth';
import {
  returnErrors
} from '../actions/error'
const TOKEN = 'FDP-TOKEN';
export const login = ({
  email,
  password,
}) => dispatch => {
  dispatch({
    type: actions.USER_LOADING,
  })
  axios.patch('api/login', {
      email,
      password
    }).then(res => {
      dispatch({
        type: actions.LOGIN_SUCCESS,
        payload: res.data.user
      })
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      localStorage.setItem(TOKEN, res.data.token)
    })
    .catch(err => {
      dispatch(returnErrors(err))
    }).finally(() =>
      dispatch({
        type: actions.USER_LOADING_FINISH,
      })
    )
}
