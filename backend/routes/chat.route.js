import express from "express";
import { protectRoute } from "../middleware/ProtectedRoute.js";
import { getChatMessages, sendMessage } from "../controllers/chatController.js";
const router = express.Router();

router.get("/:recipientId", protectRoute, getChatMessages);
router.post("/", protectRoute, sendMessage);

export default router;
