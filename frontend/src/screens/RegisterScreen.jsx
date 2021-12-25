import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";

const RegisterScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [message, setMessage] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userRegister = useSelector((state) => state.userRegister);

	const { loading, error, userInfo } = userRegister;

	useEffect(() => {
		if (userInfo) {
			navigate(`/`);
		}
	}, [userInfo, navigate]);

	const handleBlur = () => {
		setMessage(null);
	};

	const SubmitHandler = (e) => {
		e.preventDefault();
		//user register
		if (password !== confirmPassword) {
			return setMessage("Password and Confirm Password do not match");
		}
		dispatch(register(name, email, password));
	};

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{error && <Message variant='danger' children={error} />}
			{message && <Message variant='danger' children={message} />}
			{loading && <Loader loading />}

			<Form onSubmit={SubmitHandler} onBlur={handleBlur}>
				<Form.Group controlId='name'>
					<Form.Label>Name </Form.Label>
					<Form.Control
						type='name'
						placeholder='Enter name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>
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
				<Form.Group controlId='confirmpassword'>
					<Form.Label>Confirm Password </Form.Label>
					<Form.Control
						type='Password'
						placeholder='Enter Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</Form.Group>
				<Button type='submit' className='btn btn-secondary mt-4'>
					Register
				</Button>
			</Form>
			<Row className='py-3'>
				<Col>
					Have an account? <Link to='/login'>login</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
