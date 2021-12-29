import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { USER_UPDATE_RESET } from "../constants/userConstant";

const UserEditScreen = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);

	const { loading, error, user } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate);

	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			navigate("/admin/userlist");
		} else {
			if (!user.name || user._id !== id) {
				dispatch(getUserDetails(id));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [user, dispatch, id, successUpdate, navigate]);

	const SubmitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateUser({
				_id: id,
				name,
				email,
				isAdmin,
			})
		);
	};

	return (
		<>
			<Link to='/admin/userlist' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User </h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={SubmitHandler}>
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
						<Form.Group controlId='isadmin'>
							<Form.Check
								type='checkbox'
								label='Is Admin'
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							/>
						</Form.Group>

						<Button type='submit' className='btn btn-secondary mt-4'>
							Edit
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
