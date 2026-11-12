
import { Router } from "express";

import {
  getMe,
  login,
  logout,
} from "../controllers/auth.controller.js";
import authenticate from "../middlewares/authenticate.js";
import validate from "../middlewares/validate.js";
import { loginSchema } from "../validators/auth.validator.js";
import loginLimiter from "../middlewares/loginLimiter.js";

const router = Router();

// Admin login
router.post("/login", loginLimiter, validate(loginSchema), login);

// Admin logout
router.post("/logout", logout);

// Get authenticated admin
router.get("/me", authenticate, getMe);

export default router;
