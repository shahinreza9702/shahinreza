
"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ApiRequestError, apiRequest } from "@/lib/api";

interface Blog {
    _id: string;
    title: string;
    slug: string;
    category: string;
    description: string;
    coverImage?: string;
    tags: string[];
    status: "draft" | "published";
    publishedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

interface AdminBlogsResponse {
    success: boolean;
    results: number;
    data: Blog[];
}

type StatusFilter = "all" | "published" | "draft";

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] =
        useState<StatusFilter>("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchBlogs = useCallback(async () => {
        try {
            const response =
                await apiRequest<AdminBlogsResponse>("/admin/blogs");

            setBlogs(response.data);
            setError("");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to load blog posts.",
            );
        } finally {
            setLoading(false);
        }
    }, []);
    
    useEffect(() => {
        void fetchBlogs();
    }, [fetchBlogs]);


    const filteredBlogs = useMemo(() => {
        const query = search.trim().toLowerCase();

        return blogs.filter((blog) => {
            const matchesSearch =
                !query ||
                blog.title.toLowerCase().includes(query) ||
                blog.slug.toLowerCase().includes(query) ||
                blog.category.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "all" ||
                blog.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [blogs, search, statusFilter]);

    const publishedCount = blogs.filter(
        (blog) => blog.status === "published",
    ).length;

    const draftCount = blogs.filter(
        (blog) => blog.status === "draft",
    ).length;

    const handleDelete = async (blog: Blog) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${blog.title}"? This action cannot be undone.`,
        );

        if (!confirmed) return;

        try {
            setDeletingId(blog._id);
            setError("");

            await apiRequest(`/admin/blogs/${blog._id}`, {
                method: "DELETE",
            });

            setBlogs((current) =>
                current.filter((item) => item._id !== blog._id),
            );
        } catch (err) {
            setError(
                err instanceof ApiRequestError
                    ? err.message
                    : "Unable to delete this blog.",
            );
        } finally {
            setDeletingId(null);
        }
    };

    const formatDate = (date: string) => {
        return new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }).format(new Date(date));
    };

    return (
        <div className="mx-auto max-w-6xl space-y-8">

            {/* Page Header */}
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                    <p className="text-sm font-medium text-primary">
                        CONTENT MANAGEMENT
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight">
                        Manage Blogs
                    </h1>

                    <p className="mt-2 text-sm text-muted">
                        Create, edit, publish and manage your blog posts.
                    </p>
                </div>

                <Link
                    href="/admin/blogs/new"
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                    + Create New Blog
                </Link>
            </section>

            {/* Statistics */}
            <section className="grid gap-4 sm:grid-cols-3">
                {[
                    { label: "Total Blogs", value: blogs.length },
                    { label: "Published", value: publishedCount },
                    { label: "Drafts", value: draftCount },
                ].map((item) => (
                    <article
                        key={item.label}
                        className="rounded-xl border border-border bg-surface p-5"
                    >
                        <p className="text-sm text-muted">{item.label}</p>
                        <p className="mt-2 text-3xl font-bold tabular-nums">
                            {loading ? "—" : item.value}
                        </p>
                    </article>
                ))}
            </section>

            {/* Blog List */}
            <section className="rounded-2xl border border-border bg-surface">

                <div className="flex flex-col gap-4 border-b border-border p-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">
                            All Blog Posts
                        </h2>
                        <p className="mt-1 text-sm text-muted">
                            {loading
                                ? "Loading blog posts..."
                                : `${filteredBlogs.length} blog posts found`}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search blogs..."
                            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary sm:w-64"
                        />

                        <select
                            value={statusFilter}
                            onChange={(event) =>
                                setStatusFilter(event.target.value as StatusFilter)
                            }
                            className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                        >
                            <option value="all">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                </div>

                {error && (
                    <div
                        role="alert"
                        className="m-5 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400"
                    >
                        <p>{error}</p>

                        <button
                            type="button"
                            onClick={() => {
                                setLoading(true);
                                setError("");
                                void fetchBlogs();
                            }}
                            className="mt-2 font-semibold underline"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {loading ? (
                    <div className="p-12 text-center text-sm text-muted">
                        Loading blog posts...
                    </div>
                ) : filteredBlogs.length === 0 ? (
                    <div className="p-12 text-center">
                        <h3 className="text-lg font-semibold">
                            {blogs.length === 0
                                ? "No blogs yet"
                                : "No matching blogs found"}
                        </h3>

                        <p className="mt-2 text-sm text-muted">
                            {blogs.length === 0
                                ? "Create your first blog post to get started."
                                : "Try changing your search or status filter."}
                        </p>

                        {blogs.length === 0 && (
                            <Link
                                href="/admin/blogs/new"
                                className="mt-5 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
                            >
                                Create Your First Blog
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[750px] text-left">
                            <thead className="border-b border-border bg-background/50">
                                <tr className="text-xs uppercase tracking-wider text-muted">
                                    <th className="px-5 py-4 font-semibold">Blog</th>
                                    <th className="px-5 py-4 font-semibold">Category</th>
                                    <th className="px-5 py-4 font-semibold">Status</th>
                                    <th className="px-5 py-4 font-semibold">Last Updated</th>
                                    <th className="px-5 py-4 text-right font-semibold">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border">
                                {filteredBlogs.map((blog) => (
                                    <tr
                                        key={blog._id}
                                        className="transition-colors hover:bg-background/40"
                                    >
                                        <td className="max-w-sm px-5 py-4">
                                            <p className="truncate font-semibold">
                                                {blog.title}
                                            </p>
                                            <p className="mt-1 truncate text-xs text-muted">
                                                /{blog.slug}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-muted">
                                            {blog.category}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${blog.status === "published"
                                                    ? "bg-emerald-500/10 text-emerald-400"
                                                    : "bg-amber-500/10 text-amber-400"
                                                    }`}
                                            >
                                                {blog.status === "published"
                                                    ? "Published"
                                                    : "Draft"}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-muted">
                                            {formatDate(blog.updatedAt)}
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-4">
                                                <Link
                                                    href={`/admin/blogs/${blog._id}/edit`}
                                                    className="text-sm font-medium text-primary hover:text-white"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    type="button"
                                                    disabled={deletingId === blog._id}
                                                    onClick={() => void handleDelete(blog)}
                                                    className="text-sm font-medium text-red-400 transition-colors hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    {deletingId === blog._id
                                                        ? "Deleting..."
                                                        : "Delete"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}
