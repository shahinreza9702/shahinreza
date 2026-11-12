
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ApiRequestError, apiRequest } from "@/lib/api";

type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; headingLevel: 2 | 3 }
  | { type: "image"; url: string; alt: string; caption?: string }
  | { type: "list"; listStyle: "ordered" | "unordered"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; text: string; language?: string };

interface BlogPayload {
  title: string;
  slug: string;
  category: string;
  description: string;
  content: ContentBlock[];
  coverImage?: string;
  tags: string[];
  status: "draft" | "published";
  seo: {
    title?: string;
    description?: string;
    image?: string;
  };
}

interface CreateBlogResponse {
  success: boolean;
  message: string;
  data: { _id: string };
}

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary";

const labelClass = "mb-2 block text-sm font-medium";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default function CreateBlogPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState<ContentBlock[]>([]);

  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoImage, setSeoImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateBlock = (
    index: number,
    updated: ContentBlock,
  ) => {
    setContent((current) =>
      current.map((block, i) => (i === index ? updated : block)),
    );
  };

  const addBlock = (type: ContentBlock["type"]) => {
    const defaults: Record<ContentBlock["type"], ContentBlock> = {
      paragraph: { type: "paragraph", text: "" },
      heading: { type: "heading", text: "", headingLevel: 2 },
      image: { type: "image", url: "", alt: "", caption: "" },
      list: { type: "list", listStyle: "unordered", items: [""] },
      quote: { type: "quote", text: "" },
      code: { type: "code", text: "", language: "" },
    };

    setContent((current) => [...current, defaults[type]]);
  };

  const removeBlock = (index: number) => {
    setContent((current) =>
      current.filter((_, i) => i !== index),
    );
  };

  const handleSubmit = async (
    status: "draft" | "published",
  ) => {
    setError("");
    setSuccess("");

    if (!title.trim() || !slug.trim() || !category.trim() || !description.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      setError("Slug must contain lowercase letters, numbers and hyphens only.");
      return;
    }

    if (content.some((block) => {
      if (block.type === "paragraph" || block.type === "heading" || block.type === "quote") {
        return !block.text.trim();
      }
      if (block.type === "image") {
        return !block.url.trim() || !block.alt.trim();
      }
      if (block.type === "list") {
        return block.items.length === 0 || block.items.some((item) => !item.trim());
      }
      return false;
    })) {
      setError("Please complete or remove every empty content block.");
      return;
    }

    const payload: BlogPayload = {
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim(),
      description: description.trim(),
      content: content.map((block) => {
        if (block.type === "list") {
          return {
            ...block,
            items: block.items.map((item) => item.trim()),
          };
        }
        return block;
      }),
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      status,
      seo: {
        ...(seoTitle.trim() && { title: seoTitle.trim() }),
        ...(seoDescription.trim() && { description: seoDescription.trim() }),
        ...(seoImage.trim() && { image: seoImage.trim() }),
      },
      ...(coverImage.trim() && { coverImage: coverImage.trim() }),
    };

    try {
      setLoading(true);

      const response = await apiRequest<CreateBlogResponse>(
        "/admin/blogs",
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
      );

      setSuccess(response.message || "Blog created successfully.");
      router.push("/admin/blogs");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Unable to create blog.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      <section>
        <Link
          href="/admin/blogs"
          className="text-sm text-muted transition-colors hover:text-primary"
        >
          ← Back to Blogs
        </Link>

        <p className="mt-6 text-sm font-medium text-primary">
          CONTENT MANAGEMENT
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Create New Blog
        </h1>

        <p className="mt-2 text-sm text-muted">
          Write and publish a new article on your portfolio.
        </p>
      </section>

      {error && (
        <div role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div role="status" className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-400">
          {success}
        </div>
      )}

      <form
        onSubmit={(event) => event.preventDefault()}
        className="space-y-7"
      >

        {/* Basic Information */}
        <section className="space-y-5 rounded-2xl border border-border bg-surface p-6">
          <div>
            <h2 className="text-lg font-semibold">Basic Information</h2>
            <p className="mt-1 text-sm text-muted">
              Add the main details of your article.
            </p>
          </div>

          <div>
            <label className={labelClass}>Blog Title *</label>
            <input
              value={title}
              onChange={(event) => {
                const value = event.target.value;
                setTitle(value);

                if (!slugManuallyEdited) {
                  setSlug(slugify(value));
                }
              }}
              maxLength={160}
              required
              placeholder="Enter blog title"
              className={inputClass}
            />
            <p className="mt-1 text-right text-xs text-muted">
              {title.length}/160
            </p>
          </div>

          <div>
            <label className={labelClass}>Slug *</label>
            <input
              value={slug}
              onChange={(event) => {
                setSlugManuallyEdited(true);
                setSlug(slugify(event.target.value));
              }}
              maxLength={160}
              required
              placeholder="blog-url-slug"
              className={inputClass}
            />
            <p className="mt-1 text-xs text-muted">
              URL: /blog/{slug || "your-blog-slug"}
            </p>
          </div>

          <div>
            <label className={labelClass}>Category *</label>
            <input
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              maxLength={80}
              required
              placeholder="e.g. Web Development"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Description *</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              maxLength={320}
              minLength={10}
              required
              rows={4}
              placeholder="Write a short description..."
              className={inputClass}
            />
            <p className="mt-1 text-right text-xs text-muted">
              {description.length}/320
            </p>
          </div>

          <div>
            <label className={labelClass}>Cover Image URL</label>
            <input
              type="url"
              value={coverImage}
              onChange={(event) => setCoverImage(event.target.value)}
              placeholder="https://example.com/image.jpg"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Tags</label>
            <input
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="React, Next.js, JavaScript"
              className={inputClass}
            />
            <p className="mt-1 text-xs text-muted">
              Separate tags with commas.
            </p>
          </div>
        </section>

        {/* Content Editor */}
        <section className="space-y-5 rounded-2xl border border-border bg-surface p-6">
          <div>
            <h2 className="text-lg font-semibold">Blog Content</h2>
            <p className="mt-1 text-sm text-muted">
              Build your article using different content blocks.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(
              ["paragraph", "heading", "image", "list", "quote", "code"] as const
            ).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => addBlock(type)}
                className="rounded-lg border border-border px-3 py-2 text-xs font-medium capitalize text-muted transition-colors hover:border-primary hover:text-primary"
              >
                + {type}
              </button>
            ))}
          </div>

          {content.length === 0 && (
            <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted">
              No content blocks yet. Add your first block above.
            </div>
          )}

          <div className="space-y-4">
            {content.map((block, index) => (
              <article
                key={index}
                className="space-y-4 rounded-xl border border-border bg-background p-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold capitalize">
                    {index + 1}. {block.type}
                  </h3>

                  <button
                    type="button"
                    onClick={() => removeBlock(index)}
                    className="text-xs font-medium text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>

                {(block.type === "paragraph" ||
                  block.type === "quote" ||
                  block.type === "code") && (
                  <>
                    <textarea
                      rows={block.type === "code" ? 6 : 4}
                      value={block.text}
                      onChange={(event) =>
                        updateBlock(index, {
                          ...block,
                          text: event.target.value,
                        })
                      }
                      placeholder={`Write ${block.type} content...`}
                      className={inputClass}
                    />

                    {block.type === "code" && (
                      <input
                        value={block.language || ""}
                        onChange={(event) =>
                          updateBlock(index, {
                            ...block,
                            language: event.target.value,
                          })
                        }
                        placeholder="Language (e.g. typescript)"
                        className={inputClass}
                      />
                    )}
                  </>
                )}

                {block.type === "heading" && (
                  <>
                    <select
                      value={block.headingLevel}
                      onChange={(event) =>
                        updateBlock(index, {
                          ...block,
                          headingLevel: Number(event.target.value) as 2 | 3,
                        })
                      }
                      className={inputClass}
                    >
                      <option value={2}>Heading 2</option>
                      <option value={3}>Heading 3</option>
                    </select>

                    <input
                      value={block.text}
                      onChange={(event) =>
                        updateBlock(index, {
                          ...block,
                          text: event.target.value,
                        })
                      }
                      placeholder="Enter heading"
                      className={inputClass}
                    />
                  </>
                )}

                {block.type === "image" && (
                  <>
                    <input
                      type="url"
                      value={block.url}
                      onChange={(event) =>
                        updateBlock(index, {
                          ...block,
                          url: event.target.value,
                        })
                      }
                      placeholder="Image URL"
                      className={inputClass}
                    />

                    <input
                      value={block.alt}
                      onChange={(event) =>
                        updateBlock(index, {
                          ...block,
                          alt: event.target.value,
                        })
                      }
                      placeholder="Image alt text"
                      className={inputClass}
                    />

                    <input
                      value={block.caption || ""}
                      onChange={(event) =>
                        updateBlock(index, {
                          ...block,
                          caption: event.target.value,
                        })
                      }
                      placeholder="Image caption (optional)"
                      className={inputClass}
                    />
                  </>
                )}

                {block.type === "list" && (
                  <>
                    <select
                      value={block.listStyle}
                      onChange={(event) =>
                        updateBlock(index, {
                          ...block,
                          listStyle: event.target.value as "ordered" | "unordered",
                        })
                      }
                      className={inputClass}
                    >
                      <option value="unordered">Unordered List</option>
                      <option value="ordered">Ordered List</option>
                    </select>

                    {block.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex gap-2">
                        <input
                          value={item}
                          onChange={(event) =>
                            updateBlock(index, {
                              ...block,
                              items: block.items.map((value, i) =>
                                i === itemIndex ? event.target.value : value,
                              ),
                            })
                          }
                          placeholder={`List item ${itemIndex + 1}`}
                          className={inputClass}
                        />

                        <button
                          type="button"
                          disabled={block.items.length === 1}
                          onClick={() =>
                            updateBlock(index, {
                              ...block,
                              items: block.items.filter((_, i) => i !== itemIndex),
                            })
                          }
                          className="px-2 text-red-400 disabled:opacity-30"
                        >
                          ×
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() =>
                        updateBlock(index, {
                          ...block,
                          items: [...block.items, ""],
                        })
                      }
                      className="text-xs font-semibold text-primary hover:text-white"
                    >
                      + Add List Item
                    </button>
                  </>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* SEO */}
        <section className="space-y-5 rounded-2xl border border-border bg-surface p-6">
          <div>
            <h2 className="text-lg font-semibold">SEO Settings</h2>
            <p className="mt-1 text-sm text-muted">
              Optional metadata for search engines and social sharing.
            </p>
          </div>

          <div>
            <label className={labelClass}>SEO Title</label>
            <input
              value={seoTitle}
              onChange={(event) => setSeoTitle(event.target.value)}
              maxLength={160}
              placeholder="SEO title"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>SEO Description</label>
            <textarea
              value={seoDescription}
              onChange={(event) => setSeoDescription(event.target.value)}
              maxLength={320}
              rows={3}
              placeholder="SEO description"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>SEO Image URL</label>
            <input
              type="url"
              value={seoImage}
              onChange={(event) => setSeoImage(event.target.value)}
              placeholder="https://example.com/seo-image.jpg"
              className={inputClass}
            />
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col-reverse justify-end gap-3 border-t border-border pt-6 sm:flex-row">
          <Link
            href="/admin/blogs"
            className="rounded-lg border border-border px-5 py-3 text-center text-sm font-semibold text-muted transition-colors hover:bg-surface"
          >
            Cancel
          </Link>

          <button
            type="button"
            disabled={loading}
            onClick={() => void handleSubmit("draft")}
            className="rounded-lg border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-surface disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save as Draft"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => void handleSubmit("published")}
            className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
          >
            {loading ? "Processing..." : "Publish Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}
