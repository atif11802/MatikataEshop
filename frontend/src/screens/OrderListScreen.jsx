import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderActions";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";

const OderListScreen = () => {
	const dispatch = useDispatch();
	const orderList = useSelector((state) => state.orderList);
	const { loading, error, orders } = orderList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const navigate = useNavigate();

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listOrders());
		} else {
			navigate("/");
		}
	}, [navigate, dispatch, userInfo]);

	console.log(orders);

	return (
		<>
			<h1>Orders</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger' children={error} />
			) : (
				<Table striped bordered hover responsive className='table--sm'>
					<thead>
						<tr>
							<th>Id</th>
							<th>User</th>
							<th>Date</th>
							<th>Total</th>
							<th>Paid</th>
							<th>Delivered</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user && order.user.name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>${order.totalPrice}</td>
								<td>
									{order.isPaid ? (
										order.paidAt.substring(0, 10)
									) : (
										<i
											style={{ color: "red" }}
											className='fas fa-times-circle'
										></i>
									)}
								</td>
								<td>
									{order.isDelivered ? (
										order.updatedAt.substring(0, 10)
									) : (
										<i
											style={{ color: "red" }}
											className='fas fa-times-circle'
										></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/order/${order._id}`}>
										<Button variant='light' className='btn-sm'>
											<i className='far fa-edit'></i>
											Details
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default OderListScreen;
