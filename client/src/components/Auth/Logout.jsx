import React, { Component } from 'react';
import { AuthContext } from '../Auth';
import Loading from '../../pages/Loading/Loading';

class LogoutPage extends Component {
	componentDidMount() {
		let { logout } = this.context;
		logout();
	}

	render() {
		return (
			<Loading text="logging out from the system. We hope our system has helped you"></Loading>
		);
	}
}

LogoutPage.contextType = AuthContext;

export { LogoutPage };
