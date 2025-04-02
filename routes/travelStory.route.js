// routes/travelStory.routes.js
import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { createStory, getStories, getStoryById, updateStoryStatus } from "../controllers/travelStory.controller.js";
import { verifyAdmin } from "../middleware/jwt.js"

const router = express.Router();

router.post("/", verifyToken, createStory);
router.get("/", getStories);
router.get("/:id", getStoryById);
router.put("/:id/status", verifyToken, verifyAdmin, updateStoryStatus);

export default router;
