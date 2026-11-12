
import Project from "../models/project.model.js";
import ApiError from "../utils/ApiError.js";

export const getPublishedProjects = async () => {
  return Project.find({ status: "published" })
    .select("-overview -focus -features")
    .sort({ isFeatured: -1, sortOrder: 1, createdAt: -1 })
    .lean();
};

export const getPublishedProjectBySlug = async (slug: string) => {
  const project = await Project.findOne({
    slug,
    status: "published",
  }).lean();

  if (!project) {
    throw new ApiError(404, "Project not found.");
  }

  return project;
};
