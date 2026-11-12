
import { z } from "zod";

const contentBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("paragraph"),
    text: z.string().trim().min(1),
  }),
  z.object({
    type: z.literal("heading"),
    text: z.string().trim().min(1),
    headingLevel: z.union([z.literal(2), z.literal(3)]),
  }),
  z.object({
    type: z.literal("image"),
    url: z.string().url(),
    alt: z.string().trim().min(1).max(200),
    caption: z.string().trim().optional(),
  }),
  z.object({
    type: z.literal("list"),
    listStyle: z.enum(["ordered", "unordered"]),
    items: z.array(z.string().trim().min(1)).min(1),
  }),
  z.object({
    type: z.literal("quote"),
    text: z.string().trim().min(1),
  }),
  z.object({
    type: z.literal("code"),
    text: z.string(),
    language: z.string().trim().optional(),
  }),
]);

const blogSeoSchema = z.object({
  title: z.string().trim().max(160).optional(),
  description: z.string().trim().max(320).optional(),
  image: z.string().url().optional(),
});

export const createBlogSchema = z.object({
  title: z.string().trim().min(3).max(160),
  slug: z.string().trim().min(3).max(160).regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must contain lowercase letters, numbers, and hyphens only.",
  ),
  category: z.string().trim().min(2).max(80),
  description: z.string().trim().min(10).max(320),
  content: z.array(contentBlockSchema).default([]),
  coverImage: z.string().url().optional(),
  tags: z.array(z.string().trim().min(1)).default([]),
  status: z.enum(["draft", "published"]).default("draft"),
  seo: blogSeoSchema.optional(),
});

export const updateBlogSchema = createBlogSchema.partial();

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
