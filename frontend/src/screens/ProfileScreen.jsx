import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

const ProfileScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [message, setMessage] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userDetails = useSelector((state) => state.userDetails);

	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);

	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

	const { success } = userUpdateProfile;

	useEffect(() => {
		if (!userInfo) {
			navigate(`/login`);
		} else {
			console.log(user);
			if (!user.name) {
				dispatch(getUserDetails("profile"));
			} else {
				setEmail(user.email);
				setName(user.name);
			}
		}
	}, [userInfo, navigate, user, dispatch]);

	const handleBlur = () => {
		setMessage(null);
	};

	const SubmitHandler = (e) => {
		e.preventDefault();
		//user register
		if (password !== confirmPassword) {
			return setMessage("Password and Confirm Password do not match");
		} else {
			//update profile
			dispatch(updateUserProfile({ id: user.id, name, email, password }));
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{error && <Message variant='danger' children={error} />}
				{success && <Message variant='success' children={"profile updated"} />}
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
						Update Profile
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
			</Col>
		</Row>
	);
};

export default ProfileScreen;
