import express from "express";
const router = express.Router();

import {
  register,
  login,
  logout,
  profile,
} from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile").get(authenticate, profile);

export default router;
