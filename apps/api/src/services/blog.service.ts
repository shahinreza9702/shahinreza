
import Blog from "../models/blog.model.js";
import ApiError from "../utils/ApiError.js";

export const getPublishedBlogs = async () => {
  return Blog.find({ status: "published" })
    .select("-content")
    .sort({ publishedAt: -1, createdAt: -1 })
    .lean();
};

export const getPublishedBlogBySlug = async (slug: string) => {
  const blog = await Blog.findOne({
    slug,
    status: "published",
  }).lean();

  if (!blog) {
    throw new ApiError(404, "Blog post not found.");
  }

  return blog;
};
