import express from "express";
import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  verifyEmail,
  getCurrentUser,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/ProtectedRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getCurrentUser);


router.post("/signup", signup);

router.post("/login", login);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.post("/logout", logout);

export default router;
