
import mongoose from "mongoose";

import Blog from "../models/blog.model.js";
import ApiError from "../utils/ApiError.js";
import type {
  CreateBlogInput,
  UpdateBlogInput,
} from "../validators/blog.validator.js";

const validateBlogId = (id: string): void => {
  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid blog ID.");
  }
};

// Create blog
export const createBlog = async (input: CreateBlogInput) => {
  const existingBlog = await Blog.findOne({ slug: input.slug });

  if (existingBlog) {
    throw new ApiError(409, "A blog with this slug already exists.");
  }

  const publishedAt =
    input.status === "published" ? new Date() : null;

  return Blog.create({
    ...input,
    publishedAt,
  });
};

// Get all blogs (draft + published)
export const getAllBlogs = async () => {
  return Blog.find()
    .sort({ updatedAt: -1, createdAt: -1 })
    .lean();
};

// Get blog by ID
export const getBlogById = async (id: string) => {
  validateBlogId(id);

  const blog = await Blog.findById(id).lean();

  if (!blog) {
    throw new ApiError(404, "Blog post not found.");
  }

  return blog;
};

// Update blog
export const updateBlog = async (
  id: string,
  input: UpdateBlogInput,
) => {
  validateBlogId(id);

  const blog = await Blog.findById(id);

  if (!blog) {
    throw new ApiError(404, "Blog post not found.");
  }

  if (input.slug && input.slug !== blog.slug) {
    const existingBlog = await Blog.findOne({
      slug: input.slug,
      _id: { $ne: blog._id },
    });

    if (existingBlog) {
      throw new ApiError(409, "A blog with this slug already exists.");
    }
  }

  const previousStatus = blog.status;

  Object.assign(blog, input);

  if (blog.status === "draft") {
    blog.publishedAt = null;
  } else if (previousStatus === "draft" || !blog.publishedAt) {
    blog.publishedAt = new Date();
  }

  await blog.save();

  return blog;
};

// Delete blog
export const deleteBlog = async (id: string) => {
  validateBlogId(id);

  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) {
    throw new ApiError(404, "Blog post not found.");
  }

  return blog;
};
