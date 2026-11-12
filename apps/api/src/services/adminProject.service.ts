
import mongoose from "mongoose";

import Project from "../models/project.model.js";
import ApiError from "../utils/ApiError.js";

import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "../validators/project.validator.js";

const validateProjectId = (id: string): void => {
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid project ID.");
  }
};

// Create project
export const createProject = async (input: CreateProjectInput) => {
  const existingProject = await Project.findOne({
    slug: input.slug,
  });

  if (existingProject) {
    throw new ApiError(409, "A project with this slug already exists.");
  }

  return Project.create(input);
};

// Get all projects (draft + published)
export const getAllProjects = async () => {
  return Project.find()
    .sort({ sortOrder: 1, createdAt: -1 })
    .lean();
};

// Get project by ID
export const getProjectById = async (id: string) => {
  validateProjectId(id);

  const project = await Project.findById(id).lean();

  if (!project) {
    throw new ApiError(404, "Project not found.");
  }

  return project;
};

// Update project
export const updateProject = async (
  id: string,
  input: UpdateProjectInput,
) => {
  validateProjectId(id);

  const project = await Project.findById(id);

  if (!project) {
    throw new ApiError(404, "Project not found.");
  }

  if (input.slug && input.slug !== project.slug) {
    const existingProject = await Project.findOne({
      slug: input.slug,
      _id: { $ne: project._id },
    });

    if (existingProject) {
      throw new ApiError(409, "A project with this slug already exists.");
    }
  }

  Object.assign(project, input);

  await project.save();

  return project;
};

// Delete project
export const deleteProject = async (id: string) => {
  validateProjectId(id);

  const project = await Project.findByIdAndDelete(id);

  if (!project) {
    throw new ApiError(404, "Project not found.");
  }

  return project;
};
