import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useLocation } from "react-router-dom";

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);

	const { loading, error, userInfo } = userLogin;

	useEffect(() => {
		if (userInfo) {
			navigate(`/`);
		}
	}, [userInfo, navigate]);

	const SubmitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && <Message variant='danger' children={error} />}
			{loading && <Loader loading />}

			<Form onSubmit={SubmitHandler}>
				<Form.Group controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password </Form.Label>
					<Form.Control
						type='Password'
						placeholder='Enter Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Button type='submit' className='btn btn-secondary mt-4'>
					Sign In
				</Button>
			</Form>
			<Row className='py-3'>
				<Col>
					New Customer? <Link to='/register'>Register</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;
