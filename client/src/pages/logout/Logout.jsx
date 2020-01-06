import React from 'react';
import { withRouter } from 'react-router';
import Loading from '../../components/Loading/Loading';
import { useAuthDispatch, signOut } from '../../context/AuthContext';

const textLogout = 'Logging you out from the system, please be patient';

function Logout(props) {
	const userDispatch = useAuthDispatch();

	React.useEffect(() => {
		signOut(userDispatch, props.history);
	}, [props, userDispatch]);

	return <Loading text={textLogout} />;
}

export default withRouter(Logout);
