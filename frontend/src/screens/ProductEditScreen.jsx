import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstant";

const ProductEditScreen = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [images, setImages] = useState([]);
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState("");

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);

	const { loading, error, product } = productDetails;

	const productUpdate = useSelector((state) => state.productUpdate);

	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			navigate("/admin/productlist");
		} else {
			if (!product.name || product._id !== id) {
				dispatch(listProductDetails(id));
			} else {
				setName(product.name);
				setPrice(product.price);
				// setImages(product.image);
				setBrand(product.brand);
				setCategory(product.category);
				setCountInStock(product.countInStock);
				setDescription(product.description);
			}
		}
	}, [product, dispatch, id, successUpdate, navigate]);

	const SubmitHandler = (e) => {
		e.preventDefault();

		dispatch(
			updateProduct({
				_id: id,
				name,
				price,
				images,
				brand,
				category,
				countInStock,
				description,
			})
		);
	};

	return (
		<>
			<Link to='/admin/productlist' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product </h1>
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
						<Form.Group controlId='formBasicprice'>
							<Form.Label>price </Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter price'
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId='images'>
							<Form.Label>Not more than 12 Images</Form.Label>
							<Form.Control
								type='file'
								multiple
								label='Files'
								onChange={(e) => setImages(e.target.files)}
							/>
						</Form.Group>

						<Form.Group controlId='brand'>
							<Form.Label>Brand </Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter brand'
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId='countInStock'>
							<Form.Label>CountInStock </Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter CountInStock'
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId='category'>
							<Form.Label>category </Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Category'
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId='Description'>
							<Form.Label>Description </Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Description'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Form.Group>
						<Button type='submit' className='btn btn-secondary mt-4'>
							Edit Product
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default ProductEditScreen;
