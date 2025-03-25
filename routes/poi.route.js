import express from "express";
import { addPOI, getPOIs, updatePOI, deletePOI } from "../controllers/poi.controller.js";
import { verifyToken, verifyAdmin } from "../middleware/jwt.js";

const router = express.Router();

// Public routes
router.get("/", getPOIs);

// Admin-only routes
router.post("/", verifyToken, verifyAdmin, addPOI);
router.put("/:id", verifyToken, verifyAdmin, updatePOI);
router.delete("/:id", verifyToken, verifyAdmin, deletePOI);

export default router;