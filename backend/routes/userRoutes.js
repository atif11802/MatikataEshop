import express from "express";
const router = express.Router();
import {
	authUser,
	getUserProfile,
	regesterUser,
} from "../controllers/userController.js";
import { protect } from "../middleWare/authMiddleware.js";

//authenticate user
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.post("/", regesterUser);

export default router;
