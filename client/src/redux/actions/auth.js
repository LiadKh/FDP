import axios from 'axios'
import actions from '../types/auth';
import store from '../store';
import {
  saveToLocalStorage
} from '../../utils/localStorage'

export const loginSuccess = ({
  token,
  savePassword,
  password,
  user
}) => {
  saveToLocalStorage({
    token,
    savePassword,
    password,
    email: user.email
  });
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  store.dispatch({
    type: actions.LOGIN_SUCCESS,
    payload: user
  });
};
