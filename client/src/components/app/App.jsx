import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from '../../utils/routers/routes';

import Login from '../../pages/login';

function App() {
	return (
		<HashRouter>
			<Switch>
				<Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
				<Route
					exact
					path="/app"
					render={() => <Redirect to="/app/dashboard" />}
				/>
				<PublicRoute path="/login" component={Login} restricted={true} />
				{/* <Route component={Error} /> */}
			</Switch>
		</HashRouter>
	);
}

export default App;
