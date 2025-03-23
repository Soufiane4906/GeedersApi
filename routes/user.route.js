import express from "express";
import {deleteUser, getUser, updateProfile, getVerifiedUsers, updatePassword} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();
router.put("/:id/update-password", verifyToken, updatePassword);

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
router.put("/:id", verifyToken, updateProfile); // Ensure this route is correctly set up
router.get("/", getVerifiedUsers);
router.put("/:id", verifyToken, upload.fields([
    { name: "img", maxCount: 1 },
    { name: "imgRecto", maxCount: 1 },
    { name: "imgVerso", maxCount: 1 },
    { name: "imgPassport", maxCount: 1 }
]), updateProfile);

export default router;
