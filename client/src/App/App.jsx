import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
	// Redirect
} from 'react-router-dom';

import { Provider } from 'react-redux';

import store from '../redux/store';

import NotFound from '../pages/NotFound/NotFound';

import { Home } from '../components/Home';
import Login from '../components/Login/Login';
// import { Admin } from '../components/Admin';
// import { Profile } from '../components/Profile';

import { toast } from 'react-toastify';

toast.configure();

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route path="/login" component={Login} />
					{/* <Route path="/profile" children={Profile} />
					<Route path="/admin" children={Admin} />
					<Route path="/company/:companyName" children={Home} /> */}
					<Route exact path="/" component={Home} />
					<Route path="*" component={NotFound} />
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
