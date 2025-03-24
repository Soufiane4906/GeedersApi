import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/jwt.js";
import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import multer from "multer";
import upload from "../utils/upload.js";

const router = express.Router();

// Middleware for file uploads
const uploadFields = multer({ storage: multer.memoryStorage() }).fields([
  { name: "img", maxCount: 1 },
  { name: "imgRecto", maxCount: 1 },
  { name: "imgVerso", maxCount: 1 },
  { name: "imgPassport", maxCount: 1 }
]);

// Admin authorization middleware
const adminAuth = [verifyToken, verifyAdmin];

// Get all users (admin only)
router.get("/users", adminAuth, async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(createError(500, "Error fetching users"));
  }
});

// Get user by ID (admin only)
router.get("/users/:id", adminAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found"));
    res.status(200).json(user);
  } catch (err) {
    next(createError(500, "Error fetching user"));
  }
});

// Update user verification status (admin only)
router.patch("/users/:id/verify", adminAuth, async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { isVerified: req.body.isVerified },
        { new: true }
    );
    if (!updatedUser) return next(createError(404, "User not found"));
    res.status(200).json(updatedUser);
  } catch (err) {
    next(createError(500, "Error updating user verification status"));
  }
});

// Update user type (admin only)
router.patch("/users/:id/type", adminAuth, async (req, res, next) => {
  try {
    const { isAmbassador, isAdmin, userType } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { isAmbassador, isAdmin, userType },
        { new: true }
    );

    if (!updatedUser) return next(createError(404, "User not found"));
    res.status(200).json(updatedUser);
  } catch (err) {
    next(createError(500, "Error updating user type"));
  }
});

// Update user information (admin only)
router.put("/users/:id", adminAuth, uploadFields, async (req, res, next) => {
  try {
    let updateData = { ...req.body };

    // Handle file uploads if present
    if (req.files?.img) updateData.img = await upload(req.files.img[0]);
    if (req.files?.imgRecto) updateData.imgRecto = await upload(req.files.imgRecto[0]);
    if (req.files?.imgVerso) updateData.imgVerso = await upload(req.files.imgVerso[0]);
    if (req.files?.imgPassport) updateData.imgPassport = await upload(req.files.imgPassport[0]);

    // Handle languages array coming as string
    if (typeof updateData.languages === 'string') {
      updateData.languages = updateData.languages.split(',').map(lang => lang.trim());
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
    );

    if (!updatedUser) return next(createError(404, "User not found"));
    res.status(200).json(updatedUser);
  } catch (err) {
    next(createError(500, "Error updating user information"));
  }
});

// Delete user (admin only)
router.delete("/users/:id", adminAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found"));

    await user.deleteOne();
    res.status(200).send("User deleted successfully");
  } catch (err) {
    next(createError(500, "Error deleting user"));
  }
});

export default router;