import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../redux/store';

import Errors from '../views/NotFound/Errors';
import { Auth } from '../components/Auth';
import { Dashboard } from '../components/Dashboard';

import { Home } from '../views/Home';
import { LoginPage, LogoutPage } from '../views/Auth';

//TODO only for development
import { Profile } from '../views/Profile';

import { PrivateRoute, PublicRoute } from '../utils/routers';

import { toast } from 'react-toastify';

toast.configure();

function App() {
	return (
		<Provider store={store}>
			<Auth>
				<Router>
					<Switch>
						<PublicRoute exact restricted={false} path="/" component={Home} />
						<PublicRoute
							restricted={true}
							path="/login"
							component={LoginPage}
						/>

						{/* TODO only for development */}
						<PrivateRoute path="/profile" component={Profile} exact />

						<PrivateRoute path="/logout" component={LogoutPage} exact />
						<PrivateRoute path="/dashboard" component={Dashboard} exact />
						<Route path="*" component={Errors} />
					</Switch>
				</Router>
			</Auth>
		</Provider>
	);
}

export default App;
