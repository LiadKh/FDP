import axios from 'axios';

const setAuthorizationHeaders = token => {
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
					const {
						token
					} = response.data;
					setAuthorizationHeaders(token);
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
					token
				} = res.data;
				setAuthorizationHeaders(token);
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
