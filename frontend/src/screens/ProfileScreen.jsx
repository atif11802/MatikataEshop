import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listMyOrders } from "../actions/orderActions.js";

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

	const orderListMy = useSelector((state) => state.orderListMy);

	const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;
	// console.log(loadingOrders, errorOrders, orders);

	useEffect(() => {
		if (!userInfo) {
			navigate(`/login`);
		} else {
			if (!user.name) {
				dispatch(getUserDetails("profile"));
				dispatch(listMyOrders());
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
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant='danger'>{errorOrders}</Message>
				) : (
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.totalPrice}</td>
									<td>
										{order.isPaid ? (
											order.createdAt.substring(0, 10)
										) : (
											<i className='fas fa-times' style={{ color: "red" }}></i>
										)}
									</td>
									<td>
										{order.isDelivered ? (
											order.updatedAt.substring(0, 10)
										) : (
											<i className='fas fa-times' style={{ color: "red" }}></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button className='btn-sm' variant='light'>
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfileScreen;
