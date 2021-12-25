import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);

	const { products, loading, error } = productList;

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<div className='mt-3'>
			<h4>Latest Products</h4>

			{loading ? (
				<Loader loading />
			) : error ? (
				<Message vairant='danger' children={error} />
			) : (
				<Row>
					{products.length > 0 &&
						products.map((product, i) => (
							<Col sm={12} md={6} lg={4} xl={3} key={i}>
								<Product product={product} />
							</Col>
						))}
				</Row>
			)}
		</div>
	);
};

export default HomeScreen;
