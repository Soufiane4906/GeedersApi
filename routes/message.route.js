import express from "express";
import {
  createMessage,
  getMessages,
  markAsRead,
  translateMessage,
  uploadMessageFile  // Importez le contrôleur
} from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/jwt.js";
import {upload} from "../middleware/upload.js";

const router = express.Router();

router.post("/", verifyToken, createMessage);
router.get("/:id", verifyToken, getMessages);
router.put("/read/:id", verifyToken, markAsRead);
router.post("/translate", verifyToken, translateMessage);
router.post("/upload", verifyToken, upload.single('file'), uploadMessageFile);

export default router;