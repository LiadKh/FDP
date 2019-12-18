import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	Card,
	Button,
	Form,
	ButtonToolbar,
	Spinner
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth';
import './style.css';
import { clearErrors } from '../../redux/actions/error';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const localStorageEmail = 'FDP-EMAIL';
const localStoragePassword = 'FDP-PASSWORD';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { email: '', password: '', rememberPassword: false };
	}

	onChange = event => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	};

	sendLoginReq = e => {
		e.preventDefault();

		const { email, password } = this.state;

		const user = {
			email,
			password
		};

		this.props.login(user);
	};

	componentDidMount() {
		const email = localStorage.getItem(localStorageEmail);

		if (email) {
			const local = { email };
			const password = localStorage.getItem(localStoragePassword);
			if (password) local.password = password;
			this.setState(local);
		}
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.isAuthenticated &&
			this.props.isAuthenticated !== prevProps.isAuthenticated
		) {
			const { email, password } = this.state;

			localStorage.setItem(localStorageEmail, email);
			if (this.state.rememberPassword) {
				localStorage.setItem(localStoragePassword, password);
			} else {
				localStorage.removeItem(localStoragePassword);
			}
			this.props.history.replace('/home');
		} else {
			if (this.props.error) {
				this.props.clearErrors();

				toast.error("Can't login - Please check your email and password!", {
					closeOnClick: true,
					pauseOnFocusLoss: false
				});
			}
			return true;
		}
	}

	render() {
		return (
			<Container fluid={true} className="w-100 h-100 bgBlue">
				<Row className="align-items-center h-100 mt-n5">
					<Col sm="9" md="7" lg="5" xl="4" className="mx-auto">
						<Card className="card-signin">
							<div className="card-body">
								<h2 className="card-title text-center font-weight-bold">
									Sign In
								</h2>
								<h4 className="card-title text-center">Welcome Back!</h4>
								<Form className="form-signin" onSubmit={this.sendLoginReq}>
									<div className="form-label-group">
										<input
											name="email"
											type="email"
											id="inputEmail"
											className="form-control"
											placeholder="Email address"
											onChange={this.onChange}
											value={this.state.email}
											disabled={this.props.isLoading}
											required
											autoFocus
										/>
										<label htmlFor="inputEmail">Email address</label>
									</div>

									<div className="form-label-group">
										<input
											name="password"
											type="password"
											id="inputPassword"
											className="form-control"
											placeholder="Password"
											onChange={this.onChange}
											value={this.state.password}
											disabled={this.props.isLoading}
											required
										/>
										<label htmlFor="inputPassword">Password</label>
									</div>

									<div className="custom-control custom-checkbox mb-3">
										<input
											name="rememberPassword"
											type="checkbox"
											className="custom-control-input"
											id="rememberPassword"
											onChange={this.onChange}
										/>
										<label
											className="custom-control-label"
											htmlFor="rememberPassword"
										>
											Remember password
										</label>
									</div>
									<ButtonToolbar>
										<Button
											size="lg"
											variant="primary"
											block={true}
											className="text-uppercase"
											type="submit"
											disabled={this.props.isLoading}
										>
											{this.props.isLoading ? (
												<>
													Loading...{' '}
													<Spinner
														as="span"
														animation="grow"
														size="sm"
														role="status"
														aria-hidden="true"
													/>
												</>
											) : (
												'Login'
											)}
										</Button>
									</ButtonToolbar>
									<hr className="my-4" />
									<Button
										size="lg"
										variant="danger"
										block={true}
										className="text-uppercase"
										onClick={() => this.props.history.push('/')}
									>
										<FontAwesomeIcon size="1x" icon={faHome} /> Return to home
										page
									</Button>
								</Form>
							</div>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoading: state.auth.isLoading,
		isAuthenticated: state.auth.isAuthenticated,
		error: state.error.error
	};
};
const mapDispatchToProps = { login, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
