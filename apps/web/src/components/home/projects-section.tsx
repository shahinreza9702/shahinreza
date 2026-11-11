
import Link from "next/link";

const projects = [
  {
    number: "01",
    name: "Kindora",
    category: "Social Development Platform",
    description:
      "A community-driven platform designed to help people create, discover, join, and track social development events in their local communities.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Express.js", "MongoDB"],
    slug: "kindora",
    accent: "from-violet-500/20 via-purple-500/10 to-transparent",
    initials: "K",
    status: "Featured Project",
  },
  {
    number: "02",
    name: "TheInfotik",
    category: "News & Media Platform",
    description:
      "A modern news platform concept focused on presenting news articles, categories, and editorial content through a clean reading experience.",
    technologies: ["Next.js", "React", "Express.js", "MongoDB"],
    slug: "theinfotik",
    accent: "from-cyan-500/20 via-blue-500/10 to-transparent",
    initials: "T",
    status: "Personal Project",
  },
  {
    number: "03",
    name: "Dev Stack Explorer",
    category: "Technology Explorer",
    description:
      "An interactive application that allows users to explore technologies across different categories and build their preferred development stack.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "DaisyUI"],
    slug: "dev-stack-explorer",
    accent: "from-pink-500/20 via-fuchsia-500/10 to-transparent",
    initials: "D",
    status: "Personal Project",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        {/* Section Heading */}
        <div className="mb-14 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              My Work
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Featured <span className="gradient-text">Projects</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
              A selection of projects that reflect my development journey,
              technical interests, and problem-solving approach.
            </p>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-white"
          >
            View All Projects
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Project Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="glass-panel group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-purple-500/10"
            >
              {/* Project Visual */}
              <div
                className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br ${project.accent}`}
              >
                <div className="absolute inset-0 grid-pattern opacity-40" />

                <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-white/15 bg-white/5 shadow-2xl backdrop-blur-xl transition-transform duration-500 group-hover:scale-110 sm:h-32 sm:w-32">
                  <span className="gradient-text text-6xl font-bold">
                    {project.initials}
                  </span>
                </div>

                <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-medium text-gray-300 backdrop-blur-md">
                  {project.status}
                </span>

                <span className="absolute bottom-5 right-5 font-mono text-sm text-white/40">
                  / {project.number}
                </span>
              </div>

              {/* Project Information */}
              <div className="p-5 sm:p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  {project.category}
                </p>

                <h3 className="text-xl font-bold transition-colors group-hover:text-primary">
                  {project.name}
                </h3>

                <p className="mt-3 min-h-20 text-sm leading-7 text-muted">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md border border-border bg-white/[0.03] px-2.5 py-1.5 text-xs text-gray-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                {/* Details Link */}
                <div className="mt-6 border-t border-border pt-5">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-primary"
                  >
                    View Details
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
