import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");
};
export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};
// controllers/user.controller.js


export const updateProfile = async (req, res, next) => {
  try {
    const { languages, hasCar, hasScooter, price } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { languages, hasCar, hasScooter, price, isComplete: true }, // Mark profile as complete
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(createError(500, "Error updating profile"));
  }
};
