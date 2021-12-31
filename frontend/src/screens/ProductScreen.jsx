import React, { useEffect, useState } from "react";
import { Button, Card, Form, ListGroup } from "react-bootstrap";
import { Col, Image, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import {
	listProductDetails,
	createProductReview,
} from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstant";
import { Helmet } from "react-helmet";

const ProductScreen = () => {
	const [qty, setQty] = useState(1);

	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const navigate = useNavigate();

	const { id } = useParams();
	const productDetails = useSelector((state) => state.productDetails);
	const { product, loading, error } = productDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productReviewCreate = useSelector((state) => state.productReviewCreate);
	const { success: successProductReview, error: errorProductReview } =
		productReviewCreate;

	const dispatch = useDispatch();

	useEffect(() => {
		if (successProductReview) {
			alert("Review submitted");
			setRating(0);
			setComment("");
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(listProductDetails(id));
	}, [id, dispatch, successProductReview]);

	const addToCartHandler = () => {
		navigate(`/cart/${id}?qty=${qty}`);
	};
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createProductReview(id, { comment, rating }));
	};

	return (
		<>
			<Helmet>
				<meta charSet='utf-8' />
				<title>{product.name}</title>
				<link rel='canonical' href='http://mysite.com/example' />
			</Helmet>
			<Link className='btn btn-light my-3' to='/'>
				go back
			</Link>

			{loading ? (
				<Loader loading />
			) : error ? (
				<Message vairant='danger' children={error} />
			) : (
				<>
					<Row>
						<Col md={6}>
							<Image src={product.image} alt={product.name} fluid />
						</Col>
						<Col md={3}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h6>{product.name}</h6>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={product.rating}
										text={`${product.numReviews} reviews`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>Price : ${product.price}</ListGroup.Item>
								<ListGroup.Item>
									Description : ${product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Price : </Col>
											<Col>
												<strong>${product.price}</strong>{" "}
											</Col>
										</Row>
									</ListGroup.Item>
								</ListGroup>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Status : </Col>
											<Col>
												{product.countInStock > 0 ? "In Stock" : "Out of Stock"}
											</Col>
										</Row>
									</ListGroup.Item>

									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty</Col>
												<Col>
													<Form.Control
														as='select'
														value={qty}
														onChange={(e) => setQty(e.target.value)}
													>
														{[...Array(product.countInStock).keys()].map(
															(x) => (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option>
															)
														)}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}

									<ListGroup.Item>
										<Button
											className='btn btn-lg btn-light'
											type='button'
											disabled={product.countInStock > 0 ? false : true}
											onClick={addToCartHandler}
										>
											Add to Cart
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2>reviews</h2>
							{product.reviews.length === 0 && <Message>No reviews</Message>}
							<ListGroup variant='flush'>
								{product.reviews.map((review, i) => (
									<ListGroup.Item key={i}>
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>{review.createdAt}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Write A Customer Review</h2>
									{errorProductReview && (
										<Message variant='danger' children={errorProductReview} />
									)}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId='rating'>
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as='select'
													value={rating}
													onChange={(e) => setRating(e.target.value)}
												>
													<option value=''>Select</option>
													<option value='1'>1 poor</option>
													<option value='2'>2 Fair</option>
													<option value='3'>3 good</option>
													<option value='4'>4 Very good</option>
													<option value='5'>5 Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId='comment'>
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as='textarea'
													row='3'
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>
											<Button type='submit' variant='primary'>
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											Please <Link to='/login'>Login</Link>{" "}
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductScreen;
