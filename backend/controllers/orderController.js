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

//get order by id
//private
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);
	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

//update order to paid  order
//private

const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};

		const updatedOder = await order.save();

		res.json(updatedOder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

//get loggedin user profile
//api/orders/myorders

const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });
	res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
