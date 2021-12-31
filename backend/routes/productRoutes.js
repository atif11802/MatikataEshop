import express from "express";
import { Router } from "express";
const router = express.Router();
import {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
} from "../controllers/productController.js";

import { protect, admin } from "../middleWare/authMiddleware.js";

//all products
router.route("/").get(getProducts).post(protect, admin, createProduct);
//reviews
router.route("/:id/reviews").post(protect, createProductReview);

router.get("/top", getTopProducts);

//single products
router
	.route("/:id")
	.get(getProductById)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct);

export default router;
