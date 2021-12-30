import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	listProducts,
	deleteProduct,
	createProduct,
} from "../actions/productActions";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { PRODUCT_CREATE_RESET } from "../constants/productConstant";

const ProductListScreen = () => {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate;

	const navigate = useNavigate();

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET });
		if (!userInfo.isAdmin) {
			navigate("/");
		}
		if (successCreate) {
			navigate(`/admin/product/${createdProduct._id}/edit`);
		} else {
			dispatch(listProducts());
		}
	}, [
		navigate,
		dispatch,
		userInfo,
		successDelete,
		successCreate,
		createdProduct,
	]);

	const createProductHandler = () => {
		dispatch(createProduct());
	};

	const deleteHandler = (id) => {
		if (window.confirm("are you sure")) {
			dispatch(deleteProduct(id));
		}
	};

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createProductHandler}>
						<i className='fas fa-plus'></i> Create Product
					</Button>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger' children={errorDelete} />}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant='danger' children={errorCreate} />}
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
							<th>Price</th>
							<th>Category</th>
							<th>Brand</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>${product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td>
									<LinkContainer to={`/admin/product/${product._id}/edit`}>
										<Button variant='light' className='btn-sm'>
											<i className='far fa-edit'></i>
											Edit
										</Button>
									</LinkContainer>
									<Button
										variant='danger'
										className='btn-sm'
										onClick={() => deleteHandler(product._id)}
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

export default ProductListScreen;
