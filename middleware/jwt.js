import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.userId = payload.id;
    req.isAdmin = payload.isAdmin;
    req.isAmbassador = payload.isAmbassador;
    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  if (!req.isAdmin) {
    return next(createError(403, "You are not authorized to perform this action"));
  }
  next();
};