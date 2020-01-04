import React, { useState } from 'react';
import {
	Grid,
	CircularProgress,
	Typography,
	Button,
	Tabs,
	Tab,
	TextField,
	Fade
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

// styles
import useStyles from './styles';

// context
import { useAuthDispatch, loginUser } from '../../context/AuthContext';

function Login(props) {
	var classes = useStyles();

	// global
	var userDispatch = useAuthDispatch();

	// local
	var [isLoading, setIsLoading] = useState(false);
	var [error, setError] = useState(null);
	var [activeTabId, setActiveTabId] = useState(0);
	var [nameValue, setNameValue] = useState('');
	var [emailValue, setEmailValue] = useState('');
	var [passwordValue, setPasswordValue] = useState('');

	function handleLoginSubmit(event) {
		event.preventDefault();
		// loginUser(
		// 	userDispatch,
		// 	loginValue,
		// 	passwordValue,
		// 	props.history,
		// 	setIsLoading,
		// 	setError
		// );
	}

	function handleRegisterSubmit(event) {
		event.preventDefault();
	}

	return (
		<Grid container className={classes.container}>
			<div className={classes.logotypeContainer}>
				<Typography className={classes.logotypeText}>
					View Validation
				</Typography>
			</div>
			<div className={classes.formContainer}>
				<div className={classes.form}>
					<Tabs
						value={activeTabId}
						onChange={(e, id) => setActiveTabId(id)}
						indicatorColor="primary"
						textColor="primary"
						centered
					>
						<Tab label="Login" classes={{ root: classes.tab }} />
						<Tab label="New User" classes={{ root: classes.tab }} />
					</Tabs>
					{activeTabId === 0 ? (
						// sign up form
						<React.Fragment>
							<Typography variant="h1" className={classes.greeting}>
								Let's validate!
							</Typography>
							<Fade in={error}>
								<Typography color="error" className={classes.errorMessage}>
									Something is wrong with your email or password :(
								</Typography>
							</Fade>
							<form onSubmit={handleLoginSubmit}>
								<TextField
									id="email"
									value={emailValue}
									onChange={e => setEmailValue(e.target.value)}
									margin="normal"
									label="Email Address"
									type="email"
									fullWidth
									variant="outlined"
								/>
								<TextField
									id="password"
									value={passwordValue}
									onChange={e => setPasswordValue(e.target.value)}
									margin="normal"
									label="Password"
									type="password"
									fullWidth
									variant="outlined"
								/>
								<div className={classes.formButtons}>
									{isLoading ? (
										<CircularProgress
											size={26}
											className={classes.loginLoader}
										/>
									) : (
										<Button
											type="submit"
											disabled={
												emailValue.length === 0 || passwordValue.length === 0
											}
											variant="contained"
											color="primary"
											size="large"
										>
											Login
										</Button>
									)}
									<Button
										color="primary"
										size="large"
										className={classes.forgetButton}
									>
										Forget Password
									</Button>
								</div>
							</form>
						</React.Fragment>
					) : (
						// register form
						<React.Fragment>
							<Typography variant="h1" className={classes.greeting}>
								Welcome!
							</Typography>
							<Typography variant="h5" className={classes.subGreeting}>
								Enter your contact information
							</Typography>
							<Fade in={error}>
								<Typography color="error" className={classes.errorMessage}>
									invalid email
								</Typography>
							</Fade>
							<form onSubmit={handleRegisterSubmit}>
								<TextField
									id="name"
									value={nameValue}
									onChange={e => setNameValue(e.target.value)}
									margin="normal"
									label="Full Name"
									type="text"
									fullWidth
									variant="outlined"
								/>
								<TextField
									id="email"
									value={emailValue}
									onChange={e => setEmailValue(e.target.value)}
									margin="normal"
									label="Email Address"
									type="email"
									fullWidth
									variant="outlined"
								/>
								<div className={classes.creatingButtonContainer}>
									{isLoading ? (
										<CircularProgress size={26} />
									) : (
										<Button
											type="submit"
											// onClick={() =>
											// 	loginUser(
											// 		userDispatch,
											// 		loginValue,
											// 		passwordValue,
											// 		props.history,
											// 		setIsLoading,
											// 		setError
											// 	)
											// }
											disabled={
												emailValue.length === 0 || nameValue.length === 0
											}
											size="large"
											variant="contained"
											color="primary"
											fullWidth
											className={classes.createAccountButton}
										>
											Submit
										</Button>
									)}
								</div>
							</form>
						</React.Fragment>
					)}
				</div>
			</div>
		</Grid>
	);
}

export default withRouter(Login);
