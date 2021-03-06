import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from '../../utils/routers/routes';

// pages
import Login from '../../pages/login';
import Logout from '../../pages/logout';
import Error from '../../pages/error';

function App() {
	return (
		<HashRouter>
			<Switch>
				<Route exact path="/" render={() => <Redirect to="/login" />} />
				<PublicRoute path="/login" component={Login} restricted />
				<PrivateRoute path="/logout" component={Logout} />
				<Route component={Error} />
			</Switch>
		</HashRouter>
	);
}

export default App;
