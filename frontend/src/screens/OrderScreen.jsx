import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import { Navigate, useNavigate } from "react-router-dom";
import CheckOutSteps from "../components/CheckOutSteps";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import {
	createOrder,
	getOrderDetails,
	payOrder,
	deliverOrder,
} from "../actions/orderActions";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import {
	ORDER_PAY_RESET,
	ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

const OrderScreen = () => {
	const [sdkReady, setSdkReady] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	let { orderId } = useParams();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay } = orderPay;

	const orderDeliver = useSelector((state) => state.orderDeliver);
	const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		}

		const addPaypalScript = async () => {
			const { data: clientId } = await axios.get("/api/config/paypal");
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};

		if (!order || successPay || successDeliver) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch({ type: ORDER_DELIVER_RESET });
			dispatch(getOrderDetails(orderId));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPaypalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [dispatch, orderId, successPay, order, successDeliver]);

	if (!loading) {
		const addDecimals = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2);
		};

		order.itemsPrice = addDecimals(
			order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
		);
	}

	const successPaymentHandler = (paymentResult) => {
		console.log(paymentResult);
		dispatch(payOrder(orderId, paymentResult));
	};

	const deliverHandler = () => {
		dispatch(deliverOrder(order));
	};

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<>
			<h1>Order {order.id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shippping</h2>
							<p>
								<strong>Name :</strong>
								{order.user.name}
							</p>
							<p>
								<strong>Email :</strong>
								<a href={`mailto:${order.user.email}`}> {order.user.email}</a>
							</p>

							<p>
								<strong>Address: </strong> {order.shippingAddress.address},
								{order.shippingAddress.city},{order.shippingAddress.postalCode},
								{order.shippingAddress.country}
							</p>
							{order.isDelivered ? (
								<Message variant='success'>
									Delivered on {order.DeliveredAt}
								</Message>
							) : (
								<Message variant='danger'>Not Delivered</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong> Method: </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant='success'>Paid on {order.paidAt}</Message>
							) : (
								<Message variant='danger'>Not Paid</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{order.orderItems.length === 0 ? (
								<Message>order is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{order.orderItems.map((item, i) => (
										<ListGroup.Item key={i}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} X ${item.price} = $
													{item.qty * item.price.toFixed()}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total Price</Col>
									<Col>${order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							{!order.isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader />}
									{!sdkReady ? (
										<Loader />
									) : (
										<PayPalButton
											amount={order.totalPrice}
											// shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
											onSuccess={successPaymentHandler}
										/>
									)}
								</ListGroup.Item>
							)}
							{loadingDeliver && <Loader></Loader>}
							{userInfo &&
								userInfo.isAdmin &&
								order.isPaid &&
								!order.isDelivered && (
									<ListGroup.Item>
										<Button
											type='button'
											className='btn btn-ligth'
											onClick={deliverHandler}
										>
											Mark As deliver
										</Button>
									</ListGroup.Item>
								)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
