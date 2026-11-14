"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { apiRequest } from "@/lib/api";

interface Blog {
  _id: string;
  title: string;
  status: "draft" | "published";
  updatedAt: string;
}

interface Project {
  _id: string;
  name: string;
  status: "draft" | "published";
  isFeatured: boolean;
  updatedAt: string;
}

interface ListResponse<T> {
  success: boolean;
  results: number;
  data: T[];
}

type RecentItem = {
  id: string;
  title: string;
  kind: "Blog" | "Project";
  status: "draft" | "published";
  updatedAt: string;
  href: string;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

export default function AdminDashboardPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOverview = useCallback(async () => {
    setLoading(true);
    try {
      const [blogResponse, projectResponse] = await Promise.all([
        apiRequest<ListResponse<Blog>>("/admin/blogs"),
        apiRequest<ListResponse<Project>>("/admin/projects"),
      ]);
      setBlogs(blogResponse.data);
      setProjects(projectResponse.data);
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load dashboard data.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(fetchOverview);
  }, [fetchOverview]);

  const recentItems = useMemo<RecentItem[]>(() =>
    [
      ...blogs.map((blog) => ({
        id: blog._id,
        title: blog.title,
        kind: "Blog" as const,
        status: blog.status,
        updatedAt: blog.updatedAt,
        href: `/admin/blogs/${blog._id}/edit`,
      })),
      ...projects.map((project) => ({
        id: project._id,
        title: project.name,
        kind: "Project" as const,
        status: project.status,
        updatedAt: project.updatedAt,
        href: "/admin/projects",
      })),
    ]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 6),
  [blogs, projects]);

  const stats = [
    {
      label: "Total Blogs",
      value: blogs.length,
      detail: `${blogs.filter((blog) => blog.status === "published").length} published · ${blogs.filter((blog) => blog.status === "draft").length} drafts`,
    },
    {
      label: "Total Projects",
      value: projects.length,
      detail: `${projects.filter((project) => project.status === "published").length} published · ${projects.filter((project) => project.isFeatured).length} featured`,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-primary">WORKSPACE OVERVIEW</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="mt-2 text-sm text-muted">A live snapshot of your portfolio content.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/blogs/new" className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
            + Create Blog
          </Link>
          <Link href="/admin/projects" className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:border-primary">
            Manage Projects
          </Link>
        </div>
      </section>

      {error && (
        <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          <p>{error}</p>
          <button type="button" onClick={() => void fetchOverview()} className="mt-2 font-semibold underline">Try again</button>
        </div>
      )}

      <section aria-label="Content statistics" className="grid gap-5 sm:grid-cols-2">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-2xl border border-border bg-surface p-6">
            <p className="text-sm font-medium text-muted">{stat.label}</p>
            <p className="mt-3 text-4xl font-bold tracking-tight">{loading ? "—" : stat.value}</p>
            <p className="mt-2 text-sm text-muted">{loading ? "Loading…" : stat.detail}</p>
          </article>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <p className="mt-1 text-sm text-muted">Your latest updated blogs and projects.</p>
          </div>
        </div>
        {loading ? (
          <p className="p-8 text-center text-sm text-muted">Loading recent activity…</p>
        ) : recentItems.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted">No blogs or projects yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {recentItems.map((item) => (
              <li key={`${item.kind}-${item.id}`}>
                <Link href={item.href} className="flex flex-col gap-2 px-6 py-4 transition-colors hover:bg-background/40 sm:flex-row sm:items-center sm:justify-between">
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{item.title}</span>
                    <span className="mt-1 block text-xs text-muted">{item.kind} · {formatDate(item.updatedAt)}</span>
                  </span>
                  <span className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${item.status === "published" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                    {item.status === "published" ? "Published" : "Draft"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
