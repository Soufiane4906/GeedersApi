import express from "express";
import { deleteUser, getUser , updateProfile , getVerifiedUsers } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
router.put("/:id", verifyToken, updateProfile); // Ensure this route is correctly set up
router.get("/", getVerifiedUsers);
export default router;
