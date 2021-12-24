import express from "express";
const router = express.Router();
import { authUser } from "../controllers/userController.js";

//authenticate user
router.post("/login", authUser);

export default router;
