import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
	let token;
	// let token = req.headers.authorization.replace("Bearer ", "");
	// console.log(token);
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.replace("Bearer ", "");

			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.id).select("-password");

			next();
		} catch (err) {
			res.status(401);
			throw new Error("Not authorized ,token failed");
		}
	}
	if (!token) {
		res.status(404);
		throw new Error("No token found");
	}
});
export { protect };
