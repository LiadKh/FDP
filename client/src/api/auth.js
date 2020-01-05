import axios from 'axios';

// const setAuthorizationHeaders = (token) => {
// 	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }

const checkAuthenticated = token => {
	return new Promise((resolve, reject) => {
		if (!!token) {
			var config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			};

			axios
				.get('api/user/me', config)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					reject(error);
				});
		} else reject();
	});
};

const authLogin = ({
	email,
	password
}) => {
	return new Promise((resolve, reject) => {
		axios
			.patch('api/login', {
				email,
				password
			})
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err);
			});
	});
};

const authLogout = () => {
	return new Promise((resolve, reject) => {
		axios
			.patch('api/logout')
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err);
			});
	});
};

export {
	checkAuthenticated,
	authLogin,
	authLogout
};
