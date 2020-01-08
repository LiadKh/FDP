import axios from 'axios';
import store from '../redux/store'
import {
	setUser,
} from '../redux/actions/user'
import User from '../utils/classes/user'

const setAuthorizationHeaders = token => {
	if (!!token)
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	else
		axios.defaults.headers.common.Authorization = '';
};

const checkAuthenticated = token => {
	return new Promise((resolve, reject) => {
		if (!!token) {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			axios
				.get('api/user/me', config)
				.then(response => {
					setAuthorizationHeaders(token);
					store.dispatch(setUser(User.fromJson(response.data)))
					resolve(response.data);
				})
				.catch(error => {
					reject(error);
				});
		} else reject();
	});
};

const loginReq = ({
	email,
	password
}) => {
	return new Promise((resolve, reject) => {
		axios
			.patch('api/login', {
				email,
				password,
			})
			.then(res => {
				const {
					token,
				} = res.data;
				setAuthorizationHeaders(token);
				store.dispatch(setUser(User.fromJson(res.data.user)))
				resolve(res.data);
			})
			.catch(err => {
				reject(err);
			});
	});
};

const logoutReq = () => {
	return new Promise((resolve, reject) => {
		axios
			.patch('api/logout')
			.then(res => {
				setAuthorizationHeaders();
				resolve(res.data);
			})
			.catch(err => {
				reject(err);
			});
	});
};

export {
	checkAuthenticated,
	loginReq,
	logoutReq
};
