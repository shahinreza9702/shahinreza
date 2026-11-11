
const articles = [
  {
    number: "01",
    category: "Frontend Development",
    title: "Building Better User Experiences with React",
    description:
      "Exploring component-based architecture, reusable UI, and practical ways to build user-friendly web applications.",
    tags: ["React", "JavaScript"],
    initials: "RE",
    gradient: "from-violet-600/30 via-purple-500/10 to-transparent",
  },
  {
    number: "02",
    category: "Web Development",
    title: "Getting Started with Next.js",
    description:
      "An introduction to modern web development with Next.js, routing, rendering, and project structure.",
    tags: ["Next.js", "TypeScript"],
    initials: "NX",
    gradient: "from-blue-600/30 via-cyan-500/10 to-transparent",
  },
  {
    number: "03",
    category: "Learning & Growth",
    title: "My Journey into Web Development",
    description:
      "Sharing lessons, challenges, and experiences from my journey of learning modern web development.",
    tags: ["Learning", "Career"],
    initials: "DEV",
    gradient: "from-pink-600/30 via-fuchsia-500/10 to-transparent",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="section-padding">
      <div className="container-custom">
        {/* Section Heading */}
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              My Blog
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Latest <span className="gradient-text">Articles</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
              Thoughts, insights, and experiences about web development,
              technology, and continuous learning.
            </p>
          </div>

          <span className="w-fit rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-medium text-primary">
            Articles Coming Soon
          </span>
        </div>

        {/* Blog Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.number}
              className="glass-panel group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-purple-500/10"
            >
              {/* Article Visual */}
              <div
                className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br ${article.gradient}`}
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

              {/* Article Information */}
              <div className="p-5 sm:p-6">
                <span className="text-xs font-semibold text-primary">
                  COMING SOON
                </span>

                <h3 className="mt-3 text-xl font-bold leading-snug transition-colors group-hover:text-primary">
                  {article.title}
                </h3>

                <p className="mt-3 min-h-20 text-sm leading-7 text-muted">
                  {article.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-white/[0.03] px-2.5 py-1.5 text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 border-t border-border pt-5">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted">
                    Article in preparation
                    <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
