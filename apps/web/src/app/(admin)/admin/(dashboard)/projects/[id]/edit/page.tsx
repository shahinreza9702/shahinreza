
"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProjectForm from "@/components/admin/project-form";
import { ApiRequestError, apiRequest } from "@/lib/api";

interface Project {
  _id: string;
  name: string;
  slug: string;
  category: string;
  filterCategory: "Web App" | "Website" | "E-commerce" | "Blog";
  description: string;
  overview: string;
  focus: string;
  features: string[];
  technologies: string[];
  images: {
    url: string;
    alt: string;
    caption?: string;
  }[];
  socialImage?: string;
  liveUrl?: string;
  githubUrl?: string;
  displayStatus: string;
  status: "draft" | "published";
  isFeatured: boolean;
  sortOrder: number;
  seo?: {
    title?: string;
    description?: string;
    image?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ProjectResponse {
  success: boolean;
  data: Project;
}

export default function EditProjectPage() {
  const params = useParams<{ id: string }>();
  const projectId = params.id;

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProject = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await apiRequest<ProjectResponse>(
        `/admin/projects/${projectId}`,
      );

      setProject(response.data);
    } catch (err) {
      setError(
        err instanceof ApiRequestError || err instanceof Error
          ? err.message
          : "Unable to load project.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    void loadProject();
  }, [loadProject]);

  if (isLoading) {
    return (
      <div className="py-16 text-center text-sm text-muted">
        Loading project...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <h1 className="text-xl font-bold">Unable to load project</h1>
        <p className="mt-2 text-sm text-muted">
          {error || "The requested project could not be found."}
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => void loadProject()}
            className="rounded-xl border border-border px-5 py-3 text-sm"
          >
            Try Again
          </button>

          <a
            href="/admin/projects"
            className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white"
          >
            Back to Projects
          </a>
        </div>
      </div>
    );
  }

  return <ProjectForm mode="edit" initialProject={project} />;
}
