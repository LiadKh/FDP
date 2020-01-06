import axios from 'axios';
import store from '../redux/store'
import {
	setUser,
	removeUser
} from '../redux/actions/user'
import User from '../utils/classes/user'

const setAuthorizationHeaders = token => {
	console.log('aaaaaaaaaaa', token)
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const checkAuthenticated = token => {
	return new Promise((resolve, reject) => {
		if (token) {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			axios
				.get('api/user/me', config)
				.then(response => {
					console.log(token)
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
				console.log('bbbbbbbbb', res.data)
				setAuthorizationHeaders(token);
				store.dispatch(setUser(User.fromJson(res.data)))
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
				store.dispatch(removeUser())
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
