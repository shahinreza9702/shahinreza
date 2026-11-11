
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs } from "@/data/blogs";

interface BlogDetailsPageProps {
  params: Promise<{ slug: string }>;
}

function getBlog(slug: string) {
  return blogs.find((blog) => blog.slug === slug);
}

export function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}


export async function generateMetadata({
  params,
}: BlogDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlog(slug);

  if (!blog) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const isPublished = blog.status === "published";

  return {
    title: blog.title,
    description: blog.description,

    alternates: {
      canonical: `/blog/${blog.slug}`,
    },

    robots: {
      index: isPublished,
      follow: true,
    },

    openGraph: {
      type: isPublished ? "article" : "website",
      title: `${blog.title} | Shahin Reza`,
      description: blog.description,
      url: `/blog/${blog.slug}`,
    },

    twitter: {
      card: "summary",
      title: `${blog.title} | Shahin Reza`,
      description: blog.description,
    },
  };
}


export default async function BlogDetailsPage({
  params,
}: BlogDetailsPageProps) {
  const { slug } = await params;
  const blog = getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Blog Header */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-purple-600/10 blur-[120px]"
        />

        <div className="container-custom relative z-10 py-20 sm:py-28">
          {/* Breadcrumb */}
          <div className="mb-10 flex flex-wrap items-center gap-3 text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>

            <span>/</span>

            <Link
              href="/blog"
              className="transition-colors hover:text-primary"
            >
              Blog
            </Link>

            <span>/</span>

            <span className="text-primary">Article</span>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">
                {blog.category}
              </span>

              <span className="rounded-full border border-border bg-white/[0.03] px-4 py-2 text-xs font-medium text-muted">
                {blog.status === "published"
                  ? "PUBLISHED"
                  : "COMING SOON"}
              </span>
            </div>

            <h1 className="mt-7 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              {blog.title}
            </h1>

            <p className="mt-6 max-w-3xl text-sm leading-8 text-muted sm:text-base">
              {blog.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-white/[0.03] px-3 py-2 text-xs text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">
            {/* Article Visual */}
            <div
              className={`relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${blog.gradient}`}
            >
              <div className="absolute inset-0 grid-pattern opacity-40" />

              <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl border border-white/15 bg-white/5 shadow-2xl backdrop-blur-xl sm:h-40 sm:w-40">
                <span className="gradient-text text-5xl font-bold sm:text-6xl">
                  {blog.initials}
                </span>
              </div>

              <span className="absolute bottom-6 right-6 font-mono text-sm text-white/40">
                / {blog.number}
              </span>
            </div>

            {/* Coming Soon Content */}
            {blog.status === "coming-soon" ? (
              <div className="glass-panel mt-10 rounded-2xl p-8 text-center sm:p-12">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-2xl text-primary">
                  ✦
                </span>

                <h2 className="mt-6 text-2xl font-bold sm:text-3xl">
                  Article <span className="gradient-text">Coming Soon</span>
                </h2>

                <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted">
                  This article is currently in preparation.
                  Check back later for the complete article.
                </p>

                <Link
                  href="/blog"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20"
                >
                  <span aria-hidden="true">←</span>
                  Back to Blog
                </Link>
              </div>
            ) : (
              <div className="glass-panel mt-10 rounded-2xl p-8 sm:p-12">
                <h2 className="text-2xl font-bold">
                  Article Content
                </h2>

                <p className="mt-4 text-sm leading-7 text-muted">
                  The article content will be available here.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
