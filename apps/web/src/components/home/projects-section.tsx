
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
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

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="glass-panel group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-purple-500/10"
            >
              <Link
                href={`/projects/${project.slug}`}
                aria-label={`View ${project.name} project details`}
                className="block"
              >
                <div
                  className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${project.accent}`}
                >
                  <Image
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#080b1c]/70 via-transparent to-transparent" />

                  <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-medium text-gray-200 backdrop-blur-md">
                    {project.status}
                  </span>

                  <span className="absolute bottom-5 right-5 font-mono text-sm text-white/80">
                    / {project.number}
                  </span>
                </div>
              </Link>

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

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md border border-border bg-white/[0.03] px-2.5 py-1.5 text-xs text-gray-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

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
