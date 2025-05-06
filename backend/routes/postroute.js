import express from "express";
import { protectRoute } from "../middleware/ProtectedRoute.js";
import {
  getFeedPosts,
  createPost,
  deletePost,
} from "../controllers/postsController.js";

const router = express.Router();

router.get("/", protectRoute, getFeedPosts);
router.post("/create", protectRoute, createPost);
router.delete("/delete/:id", protectRoute, deletePost);

export default router;
