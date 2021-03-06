import Product from "../models/ProductModel.js";
import asyncHandler from "express-async-handler";
import cloudinary from "../cloudinary.js";

//get all products from db
const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 8;
	const page = Number(req.query.pageNumber) || 1;

	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: "i",
				},
		  }
		: {};

	const count = await Product.countDocuments({ ...keyword });

	const products = await Product.find({
		...keyword,
	})
		.limit(pageSize)
		.skip(pageSize * (page - 1));
	return res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

//delete a product
//delete req for admin only

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		const deletedProduct = await product.remove();
		res.json({
			message: "Product deleted",
		});
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

//create a product

const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: "Sample name",
		price: 0,
		user: req.user._id,
		productPictures: [],
		brand: "Sample brand",
		category: "Sample category",
		countInStock: 0,
		numReviews: 0,
		description: "Sample description",
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

const updateProduct = async (req, res) => {
	const { name, price, description, brand, category, countInStock } = req.body;

	const product = await Product.findById(req.params.id);

	product.productPictures.map(async (picture) => {
		await cloudinary.uploader.destroy(picture.public);
	});

	// console.log(productPictures);

	if (product) {
		let pictureFiles = req.files;
		console.log(pictureFiles);
		if (!pictureFiles)
			return res.status(400).json({ message: "No picture attached!" });
		let multiplePicturePromise = pictureFiles.map((picture) =>
			cloudinary.v2.uploader.upload(picture.path)
		);
		let imageResponses = await Promise.all(multiplePicturePromise);
		// res.status(200).json({ images: imageResponses });
		const productPictures = imageResponses.map((image) => {
			let obj = {};
			obj.res = image.url;
			obj.public = image.public_id;
			return obj;
			// return ({ public_id, secure_url } = image);
		});
		product.name = name;
		product.price = price;
		product.description = description;
		product.productPictures = productPictures;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;
		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
};

//logged user only can access
//post req

const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);

		if (alreadyReviewed) {
			res.status(400);
			throw new Error("Product already reviewed");
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);

		product.numReviews = product.reviews.length;

		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({ message: "Review added" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

//getToprated products

const getTopProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(4);
	res.json(products);
});

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
};
