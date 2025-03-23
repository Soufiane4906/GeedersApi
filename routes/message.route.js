import express from "express";
import {
  createMessage,
  getMessages,
  translateMessage,
  markMessageAsRead,
  uploadMessageFile,
  shareLocation
} from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/jwt.js";
import multer from "multer";
import path from "path";
const router = express.Router();

// Basic message operations
router.post("/", verifyToken, createMessage);
router.get("/:id", verifyToken, getMessages);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// New routes for enhanced features
router.post("/translate", verifyToken, translateMessage);
router.post("/read/:messageId", verifyToken, markMessageAsRead);
router.post("/upload", verifyToken, upload.single('file'), uploadMessageFile);
router.post("/location", verifyToken, shareLocation);

export default router;