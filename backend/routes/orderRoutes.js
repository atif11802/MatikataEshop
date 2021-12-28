import express from "express";
const router = express.Router();
import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	getMyOrders,
} from "../controllers/orderController.js";

import { protect } from "../middleWare/authMiddleware.js";

//create Order Item
router.post("/", protect, addOrderItems);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
// router.get("/myorders", protect, getMyOrders);

// api/orders/myorders

export default router;
