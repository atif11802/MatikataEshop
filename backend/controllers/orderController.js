import Order from "../models/OrderModel.js";
import asyncHandler from "express-async-handler";

//create new order
//private function
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.json;
		throw new Error("No order items");
	}
	const order = new Order({
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		user: req.user._id,
	});

	const createdOrder = await order.save();
	res.status(201).json(createdOrder);
});

export { addOrderItems };
