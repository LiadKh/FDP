import React from 'react';
import { withRouter } from 'react-router';
import Loading from '../../components/Loading/Loading';

const textLogout = 'Logging you out from the system, please be patient';

function Logout(props) {
	return <Loading text={textLogout} />;
}

export default withRouter(Logout);
