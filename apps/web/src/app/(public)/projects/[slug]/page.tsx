
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Project {
  number: string;
  name: string;
  category: string;
  description: string;
  overview: string;
  technologies: string[];
  slug: string;
  initials: string;
  status: string;
  accent: string;
  features: string[];
  focus: string;
}

const projects: Project[] = [
  {
    number: "01",
    name: "Kindora",
    category: "Social Development Platform",
    description:
      "A community-driven platform designed to help people create, discover, join, and track social development events in their local communities.",
    overview:
      "Kindora is a social development platform concept focused on connecting people with community activities. It aims to make discovering and participating in local social development events easier through a modern digital experience.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Express.js",
      "MongoDB",
    ],
    slug: "kindora",
    initials: "K",
    status: "Featured Project",
    accent: "from-violet-500/25 via-purple-500/10 to-transparent",
    features: [
      "Community-focused event discovery",
      "Event creation and participation",
      "Tracking social development activities",
      "Modern responsive interface",
    ],
    focus:
      "Building a community-driven experience with a modern frontend and a scalable backend architecture.",
  },
  {
    number: "02",
    name: "TheInfotik",
    category: "News & Media Platform",
    description:
      "A modern news platform concept focused on presenting news articles, categories, and editorial content through a clean reading experience.",
    overview:
      "TheInfotik is a news and media platform designed to organize and present editorial content. The project focuses on a clean reading experience, structured news categories, and a modern content presentation system.",
    technologies: [
      "Next.js",
      "React",
      "Express.js",
      "MongoDB",
    ],
    slug: "theinfotik",
    initials: "T",
    status: "Personal Project",
    accent: "from-cyan-500/20 via-blue-500/10 to-transparent",
    features: [
      "News article presentation",
      "Category-based content organization",
      "Editorial content structure",
      "Responsive reading experience",
    ],
    focus:
      "Creating a structured news platform with a user-friendly reading experience and content management architecture.",
  },
  {
    number: "03",
    name: "Dev Stack Explorer",
    category: "Technology Explorer",
    description:
      "An interactive application that allows users to explore technologies across different categories and build their preferred development stack.",
    overview:
      "Dev Stack Explorer is an interactive technology exploration application. It helps users browse different development technologies and select their preferred tools to create a personalized development stack.",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
    ],
    slug: "dev-stack-explorer",
    initials: "D",
    status: "Personal Project",
    accent: "from-pink-500/20 via-fuchsia-500/10 to-transparent",
    features: [
      "Technology exploration by category",
      "Interactive technology selection",
      "Personalized development stack",
      "Responsive user interface",
    ],
    focus:
      "Building an interactive React application with reusable components, TypeScript, and a category-based selection experience.",
  },
];

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.name,
    description: project.description,
  };
}

export default async function ProjectDetailsPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex(
    (item) => item.slug === project.slug,
  );

  const previousProject =
    currentIndex > 0 ? projects[currentIndex - 1] : null;

  const nextProject =
    currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : null;

  return (
    <main className="min-h-screen">
      {/* Project Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-purple-600/15 blur-[140px]" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <div className="mb-10 flex flex-wrap items-center gap-2 text-sm text-muted">
            <Link
              href="/"
              className="transition-colors hover:text-primary"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/projects"
              className="transition-colors hover:text-primary"
            >
              Projects
            </Link>

            <span>/</span>

            <span className="text-white">{project.name}</span>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="max-w-2xl">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-purple-300">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {project.status}
              </span>

              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {project.category}
              </p>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {project.name}
                <span className="gradient-text">.</span>
              </h1>

              <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
                {project.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="glow-effect inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-all hover:-translate-y-1 hover:bg-secondary"
                >
                  Discuss a Project
                  <span aria-hidden="true">→</span>
                </Link>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 font-semibold text-white transition-all hover:border-primary/50 hover:text-primary"
                >
                  All Projects
                </Link>
              </div>
            </div>

            {/* Project Visual */}
            <div
              className={`relative flex aspect-[16/11] items-center justify-center overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br ${project.accent}`}
            >
              <div className="absolute inset-0 grid-pattern opacity-40" />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.18),transparent_65%)]" />

              <div className="relative flex h-40 w-40 items-center justify-center rounded-[2rem] border border-white/15 bg-white/5 shadow-2xl backdrop-blur-xl transition-transform duration-500 hover:scale-110 sm:h-52 sm:w-52">
                <span className="gradient-text text-8xl font-bold sm:text-9xl">
                  {project.initials}
                </span>
              </div>

              <span className="absolute bottom-6 right-6 font-mono text-sm text-white/50">
                PROJECT / {project.number}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="section-padding relative pt-0">
        <div className="container-custom">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div className="glass-panel rounded-2xl p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                About the Project
              </p>

              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                Project <span className="gradient-text">Overview</span>
              </h2>

              <p className="mt-6 text-sm leading-8 text-muted sm:text-base">
                {project.overview}
              </p>

              <div className="mt-8 border-t border-border pt-6">
                <p className="text-sm font-semibold text-white">
                  Project Focus
                </p>

                <p className="mt-3 text-sm leading-7 text-muted">
                  {project.focus}
                </p>
              </div>
            </div>

            {/* Project Information */}
            <aside className="glass-panel rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold">
                Project <span className="gradient-text">Information</span>
              </h2>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Project Name
                  </p>
                  <p className="mt-2 font-semibold text-white">
                    {project.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Category
                  </p>
                  <p className="mt-2 font-semibold text-white">
                    {project.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Status
                  </p>
                  <p className="mt-2 font-semibold text-white">
                    {project.status}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Project Number
                  </p>
                  <p className="mt-2 font-semibold text-white">
                    {project.number}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Project Features */}
      <section className="section-padding relative pt-0">
        <div className="container-custom">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              What It Offers
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Project <span className="gradient-text">Highlights</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              The main concepts and areas this project focuses on.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {project.features.map((feature, index) => (
              <div
                key={feature}
                className="glass-panel group flex items-start gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 font-mono text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="pt-2 text-sm font-medium leading-7 text-gray-200">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="section-padding relative pt-0">
        <div className="container-custom">
          <div className="glass-panel rounded-3xl p-6 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Built With
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Technologies <span className="gradient-text">Used</span>
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted">
              Technologies associated with this project.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-xl border border-border bg-white/[0.03] px-5 py-3 text-sm font-medium text-gray-200 transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-white"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Previous and Next Projects */}
      <section className="section-padding relative pt-0">
        <div className="container-custom">
          <div className="flex flex-col justify-between gap-5 border-t border-border pt-8 sm:flex-row">
            {previousProject ? (
              <Link
                href={`/projects/${previousProject.slug}`}
                className="group max-w-sm"
              >
                <span className="text-xs uppercase tracking-wider text-muted">
                  ← Previous Project
                </span>

                <p className="mt-2 text-lg font-semibold text-white transition-colors group-hover:text-primary">
                  {previousProject.name}
                </p>
              </Link>
            ) : (
              <div />
            )}

            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group max-w-sm text-left sm:text-right"
              >
                <span className="text-xs uppercase tracking-wider text-muted">
                  Next Project →
                </span>

                <p className="mt-2 text-lg font-semibold text-white transition-colors group-hover:text-primary">
                  {nextProject.name}
                </p>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
