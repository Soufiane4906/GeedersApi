// adminGigs.route.js
import express from "express";
import {
  getAdminGigs,
  getAdminGigStats,
  adminDeleteGig,
  adminUpdateGigStatus,
  adminUpdateGigFeatured,
  adminBulkDeleteGigs,
  adminBulkUpdateGigStatus,
  adminBulkUpdateGigFeatured
} from "../controllers/gig.controller.js";
import { verifyToken, verifyAdmin } from "../middleware/jwt.js";

const router = express.Router();

// Toutes les routes ici sont déjà sous /api/admin/gigs grâce au montage dans server.js
router.get("/", verifyToken, verifyAdmin, getAdminGigs);
router.get("/stats", verifyToken, verifyAdmin, getAdminGigStats);
router.delete("/:id", verifyToken, verifyAdmin, adminDeleteGig);
router.patch("/:id/featured", verifyToken, verifyAdmin, adminUpdateGigFeatured);
router.patch("/:id/status", verifyToken, verifyAdmin, adminUpdateGigStatus);
router.post("/bulk-delete", verifyToken, verifyAdmin, adminBulkDeleteGigs);
router.post("/bulk-status", verifyToken, verifyAdmin, adminBulkUpdateGigStatus);
router.post("/bulk-featured", verifyToken, verifyAdmin, adminBulkUpdateGigFeatured);

export default router;
