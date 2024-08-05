import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, intent, confirm , getOrder} from "../controllers/order.controller.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirm);
//get single order
 router.get("/:id", getOrder);

export default router;
