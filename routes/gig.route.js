import express from "express";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
  getAllGigs,
  updateGig,
  // Routes admin
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

// Routes utilisateur standard
router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);
router.get("/all", getAllGigs);
router.put("/:id", verifyToken, updateGig);

// Routes admin - ajout du préfixe /admin pour correspondre aux appels frontend
router.get("/admin/gigs", verifyToken, verifyAdmin, getAdminGigs);
router.get("/admin/stats", verifyToken, verifyAdmin, getAdminGigStats);
router.delete("/admin/:id", verifyToken, verifyAdmin, adminDeleteGig);
router.patch("/admin/:id/status", verifyToken, verifyAdmin, adminUpdateGigStatus);
router.patch("/admin/:id/featured", verifyToken, verifyAdmin, adminUpdateGigFeatured);
router.post("/admin/bulk-delete", verifyToken, verifyAdmin, adminBulkDeleteGigs);
router.post("/admin/bulk-status", verifyToken, verifyAdmin, adminBulkUpdateGigStatus);
router.post("/admin/bulk-featured", verifyToken, verifyAdmin, adminBulkUpdateGigFeatured);

export default router;
