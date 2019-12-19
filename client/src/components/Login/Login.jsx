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
import './style.css';
import { clearErrors } from '../../redux/actions/error';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFromLocalStorage } from '../../utils/localStorage';

import { AuthContext } from '../Auth/Auth';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { email: '', password: '', savePassword: false };
	}

	onChange = event => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	};

	componentDidMount() {
		this.setState(getFromLocalStorage());
	}

	componentDidUpdate(prevProps) {
		if (this.props.error) {
			this.props.clearErrors();

			toast.error("Can't login - Please check your email and password!", {
				closeOnClick: true,
				pauseOnFocusLoss: false
			});
		}
		return true;
	}

	SubmitLogin = e => {
		e.preventDefault();
		let { login } = this.context;

		const { email, password, savePassword } = this.state;

		const user = {
			email,
			password,
			savePassword
		};

		login(user);
	};

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
								<Form className="form-signin" onSubmit={this.SubmitLogin}>
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
											name="savePassword"
											type="checkbox"
											className="custom-control-input"
											id="savePassword"
											onChange={this.onChange}
										/>
										<label
											className="custom-control-label"
											htmlFor="savePassword"
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

Login.contextType = AuthContext;

const mapStateToProps = state => {
	return {
		isLoading: state.auth.isLoading,
		error: state.error.error
	};
};
const mapDispatchToProps = { clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
