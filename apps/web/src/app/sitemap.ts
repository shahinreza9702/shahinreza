
import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { blogs } from "@/data/blogs";

const siteUrl = "https://shahinreza.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/blog",
    "/contact",
  ];

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
  }));

  // Only include published blog articles.
  const publishedBlogRoutes = blogs
    .filter((blog) => blog.status === "published")
    .map((blog) => ({
      url: `${siteUrl}/blog/${blog.slug}`,
    }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
    })),
    ...projectRoutes,
    ...publishedBlogRoutes,
  ];
}
