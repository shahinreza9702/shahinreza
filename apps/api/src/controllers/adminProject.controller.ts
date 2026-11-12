
import type { Request, Response, NextFunction } from "express";

import {
  createProject as createProjectService,
  deleteProject as deleteProjectService,
  getAllProjects,
  getProjectById as getProjectByIdService,
  updateProject as updateProjectService,
} from "../services/adminProject.service.js";

import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "../validators/project.validator.js";

import ApiError from "../utils/ApiError.js";

// Get all projects (admin)
export const getAdminProjects = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const projects = await getAllProjects();

    res.status(200).json({
      success: true,
      results: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// Get project by ID (admin)
export const getAdminProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      throw new ApiError(400, "Project ID is required.");
    }

    const project = await getProjectByIdService(id);

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// Create project
export const createAdminProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const project = await createProjectService(
      req.body as CreateProjectInput,
    );

    res.status(201).json({
      success: true,
      message: "Project created successfully.",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// Update project
export const updateAdminProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      throw new ApiError(400, "Project ID is required.");
    }

    const project = await updateProjectService(
      id,
      req.body as UpdateProjectInput,
    );

    res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// Delete project
export const deleteAdminProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      throw new ApiError(400, "Project ID is required.");
    }

    await deleteProjectService(id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
