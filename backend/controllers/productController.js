import Product from "../models/ProductModel.js";
import asyncHandler from "express-async-handler";

//get all products from db
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	return res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

export { getProducts, getProductById };
