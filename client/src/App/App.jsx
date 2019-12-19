import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
	// Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Auth from '../components/Auth/Auth';

import { PrivateRoute, PublicRoute } from '../utils/routers';
import store from '../redux/store';

import NotFound from '../pages/NotFound/NotFound';
import { Home } from '../components/Home';
import Login from '../components/Login/Login';
// import { Admin } from '../components/Admin';
import { Profile } from '../components/Profile';

import { toast } from 'react-toastify';

toast.configure();

function App() {
	return (
		<Provider store={store}>
			<Auth>
				<Router>
					<Switch>
						<PublicRoute exact restricted={false} path="/" component={Home} />
						<PublicRoute restricted={true} path="/login" component={Login} />
						<PrivateRoute path="/profile" children={Profile} exact />
						{/*<Route path="/admin" children={Admin} />
					<Route path="/company/:companyName" children={Home} /> */}
						<Route path="*" component={NotFound} />
					</Switch>
				</Router>
			</Auth>
		</Provider>
	);
}

export default App;
