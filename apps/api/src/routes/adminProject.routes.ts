
import { Router } from "express";

import {
  createAdminProject,
  deleteAdminProject,
  getAdminProjectById,
  getAdminProjects,
  updateAdminProject,
} from "../controllers/adminProject.controller.js";

import authenticate from "../middlewares/authenticate.js";
import validate from "../middlewares/validate.js";

import {
  createProjectSchema,
  updateProjectSchema,
} from "../validators/project.validator.js";

const router = Router();

// Protect all admin project routes
router.use(authenticate);

// Get all projects
router.get("/", getAdminProjects);

// Get project by ID
router.get("/:id", getAdminProjectById);

// Create project
router.post("/", validate(createProjectSchema), createAdminProject);

// Update project
router.patch("/:id", validate(updateProjectSchema), updateAdminProject);

// Delete project
router.delete("/:id", deleteAdminProject);

export default router;
