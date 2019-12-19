import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../redux/store';

import NotFound from '../pages/NotFound/NotFound';
import { Auth, LoginPage, LogoutPage } from '../components/Auth';
import { PrivateRoute, PublicRoute } from '../utils/routers';
import { Home } from '../components/Home';
import { Profile } from '../components/Profile';
import { Dashboard } from '../components/Dashboard';

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
						<PrivateRoute path="/logout" component={LogoutPage} exact />
						<PrivateRoute path="/profile" component={Profile} exact />
						<PrivateRoute path="/dashboard" component={Dashboard} exact />
						<Route path="*" component={NotFound} />
					</Switch>
				</Router>
			</Auth>
		</Provider>
	);
}

export default App;
