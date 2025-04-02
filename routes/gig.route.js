import express from "express";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
  getAllGigs,
  updateGig,
  getAdminGigs,
  getAdminGigStats,
  adminDeleteGig,
  adminUpdateGigStatus,
  adminUpdateGigFeatured,
  adminBulkDeleteGigs,
  adminBulkUpdateGigStatus,
  adminBulkUpdateGigFeatured,
  adminUpdateGig
} from "../controllers/gig.controller.js";
import { verifyToken , verifyAdmin } from "../middleware/jwt.js";

const router = express.Router();

// Regular user routes
router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);
router.put("/:id", verifyToken, updateGig);

// Admin routes
router.get("/admin", verifyToken, verifyAdmin, getAdminGigs);
router.get("/admin/stats", verifyToken, verifyAdmin, getAdminGigStats);
router.delete("/admin/:id", verifyToken, verifyAdmin, adminDeleteGig);
router.put("/admin/:id", verifyToken, verifyAdmin, adminUpdateGig);
router.patch("/admin/:id/status", verifyToken, verifyAdmin, adminUpdateGigStatus);
router.patch("/admin/:id/featured", verifyToken, verifyAdmin, adminUpdateGigFeatured);
router.post("/admin/bulk-delete", verifyToken, verifyAdmin, adminBulkDeleteGigs);
router.patch("/admin/bulk-status", verifyToken, verifyAdmin, adminBulkUpdateGigStatus);
router.patch("/admin/bulk-featured", verifyToken, verifyAdmin, adminBulkUpdateGigFeatured);

export default router;