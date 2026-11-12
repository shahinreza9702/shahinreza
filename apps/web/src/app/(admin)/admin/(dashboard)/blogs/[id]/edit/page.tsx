
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import BlogForm, {
  type BlogFormData,
} from "@/components/admin/blog-form";
import { ApiRequestError, apiRequest } from "@/lib/api";

interface BlogResponse {
  success: boolean;
  data: BlogFormData;
}

export default function EditBlogPage() {
  const params = useParams<{ id: string }>();
  const blogId = params.id;

  const [blog, setBlog] = useState<BlogFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlog = useCallback(async () => {
    try {
      const response = await apiRequest<BlogResponse>(
        `/admin/blogs/${blogId}`,
      );

      setBlog(response.data);
      setError("");
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Unable to load blog.",
      );
    } finally {
      setLoading(false);
    }
  }, [blogId]);

  useEffect(() => {
    void fetchBlog();
  }, [fetchBlog]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-muted">Loading blog...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 py-16 text-center">
        <h1 className="text-xl font-semibold">
          Unable to load blog
        </h1>

        <p className="text-sm text-red-400">
          {error || "Blog not found."}
        </p>

        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              setError("");
              void fetchBlog();
            }}
            className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Try Again
          </button>

          <Link
            href="/admin/blogs"
            className="rounded-lg border border-border px-5 py-3 text-sm font-semibold"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return <BlogForm mode="edit" initialBlog={blog} />;
}
