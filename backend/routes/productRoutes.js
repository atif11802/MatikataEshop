import express from "express";
const router = express.Router();
import {
	getProducts,
	getProductById,
} from "../controllers/productController.js";

//all products
router.get("/", getProducts);

//single products
router.get("/:id", getProductById);

export default router;
