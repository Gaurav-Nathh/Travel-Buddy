import express from "express";
import { protectRoute } from "../middleware/ProtectedRoute.js";
import {
  getFeedPosts,
  createPost,
  deletePost,
  getUserPosts,
  likePost,
  createComment,
} from "../controllers/postsController.js";

const router = express.Router();

router.get("/", protectRoute, getFeedPosts);
router.get("/myposts", protectRoute, getUserPosts);
router.post("/create", protectRoute, createPost);
router.delete("/delete/:id", protectRoute, deletePost);
router.post("/:id/like", protectRoute, likePost);
router.post("/:id/comment", protectRoute, createComment);

export default router;
