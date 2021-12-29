import express from "express";
const router = express.Router();
import {
	authUser,
	getUserProfile,
	regesterUser,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserbyId,
	updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleWare/authMiddleware.js";

//authenticate user
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.route("/").post(regesterUser).get(protect, admin, getUsers);
router.patch("/profile", protect, updateUserProfile);

router
	.route("/:id")
	.delete(protect, admin, deleteUser)
	.get(protect, admin, getUserbyId)
	.put(protect, admin, updateUser);

export default router;
