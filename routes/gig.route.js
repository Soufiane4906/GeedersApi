// gig.route.js
import express from "express";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
  getAllGigs,
  updateGig
} from "../controllers/gig.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// Routes utilisateur standard
router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);
router.get("/all", getAllGigs);
router.put("/:id", verifyToken, updateGig);

export default router;
