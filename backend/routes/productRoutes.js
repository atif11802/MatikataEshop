import express from "express";
const router = express.Router();
import {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
} from "../controllers/productController.js";

import { protect, admin } from "../middleWare/authMiddleware.js";

//all products
router.route("/").get(getProducts).post(protect, admin, createProduct);

//single products
router
	.route("/:id")
	.get(getProductById)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct);

export default router;
