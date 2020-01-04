import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import Themes from './themes';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import { LayoutProvider } from './context/LayoutContext';
import { AuthProvider } from './context/AuthContext';
// import store from '../redux/store';

ReactDOM.render(
	// <Provider store={store}>
	<LayoutProvider>
		<AuthProvider>
			<ThemeProvider theme={Themes.default}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</AuthProvider>
	</LayoutProvider>,
	// </Provider>
	document.getElementById('root')
);

serviceWorker.unregister();
