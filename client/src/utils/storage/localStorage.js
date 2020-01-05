import PropTypes from 'prop-types'
const localStorageEmail = 'FDP-EMAIL';
const localStorageToken = 'FDP-TOKEN';
const localStoragePassword = 'FDP-PASSWORD';

export const saveToLocalStorage = ({
	email,
	token,
	password,
	savePassword = false
}) => {
	if (!!email) {
		localStorage.setItem(localStorageEmail, email);
	}
	if (!!token) {
		localStorage.setItem(localStorageToken, token);
	}
	if (savePassword) {
		localStorage.setItem(localStoragePassword, password);
	} else {
		localStorage.removeItem(localStoragePassword);
	}
};

saveToLocalStorage.PropTypes = {
	email: PropTypes.string.isRequired,
	token: PropTypes.string.isRequired,
	password: PropTypes.string,
	savePassword: PropTypes.bool
}

export const getFromLocalStorage = () => {
	const email = localStorage.getItem(localStorageEmail);

	const local = {};
	if (!!email) {
		local.email = email;
		const password = localStorage.getItem(localStoragePassword);
		local.password = !!password ? password : '';
		const token = localStorage.getItem(localStorageToken);
		local.token = !!token ? token : '';
	}
	return local;
};

export const removeTokenFromLocalStorage = () => {
	localStorage.removeItem(localStorageToken);
};
