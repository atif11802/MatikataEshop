import express from "express";
const router = express.Router();
import {
	getProducts,
	getProductById,
	deleteProduct,
} from "../controllers/productController.js";

import { protect, admin } from "../middleWare/authMiddleware.js";

//all products
router.get("/", getProducts);

//single products
router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct);

export default router;
