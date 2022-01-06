import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
	console.log("hello", product);
	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/product/${product._id}`}>
				<Card.Img
					variant='top'
					style={{ minHeight: "250px", minWidth: "200px" }}
					src={product.image ? product.image : product.productPictures[0]?.res}
				/>
			</Link>
			<Card.Body>
				<Link to={`/product/${product._id}`}>
					<Card.Title as='div'>
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>
				<Card.Text as='div'>
					<Rating
						value={product.rating}
						text={`${product.numReviews} reviews`}
					/>
				</Card.Text>
				<Card.Text as='h5'>${product.price}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
