import express from "express";
import {
    getCities,
    getCityById,
    createCity,
    updateCity,
    deleteCity
} from "../controllers/city.controller.js";
import { verifyToken, verifyAdmin } from "../middleware/jwt.js";

const router = express.Router();

// Public routes
router.get("/", getCities);
router.get("/:countryId/:cityId", getCityById);

// Admin-only routes
router.post("/:countryId", verifyToken, verifyAdmin, createCity);
router.put("/:countryId/:cityId", verifyToken, verifyAdmin, updateCity);
router.delete("/:countryId/:cityId", verifyToken, verifyAdmin, deleteCity);

export default router;