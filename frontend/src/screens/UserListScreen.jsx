import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";

const UserListScreen = () => {
	const dispatch = useDispatch();
	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	const navigate = useNavigate();

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			navigate("/");
		}
	}, [navigate, dispatch, userInfo, successDelete]);

	const deleteHandler = (id) => {
		if (window.confirm("are you sure")) {
			dispatch(deleteUser(id));
		}
	};

	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger' children={error} />
			) : (
				<Table striped bordered hover responsive className='table--sm'>
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Email</th>
							<th>Admin</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<a href={`mailto:${user.email}`}> {user.email}</a>
								</td>
								<td>
									{user.isAdmin ? (
										<i
											className='fas fa-check-circle'
											style={{ color: "green" }}
										></i>
									) : (
										<i
											style={{ color: "red" }}
											className='fas fa-times-circle'
										></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/admin/user/${user._id}/edit`}>
										<Button variant='light' className='btn-sm'>
											<i className='far fa-edit'></i>
											Edit
										</Button>
									</LinkContainer>
									<Button
										variant='danger'
										className='btn-sm'
										onClick={() => deleteHandler(user._id)}
									>
										<i className='fas fa-trash'></i>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default UserListScreen;
