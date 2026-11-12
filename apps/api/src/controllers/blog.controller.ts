
import type { Request, Response, NextFunction } from "express";

import {
  getPublishedBlogs,
  getPublishedBlogBySlug,
} from "../services/blog.service.js";

export const getBlogs = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const blogs = await getPublishedBlogs();

    res.status(200).json({
      success: true,
      results: blogs.length,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};


export const getBlogBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const slug = req.params.slug;

    if (typeof slug !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid blog slug.",
      });
      return;
    }

    const blog = await getPublishedBlogBySlug(slug);

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

