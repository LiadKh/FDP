import React from 'react';
import './style.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export const Login = () => {
	return (
		<>
			<Container className="w-100 h-100">
				<Row className="align-items-center h-100 mt-n5">
					<Col sm="9" md="7" lg="5" className="mx-auto">
						<Card className="card-signin">
							<div className="card-body">
								<h2 className="card-title text-center font-weight-bold">
									Sign In
								</h2>
								<form className="form-signin">
									<div className="form-label-group">
										<input
											type="email"
											id="inputEmail"
											className="form-control"
											placeholder="Email address"
											required
											autofocus
										/>
										<label for="inputEmail">Email address</label>
									</div>

									<div className="form-label-group">
										<input
											type="password"
											id="inputPassword"
											className="form-control"
											placeholder="Password"
											required
										/>
										<label for="inputPassword">Password</label>
									</div>

									<div className="custom-control custom-checkbox mb-3">
										<input
											type="checkbox"
											className="custom-control-input"
											id="customCheck1"
										/>
										<label className="custom-control-label" for="customCheck1">
											Remember password
										</label>
									</div>
									<Button
										size="lg"
										variant="primary"
										block="true"
										className="text-uppercase"
										type="submit"
									>
										Login
									</Button>
									<hr class="my-4" />
									<Button
										size="lg"
										variant="danger"
										block="true"
										className="text-uppercase"
									>
										<i class="fab fa-google mr-2"></i> Return to home page
									</Button>
								</form>
							</div>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};
