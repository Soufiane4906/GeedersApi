// controllers/user.controller.js
import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import upload from "../utils/upload.js";

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found"));
    if (req.userId !== user._id.toString()) return next(createError(403, "Unauthorized"));
    await user.deleteOne();
    res.status(200).send("User deleted.");
  } catch (err) {
    next(createError(500, "Error deleting user"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found"));
    res.status(200).json(user);
  } catch (err) {
    next(createError(500, "Error fetching user"));
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let updateData = { ...req.body, isComplete: true };

    if (req.files?.img) updateData.img = await upload(req.files.img[0]);
    if (req.files?.imgRecto) updateData.imgRecto = await upload(req.files.imgRecto[0]);
    if (req.files?.imgVerso) updateData.imgVerso = await upload(req.files.imgVerso[0]);
    if (req.files?.imgPassport) updateData.imgPassport = await upload(req.files.imgPassport[0]);

    const updatedUser = await User.findByIdAndUpdate(req.userId, updateData, { new: true });
    if (!updatedUser) return next(createError(404, "User not found"));

    res.status(200).json(updatedUser);
  } catch (err) {
    next(createError(500, "Error updating profile"));
  }
};

export const getVerifiedUsers = async (req, res, next) => {
  try {
    const filters = { isVerified: true, isComplete: true };
    if (req.query.country) filters.country = req.query.country;
    const users = await User.find(filters);
    res.status(200).json(users);
  } catch (err) {
    next(createError(500, "Error fetching verified users"));
  }
};
