import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

//auth the user
//post request
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid Email or Password");
	}
});

//regester a new getUserProfile
//public route

const regesterUser = asyncHandler(async (req, res) => {
	const { email, password, name } = req.body;

	const userExist = await User.findOne({ email });
	if (userExist) {
		res.status(400);
		throw new Error("User already exist");
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid User Data");
	}
});

//private route
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id).select("-password");
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

//private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id).select("-password");
	if (user) {
		// console.log(user);
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}
		const updateUser = await user.save();
		// .select("-password");

		res.json({
			_id: updateUser._id,
			name: updateUser.name,
			email: updateUser.email,
			isAdmin: updateUser.isAdmin,
			token: generateToken(updateUser._id),
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

export { authUser, getUserProfile, regesterUser, updateUserProfile };
