
"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ApiRequestError, apiRequest } from "@/lib/api";

interface Project {
  _id: string;
  name: string;
  slug: string;
  category: string;
  filterCategory: string;
  description: string;
  technologies: string[];
  status: "draft" | "published";
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface AdminProjectsResponse {
  success: boolean;
  results: number;
  data: Project[];
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: Project;
}

type StatusFilter = "all" | "published" | "draft";

const buttonClass =
  "rounded-lg border border-border px-3 py-2 text-sm transition hover:border-primary hover:text-primary";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatingProjectId, setUpdatingProjectId] = useState<string | null>(
    null,
  );

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await apiRequest<AdminProjectsResponse>(
        "/admin/projects",
      );

      setProjects(response.data ?? []);
    } catch (err) {
      setError(
        err instanceof ApiRequestError || err instanceof Error
          ? err.message
          : "Unable to load projects.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  const statistics = useMemo(
    () => ({
      total: projects.length,
      published: projects.filter((project) => project.status === "published")
        .length,
      drafts: projects.filter((project) => project.status === "draft").length,
      featured: projects.filter((project) => project.isFeatured).length,
    }),
    [projects],
  );

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;

      const searchableText = [
        project.name,
        project.slug,
        project.category,
        project.filterCategory,
        project.description,
        ...(project.technologies ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return matchesStatus && searchableText.includes(query);
    });
  }, [projects, search, statusFilter]);

  async function handleStatusToggle(project: Project) {
    const nextStatus =
      project.status === "published" ? "draft" : "published";

    setUpdatingProjectId(project._id);
    setError("");

    try {
      await apiRequest<ApiResponse>(`/admin/projects/${project._id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus }),
      });

      setProjects((current) =>
        current.map((item) =>
          item._id === project._id
            ? { ...item, status: nextStatus }
            : item,
        ),
      );
    } catch (err) {
      setError(
        err instanceof ApiRequestError || err instanceof Error
          ? err.message
          : "Unable to update project status.",
      );
    } finally {
      setUpdatingProjectId(null);
    }
  }

  async function handleDelete() {
    if (!projectToDelete) return;

    setIsDeleting(true);
    setError("");

    try {
      await apiRequest<ApiResponse>(
        `/admin/projects/${projectToDelete._id}`,
        { method: "DELETE" },
      );

      setProjects((current) =>
        current.filter((project) => project._id !== projectToDelete._id),
      );

      setProjectToDelete(null);
    } catch (err) {
      setError(
        err instanceof ApiRequestError || err instanceof Error
          ? err.message
          : "Unable to delete project.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  const statCards = [
    { label: "Total Projects", value: statistics.total },
    { label: "Published", value: statistics.published },
    { label: "Drafts", value: statistics.drafts },
    { label: "Featured", value: statistics.featured },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="mt-2 text-sm text-muted">
            Manage your portfolio projects.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
        >
          + Add New Project
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400"
        >
          <span>{error}</span>
          <button
            type="button"
            onClick={() => void loadProjects()}
            className="font-medium underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-3 text-3xl font-bold tabular-nums">
              {isLoading ? "—" : card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 sm:flex-row">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search projects..."
          className="min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as StatusFilter)
          }
          className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        >
          <option value="all">All Projects</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
      </div>

      {/* Project List */}
      <section className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-semibold">All Projects</h2>
          <span className="text-sm text-muted">
            {filteredProjects.length} projects
          </span>
        </div>

        {isLoading ? (
          <div className="p-10 text-center text-sm text-muted">
            Loading projects...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-10 text-center">
            <h3 className="font-semibold">No projects found</h3>
            <p className="mt-2 text-sm text-muted">
              {projects.length === 0
                ? "Create your first project to get started."
                : "Try changing your search or status filter."}
            </p>
            {projects.length === 0 && (
              <Link
                href="/admin/projects/new"
                className="mt-5 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white"
              >
                Create Project
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredProjects.map((project) => (
              <article
                key={project._id}
                className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{project.name}</h3>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        project.status === "published"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {project.status}
                    </span>

                    {project.isFeatured && (
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-muted">
                    {project.category} · {project.filterCategory}
                  </p>

                  <p className="mt-2 line-clamp-2 text-sm text-muted">
                    {project.description}
                  </p>

                  {project.technologies?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((technology) => (
                        <span
                          key={technology}
                          className="rounded-md border border-border px-2 py-1 text-xs text-muted"
                        >
                          {technology}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="px-2 py-1 text-xs text-muted">
                          +{project.technologies.length - 5} more
                        </span>
                      )}
                    </div>
                  )}

                  <p className="mt-3 text-xs text-muted">
                    Updated:{" "}
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={updatingProjectId === project._id}
                    onClick={() => void handleStatusToggle(project)}
                    className={buttonClass + " disabled:opacity-50"}
                  >
                    {updatingProjectId === project._id
                      ? "Updating..."
                      : project.status === "published"
                        ? "Move to Draft"
                        : "Publish"}
                  </button>

                  <Link
                    href={`/admin/projects/${project._id}/edit`}
                    className={buttonClass}
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => setProjectToDelete(project)}
                    className="rounded-lg border border-red-500/30 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isDeleting) {
              setProjectToDelete(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-project-title"
            className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl"
          >
            <h2 id="delete-project-title" className="text-lg font-bold">
              Delete Project?
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted">
              Are you sure you want to delete{" "}
              <strong className="text-foreground">
                {projectToDelete.name}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setProjectToDelete(null)}
                className={buttonClass + " disabled:opacity-50"}
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={() => void handleDelete()}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
