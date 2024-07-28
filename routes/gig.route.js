import express from "express";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs
} from "../controllers/gig.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);
router.put('/:id/update-price', async (req, res) => {
  const { id } = req.params;
  const { totalPrice } = req.body;

  try {
    // Find the gig by ID and update the totalPrice
    const updatedGig = await Gig.findByIdAndUpdate(
      id,
      { totalPrice },
      { new: true } // Return the updated document
    );

    if (!updatedGig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    res.json(updatedGig);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
