
import { z } from "zod";

const projectImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().trim().min(1).max(200),
  caption: z.string().trim().optional(),
});

const projectSeoSchema = z.object({
  title: z.string().trim().max(160).optional(),
  description: z.string().trim().max(320).optional(),
  image: z.string().url().optional(),
});

export const createProjectSchema = z.object({
  name: z.string().trim().min(2).max(120),

  slug: z
    .string()
    .trim()
    .min(3)
    .max(160)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers, and hyphens only.",
    ),

  category: z.string().trim().min(2).max(100),

  filterCategory: z.enum([
    "Web App",
    "Website",
    "E-commerce",
    "Blog",
  ]),

  description: z.string().trim().min(10).max(500),

  overview: z.string().trim().min(10),

  focus: z.string().trim().min(3),

  features: z.array(z.string().trim().min(1)).default([]),

  technologies: z.array(z.string().trim().min(1)).default([]),

  images: z.array(projectImageSchema).default([]),

  socialImage: z.string().url().optional(),

  liveUrl: z.string().url().optional(),

  githubUrl: z.string().url().optional(),

  displayStatus: z.string().trim().min(2).max(60).default("Personal Project"),

  status: z.enum(["draft", "published"]).default("draft"),

  isFeatured: z.boolean().default(false),

  sortOrder: z.number().int().default(0),

  seo: projectSeoSchema.optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
