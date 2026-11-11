
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, type ProjectCategory } from "@/data/projects";

const categories = [
  "All",
  "Web App",
  "Website",
  "E-commerce",
  "Blog",
] as const;

const PAGE_SIZE = 6;

type ActiveCategory = "All" | ProjectCategory;

export default function ProjectsList() {
  const [activeCategory, setActiveCategory] =
    useState<ActiveCategory>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;

    return projects.filter(
      (project) => project.filterCategory === activeCategory,
    );
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredProjects.length / PAGE_SIZE);

  const visibleProjects = filteredProjects.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function handleCategoryChange(category: ActiveCategory) {
    setActiveCategory(category);
    setCurrentPage(1);
  }

  return (
    <>
      <section className="section-padding relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-purple-600/15 blur-[140px]" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="container-custom relative z-10 grid items-center gap-14 lg:grid-cols-2">
          <div className="max-w-2xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-purple-300">
              <span className="h-2 w-2 rounded-full bg-primary" />
              My Portfolio
            </span>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              My <span className="gradient-text">Projects</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
              A collection of my work, showcasing my technical skills,
              creativity and passion for building meaningful digital
              experiences.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#project-collection"
                className="glow-effect inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-all hover:-translate-y-1 hover:bg-secondary"
              >
                Explore Projects
                <span aria-hidden="true">→</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 font-semibold text-white transition-all hover:border-primary/50 hover:text-primary"
              >
                Hire Me
              </Link>
            </div>
          </div>

          <div
            className="relative mx-auto flex aspect-square w-full max-w-lg items-center justify-center"
            aria-hidden="true"
          >
            <div className="absolute inset-10 rounded-full bg-purple-600/15 blur-[90px]" />
            <div className="absolute h-72 w-72 rounded-full border border-purple-400/10 sm:h-96 sm:w-96" />
            <div className="absolute h-60 w-60 rounded-full border border-purple-400/10 sm:h-80 sm:w-80" />

            <div className="relative w-[85%] -rotate-6 transition-transform duration-700 hover:rotate-0">
              <div className="rounded-2xl border border-purple-300/30 bg-[#111831] p-2 shadow-[0_0_70px_rgba(168,85,247,0.22)] sm:p-3">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-[#080b1c]">
                  <div className="flex h-9 items-center gap-1.5 border-b border-border px-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                    <div className="ml-4 h-3 w-24 rounded-full bg-white/10" />
                  </div>

                  <div className="grid grid-cols-2 gap-6 p-5">
                    <div className="space-y-3">
                      <div className="h-3 w-3/4 rounded bg-purple-400/60" />
                      <div className="h-2 w-full rounded bg-white/10" />
                      <div className="h-2 w-4/5 rounded bg-white/10" />
                      <div className="mt-5 h-16 rounded-lg border border-purple-400/20 bg-purple-500/10" />
                    </div>

                    <div className="space-y-3">
                      <div className="h-20 rounded-lg border border-purple-400/20 bg-gradient-to-br from-purple-500/30 to-transparent" />
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-12 rounded-lg bg-white/5" />
                        <div className="h-12 rounded-lg bg-white/5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-auto h-3 w-[110%] -translate-x-[4.5%] rounded-b-xl bg-gradient-to-b from-[#55516d] to-[#25243b] shadow-xl" />
            </div>

            <div className="absolute right-0 top-12 rounded-xl border border-purple-400/20 bg-[#111831]/90 p-4 shadow-xl backdrop-blur-xl">
              <span className="gradient-text text-2xl font-bold">
                {"</>"}
              </span>
            </div>

            <div className="absolute bottom-12 left-0 rounded-xl border border-purple-400/20 bg-[#111831]/90 px-4 py-3 shadow-xl backdrop-blur-xl">
              <span className="text-xs font-medium text-purple-300">
                Creative Development
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="project-collection"
        className="section-padding relative overflow-hidden pt-0"
      >
        <div className="container-custom">
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Explore My Work
              </p>

              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                Selected <span className="gradient-text">Projects</span>
              </h2>

              <p className="mt-3 text-sm text-muted">
                Browse projects by category and discover what I have built.
              </p>
            </div>

            <span className="w-fit rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted">
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1 ? "Project" : "Projects"}
            </span>
          </div>

          <div className="mb-10 flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleCategoryChange(category)}
                  className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "border-primary bg-primary text-white shadow-lg shadow-purple-500/20"
                      : "border-border bg-surface text-muted hover:border-primary/50 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {visibleProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
              {visibleProjects.map((project) => (
                <article
                  key={project.slug}
                  className="glass-panel group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-purple-500/10"
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    aria-label={`View ${project.name} details`}
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

                  <div className="p-6 sm:p-7">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                      {project.category}
                    </p>

                    <h3 className="text-xl font-bold transition-colors group-hover:text-primary sm:text-2xl">
                      {project.name}
                    </h3>

                    <p className="mt-3 min-h-20 text-sm leading-7 text-muted">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((technology) => (
                        <span
                          key={technology}
                          className="rounded-md border border-border bg-white/[0.03] px-3 py-1.5 text-xs text-gray-300"
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
          ) : (
            <div className="glass-panel rounded-2xl border border-border px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-2xl text-primary">
                ?
              </div>

              <h3 className="mt-5 text-xl font-bold">
                No projects found in this category
              </h3>

              <p className="mt-2 text-sm text-muted">
                Try exploring another category to see available projects.
              </p>

              <button
                type="button"
                onClick={() => handleCategoryChange("All")}
                className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary"
              >
                View All Projects
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <nav
              aria-label="Project pagination"
              className="mt-12 flex flex-wrap items-center justify-center gap-2"
            >
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => page - 1)}
                className="rounded-lg border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                    onClick={() => setCurrentPage(page)}
                    className={`h-10 w-10 rounded-lg border text-sm font-medium transition-all ${
                      currentPage === page
                        ? "border-primary bg-primary text-white"
                        : "border-border text-muted hover:border-primary hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((page) => page + 1)}
                className="rounded-lg border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </nav>
          )}
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-[#15102d] via-[#111831] to-[#0c1025] px-6 py-14 text-center sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-600/20 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-violet-600/15 blur-[100px]" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-300">
                Have an idea?
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Have a project in mind?
                <span className="gradient-text block">
                  Let&apos;s discuss your ideas!
                </span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-muted sm:text-base">
                Have an idea or a project to discuss? Let&apos;s connect and
                explore how we can bring it to life.
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-semibold text-white transition-all hover:-translate-y-1 hover:bg-secondary hover:shadow-lg hover:shadow-purple-500/20"
              >
                Let&apos;s Talk
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
