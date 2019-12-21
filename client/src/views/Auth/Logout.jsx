import React, { Component } from 'react';
import { AuthContext } from '../../components/Auth';
import Loading from '../../components/Loading/Loading';

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
