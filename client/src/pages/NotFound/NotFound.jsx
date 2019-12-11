import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './style.css';

const NotFound = () => (
	<>
		<Helmet>
			<title>404 Not Found</title>
			<link
				href="https://fonts.googleapis.com/css?family=Montserrat:400,700,900"
				rel="stylesheet"
			/>
		</Helmet>
		<div id="notfound">
			<div class="notfound">
				<div class="notfound-404">
					<h1>Oops!</h1>
				</div>
				<h2>404 - Page not found</h2>
				<p>
					The page you are looking for might have been removed had its name
					changed or is temporarily unavailable.
				</p>
				<Link to="/">Return to Home Page</Link>
			</div>
		</div>
	</>
);

export default NotFound;
