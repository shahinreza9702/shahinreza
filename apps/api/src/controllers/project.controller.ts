
import type { Request, Response, NextFunction } from "express";

import {
  getPublishedProjects,
  getPublishedProjectBySlug,
} from "../services/project.service.js";

export const getProjects = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const projects = await getPublishedProjects();

    res.status(200).json({
      success: true,
      results: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const slug = req.params.slug;

    if (typeof slug !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid project slug.",
      });
      return;
    }

    const project = await getPublishedProjectBySlug(slug);

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};
