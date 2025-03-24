import express from "express";
import {
    getCountries,
    getCountryById,
    createCountry,
    updateCountry,
    deleteCountry,
    getGigsByCountry,
    getUsersByCountry,
    addTouristPlace,
    updateTouristPlace,
    deleteTouristPlace
} from "../controllers/country.controller.js";
import { verifyToken, verifyAdmin } from "../middleware/jwt.js";

const router = express.Router();

// Public routes
router.get("/", getCountries);
router.get("/:id", getCountryById);
router.get("/:countryName/gigs", getGigsByCountry);
router.get("/:countryName/users", getUsersByCountry);

// Admin-only routes
router.post("/", verifyToken, verifyAdmin, createCountry);
router.put("/:id", verifyToken, verifyAdmin, updateCountry);
router.delete("/:id", verifyToken, verifyAdmin, deleteCountry);

// Tourist places routes
router.post("/:countryId/:cityId/tourist-places", verifyToken, verifyAdmin, addTouristPlace);
router.put("/:countryId/:cityId/tourist-places/:placeId", verifyToken, verifyAdmin, updateTouristPlace);
router.delete("/:countryId/:cityId/tourist-places/:placeId", verifyToken, verifyAdmin, deleteTouristPlace);

export default router;