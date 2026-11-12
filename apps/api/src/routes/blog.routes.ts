
import { Router } from "express";

import {
  getBlogs,
  getBlogBySlug,
} from "../controllers/blog.controller.js";

const router = Router();

// Public blog routes
router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

export default router;
