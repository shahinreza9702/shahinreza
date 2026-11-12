
import { Router } from "express";

import {
  createAdminBlog,
  deleteAdminBlog,
  getAdminBlogById,
  getAdminBlogs,
  updateAdminBlog,
} from "../controllers/adminBlog.controller.js";

import authenticate from "../middlewares/authenticate.js";
import validate from "../middlewares/validate.js";

import {
  createBlogSchema,
  updateBlogSchema,
} from "../validators/blog.validator.js";

const router = Router();

// Protect all admin blog routes
router.use(authenticate);

// Get all blogs
router.get("/", getAdminBlogs);

// Get blog by ID
router.get("/:id", getAdminBlogById);

// Create blog
router.post("/", validate(createBlogSchema), createAdminBlog);

// Update blog
router.patch("/:id", validate(updateBlogSchema), updateAdminBlog);

// Delete blog
router.delete("/:id", deleteAdminBlog);

export default router;
