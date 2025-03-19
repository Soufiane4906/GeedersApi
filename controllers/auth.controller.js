// auth.controller.js
import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    // Check if password exists
    if (!req.body.password) {
      return next(createError(400, "Password is required"));
    }

    // Hash the password
    const hash = bcrypt.hashSync(req.body.password, 5);

    // Create new user object
    const newUser = new User({
      ...req.body,
      password: hash,
      username: req.body.email,
      isVerified: true,
    });

    // Save the user
    await newUser.save();

    res.status(201).send("User has been created successfully.");
  } catch (err) {
    // Handle duplicate key errors
    if (err.code === 11000) {
      if (err.keyPattern.email) {
        return next(createError(400, "Email already in use"));
      }
      if (err.keyPattern.username) {
        return next(createError(400, "Username already taken"));
      }
    }
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    // Check if username is provided
    if (!req.body.username) {
      return next(createError(400, "Username is required"));
    }

    // Find user by username
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    // Verify password
    if (!req.body.password) {
      return next(createError(400, "Password is required"));
    }

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));

    // Generate JWT token
    const token = jwt.sign(
        {
          id: user._id,
          isSeller: user.isSeller,
          isAmbassador: user.isAmbassador
        },
        process.env.JWT_KEY,
        { expiresIn: '24h' } // Add token expiration
    );

    // Extract user info without password
    const { password, ...info } = user._doc;

    // Send response with cookie
    res
        .cookie("accessToken", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000 // 24 hours
        })
        .status(200)
        .send(info);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  try {
    res
        .clearCookie("accessToken", {
          sameSite: "none",
          secure: true,
        })
        .status(200)
        .send("User has been logged out successfully.");
  } catch (err) {
    res.status(500).send("Error during logout process.");
  }
};