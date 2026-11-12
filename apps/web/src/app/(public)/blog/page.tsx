
import type { Metadata } from "next";
import Link from "next/link";
import { blogs } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Explore articles about frontend development, React, Next.js, and the journey of learning web development.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      {/* Blog Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-purple-600/10 blur-[120px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px]"
        />

        <div className="container-custom relative z-10 py-24 text-center sm:py-32">
          <span className="mb-5 inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            My Blog
          </span>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Thoughts &{" "}
            <span className="gradient-text">Articles</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-muted sm:text-base">
            Exploring web development, sharing practical insights,
            and documenting my continuous learning journey.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>

            <span aria-hidden="true">/</span>

            <span className="text-primary">Blog</span>
          </div>
        </div>
      </section>

      {/* Blog Listing */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Explore My Writing
              </p>

              <h2 className="text-3xl font-bold sm:text-4xl">
                Latest <span className="gradient-text">Articles</span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
                Articles and thoughts about technologies, development,
                and personal growth.
              </p>
            </div>

            <span className="w-fit rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-medium text-primary">
              {blogs.length} Articles
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((article) => (
              <article
                key={article.slug}
                className="glass-panel group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-purple-500/10"
              >
                {/* Article Visual */}
                <div
                  className={`relative flex aspect-16/10 items-center justify-center overflow-hidden bg-linear-to-br ${article.gradient}`}
                >
                  <div className="absolute inset-0 grid-pattern opacity-40" />

                  <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-white/15 bg-white/5 shadow-2xl backdrop-blur-xl transition-transform duration-500 group-hover:scale-110">
                    <span className="gradient-text text-5xl font-bold">
                      {article.initials}
                    </span>
                  </div>

                  <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-medium text-gray-300 backdrop-blur-md">
                    {article.category}
                  </span>

                  <span className="absolute bottom-5 right-5 font-mono text-sm text-white/40">
                    / {article.number}
                  </span>
                </div>

                {/* Article Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-primary">
                      {article.status === "published"
                        ? "PUBLISHED"
                        : "COMING SOON"}
                    </span>

                    <span className="text-xs text-muted">
                      {article.category}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold leading-snug transition-colors group-hover:text-primary">
                    {article.title}
                  </h3>

                  <p className="mt-3 min-h-20 text-sm leading-7 text-muted">
                    {article.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border bg-white/3 px-2.5 py-1.5 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-border pt-5">
                    {article.status === "published" ? (
                      <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
                      >
                        Read Article
                        <span aria-hidden="true">→</span>
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted">
                        Article in preparation
                        <span aria-hidden="true">↗</span>
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
