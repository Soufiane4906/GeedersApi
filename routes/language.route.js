import express from "express";
import {
    createLanguage,
    getLanguages,
    updateLanguage,
    deleteLanguage
} from "../controllers/langague.controller.js";
import { verifyToken, verifyAdmin } from "../middleware/jwt.js";

const router = express.Router();

// Routes publiques
router.get("/", getLanguages);

// Routes admin uniquement
router.post("/", verifyToken, verifyAdmin, createLanguage);
router.put("/:id", verifyToken, verifyAdmin, updateLanguage);
router.delete("/:id", verifyToken, verifyAdmin, deleteLanguage);

export default router;
