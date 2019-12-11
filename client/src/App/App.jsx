import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';

import NotFound from '../pages/NotFound/NotFound';

import { Home } from '../components/Home';
import { Login } from '../components/Login';
import { Admin } from '../components/Admin';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Profile } from '../components/Profile';

function App() {
	return (
		<>
			{/* <Header /> */}
			<Router>
				<Switch>
					<Route path="/login" children={Login} />
					<Route path="/profile" children={Profile} />
					<Route path="/admin" children={Admin} />
					<Route path="/company/:companyName" children={Home} />
					<Route exact path="/" children={Home} />
					<Route path="*" component={NotFound} />
				</Switch>
			</Router>
			{/* <Footer /> */}
		</>
	);
}

export default App;
