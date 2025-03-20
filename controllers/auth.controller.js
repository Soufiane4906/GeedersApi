import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);

    // Create username from email if not provided
    const username = req.body.username || req.body.email;

    // Set verification status based on user type
    // For security, admin accounts should be manually verified
    const isVerified = req.body.userType === "admin" ? false : true;

    // For ambassador accounts, we need to verify they're complete
    const isComplete = req.body.isAmbassador ?
        Boolean(req.body.phone && req.body.age && req.body.languages && req.body.languages.length > 0 && req.body.desc) :
        true;

    const newUser = new User({
      ...req.body,
      password: hash,
      username: username,
      isVerified: isVerified,
      isComplete: isComplete,
      // Map frontend fields to database fields
      firstName: req.body.firstname,
      lastName: req.body.lastname
    });

    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
        {
          id: user._id,
          isAmbassador: user.isAmbassador,
          isAdmin: user.isAdmin || false,
        },
        process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res
        .cookie("accessToken", token, {
          httpOnly: true,
          secure: true, // Ensure the cookie is only sent over HTTPS
          sameSite: "none", // This allows cross-origin cookies
        })
        .status(200)
        .send(info);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send("User has been logged out.");
};