import axios from 'axios';

import actions from '../redux/types/auth';
import store from '../redux/store';
import {
  getFromLocalStorage,
  removeTokenFromLocalStorage
} from './localStorage';
import {
  returnErrors
} from '../redux/actions/error';
import {
  loginSuccess
} from '../redux/actions/auth';

const checkIsAuthenticated = () => {

  return new Promise((resolve, reject) => {
    const {
      token
    } = getFromLocalStorage();


    if (token != null) {
      var config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      axios
        .get('api/user/me', config)
        .then(response => {
          loginSuccess({
            token,
            user: response.data
          });
          resolve();
        })
        .catch(error => {
          removeTokenFromLocalStorage();
          reject();
        });

    } else reject();
  });
};

const authLogin = ({
  email,
  savePassword,
  password
}) => {
  return new Promise((resolve, reject) => {
    store.dispatch({
      type: actions.USER_LOADING
    });

    setTimeout(function () {
      axios
        .patch('api/login', {
          email,
          password
        })
        .then(res => {
          loginSuccess({
            token: res.data.token,
            user: res.data.user,
            password,
            savePassword
          });
          resolve();
        })
        .catch(err => {
          store.dispatch(returnErrors(err));
          reject();
        })
        .finally(() =>
          store.dispatch({
            type: actions.USER_LOADING_FINISH
          })
        );
    }, 3000);

  });
};

const authLogout = () => {
  removeTokenFromLocalStorage();
  store.dispatch({
    type: actions.USER_LOGOUT
  })
}

export {
  checkIsAuthenticated,
  authLogin,
  authLogout
}
