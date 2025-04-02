import express from "express";
import { verifyToken } from "../../middleware/jwt.js";
import { verifyAdmin } from "../../middleware/jwt.js";
import Order from "../../models/order.model.js";
import User from "../../models/user.model.js";

const router = express.Router();

// Get all orders (admin only)
// Get all orders with pagination (admin only)
router.get("/", verifyToken, verifyAdmin, async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const status = req.query.status;
        const sortField = req.query.sort || 'createdAt';
        const sortDirection = req.query.direction === 'asc' ? 1 : -1;

        const sortOptions = {};
        sortOptions[sortField] = sortDirection;

        // Build filter based on status
        const filter = {};
        if (status === 'completed') filter.isCompleted = true;
        if (status === 'pending') filter.isCompleted = false;

        // Count total matching documents for pagination info
        const total = await Order.countDocuments(filter);

        // Fetch the orders for the current page
        const orders = await Order.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);

        // Calculate total pages
        const totalPages = Math.ceil(total / limit);

        res.status(200).send({
            orders,
            total,
            totalPages,
            currentPage: page
        });
    } catch (err) {
        next(err);
    }
});

// Export all orders (for PDF/Excel - admin only)
router.get("/export", verifyToken, verifyAdmin, async (req, res, next) => {
    try {
        const status = req.query.status;

        // Build filter based on status
        const filter = {};
        if (status === 'completed') filter.isCompleted = true;
        if (status === 'pending') filter.isCompleted = false;

        // Find all orders for export (no pagination)
        const orders = await Order.find(filter)
            .sort({ createdAt: -1 })
            .populate('buyerId', 'username email')
            .populate('sellerId', 'username email');

        res.status(200).send(orders);
    } catch (err) {
        next(err);
    }
});

// Get single order details (admin only)
router.get("/:id", verifyToken, verifyAdmin, async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).send({ message: "Order not found" });
        }

        // Get both ambassador and guest details
        const ambassador = await User.findById(order.AmbassadorId);
        const guest = await User.findById(order.GuestId);

        res.status(200).send({
            order,
            ambassador: ambassador ? {
                _id: ambassador._id,
                username: ambassador.username,
                email: ambassador.email,
                country: ambassador.country,
                phone: ambassador.phone,
                profileImage: ambassador.profileImage
            } : null,
            guest: guest ? {
                _id: guest._id,
                username: guest.username,
                email: guest.email,
                country: guest.country,
                phone: guest.phone,
                profileImage: guest.profileImage
            } : null
        });
    } catch (err) {
        next(err);
    }
});

// Update order status (admin only)
router.patch("/:id/status", verifyToken, verifyAdmin, async (req, res, next) => {
    try {
        const { isCompleted } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { isCompleted },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).send({ message: "Order not found" });
        }

        res.status(200).send(updatedOrder);
    } catch (err) {
        next(err);
    }
});

// Delete order (admin only)
router.delete("/:id", verifyToken, verifyAdmin, async (req, res, next) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            return res.status(404).send({ message: "Order not found" });
        }

        res.status(200).send({ message: "Order deleted successfully" });
    } catch (err) {
        next(err);
    }
});

export default router;