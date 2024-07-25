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
    const { username, location, age , languages , bankCardNumber, country, email } = req.body;

    // Log the incoming data
    console.log('Update Profile Data:', { username, age , languages,  country , bankCardNumber,  location, email });

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { ... req.body, isComplete: true }, // Ensure these fields are valid
      { new: true }
    );

    if (!updatedUser) {
      return next(createError(404, "User not found"));
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating profile:', err); // Log the error
    next(createError(500, "Error updating profile"));
  }
};


export const getVerifiedUsers = async (req, res, next) => {
  try {
    const { country, city, languages, vehicles } = req.query;

    const filters = {
      isVerified: true,
      isComplete: true,
    };

    if (country) filters.country = country;
    // if (city) filters.city = city;
    // if (languages) filters.languages = { $in: languages.split(",") };
    // if (vehicles) {
    //   const vehicleArray = vehicles.split(",");
    //   if (vehicleArray.includes("car")) filters.hasCar = true;
    //   if (vehicleArray.includes("scooter")) filters.hasScooter = true;
    // }

    const users = await User.find(filters);
    res.status(200).json(users);
  } catch (err) {
    next(createError(500, "Error fetching verified users"));
  }
};