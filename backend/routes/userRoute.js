import express from "express";
import {
  getPublicProfile,
  getSuggestedConnectoins,
  updateProfile,
} from "../controllers/userController.js";
import { protectRoute } from "../middleware/ProtectedRoute.js";

const router = express.Router();

router.get("/suggestions", protectRoute, getSuggestedConnectoins);
router.get("/:username", protectRoute, getPublicProfile);

router.put("/profile", protectRoute, updateProfile);

export default router;
