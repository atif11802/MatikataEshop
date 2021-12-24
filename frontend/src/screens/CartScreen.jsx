import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import {
	Button,
	Card,
	Col,
	Form,
	Image,
	ListGroup,
	Row,
} from "react-bootstrap";

const CartScreen = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const location = useLocation();
	const qty = location.search ? Number(location.search.split("=")[1]) : 1;

	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	console.log(cartItems);

	useEffect(() => {
		if (id) {
			dispatch(addToCart(id, qty));
		}
	}, [dispatch, id, qty]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		navigate(`/login?redirect=shipping`);
	};

	return (
		<Row>
			<Col md={8}>
				<h3>Shopping Cart</h3>
				<Link className='btn btn-light my-3' to='/'>
					go back
				</Link>
				{cartItems.length === 0 ? (
					<Message children='Your cart is Empty' />
				) : (
					<ListGroup variant='flush'>
						{cartItems.map((item) => (
							<ListGroup.Item key={item.id}>
								<Row>
									<Col md={2} sm={3}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>${item.price}</Col>
									<Col md={3}>
										<Form.Control
											as='select'
											value={item.qty}
											onChange={(e) =>
												dispatch(
													addToCart(item.product, Number(e.target.value))
												)
											}
										>
											{[...Array(item.countInStock).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type='button'
											variant='light'
											onClick={() => removeFromCartHandler(item.product)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4} className='mt-5'>
				<Card>
					<ListGroup>
						<h2>
							Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
							items
						</h2>
						<h2>
							${" "}
							{cartItems
								.reduce((acc, item) => acc + item.qty * item.price, 0)
								.toFixed(2)}
						</h2>
					</ListGroup>
					<ListGroup.Item>
						<Button
							type='button'
							className='btn-block'
							disabled={cartItems.length === 0}
							onClick={checkoutHandler}
						>
							Proceed To Checkout
						</Button>
					</ListGroup.Item>
				</Card>
			</Col>
		</Row>
	);
};

export default CartScreen;
