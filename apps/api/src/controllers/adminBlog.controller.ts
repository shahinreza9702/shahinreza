
import type { Request, Response, NextFunction } from "express";

import {
  createBlog as createBlogService,
  deleteBlog as deleteBlogService,
  getAllBlogs,
  getBlogById as getBlogByIdService,
  updateBlog as updateBlogService,
} from "../services/adminBlog.service.js";

import type {
  CreateBlogInput,
  UpdateBlogInput,
} from "../validators/blog.validator.js";

// Get all blogs
export const getAdminBlogs = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const blogs = await getAllBlogs();

    res.status(200).json({
      success: true,
      results: blogs.length,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// Get blog by ID
export const getAdminBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid blog ID.",
      });
      return;
    }

    const blog = await getBlogByIdService(id);

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// Create blog
export const createAdminBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const blog = await createBlogService(req.body as CreateBlogInput);

    res.status(201).json({
      success: true,
      message: "Blog created successfully.",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// Update blog
export const updateAdminBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid blog ID.",
      });
      return;
    }

    const blog = await updateBlogService(
      id,
      req.body as UpdateBlogInput,
    );

    res.status(200).json({
      success: true,
      message: "Blog updated successfully.",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// Delete blog
export const deleteAdminBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.params.id;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid blog ID.",
      });
      return;
    }

    await deleteBlogService(id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
