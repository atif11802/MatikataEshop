import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { Helmet } from "react-helmet";
import MessengerCustomerChat from "react-messenger-customer-chat";

const HomeScreen = () => {
	const { keyword } = useParams();
	console.log(keyword);

	const { pageNumber } = useParams();
	const pageNumbers = pageNumber || 1;

	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);

	const { products, loading, error, pages, page } = productList;

	useEffect(() => {
		// if (keyword) {
		// 	dispatch(listProducts(keyword));
		// }
		dispatch(listProducts(keyword, pageNumbers));
	}, [dispatch, keyword, pageNumbers]);

	return (
		<div className='mt-3'>
			<Helmet>
				<meta
					charSet='utf-8'
					name='description'
					content='we sell authentic Product'
				/>
				<title>Matikata Shop</title>
				<link rel='canonical' href='http://mysite.com/example' />
			</Helmet>
			{!keyword && <ProductCarousel />}
			<h4>Latest Products</h4>

			{loading ? (
				<Loader loading />
			) : error ? (
				<Message vairant='danger' children={error} />
			) : (
				<>
					<Row>
						{products.length > 0 &&
							products.map((product, i) => (
								<Col sm={12} md={6} lg={4} xl={3} key={i}>
									<Product product={product} />
								</Col>
							))}
					</Row>
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ""}
					/>
				</>
			)}
			<MessengerCustomerChat pageId='101210219116469' appId='214741650861912' />
		</div>
	);
};

export default HomeScreen;
