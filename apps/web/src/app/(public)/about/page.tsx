
import type { Metadata } from "next";
import Image from "next/image";

const highlights = [
  {
    number: "01",
    title: "Frontend Development",
    description:
      "Building responsive, accessible and user-friendly web interfaces with modern frontend technologies.",
  },
  {
    number: "02",
    title: "Modern Web Technologies",
    description:
      "Working with React, Next.js, TypeScript and Tailwind CSS to create maintainable applications.",
  },
  {
    number: "03",
    title: "Practical Learning",
    description:
      "Improving development skills by exploring technologies and building practical projects.",
  },
];

const technologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
];

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn more about Shahin Reza, his web development journey, technical interests and approach to building digital products.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-purple-600/15 blur-[140px]" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-purple-300">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Get to know me
            </span>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              About <span className="gradient-text">Me</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              A closer look at my journey, interests and passion
              for building modern digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding relative overflow-hidden pt-0">
        <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-violet-600/10 blur-[130px]" />

        <div className="container-custom relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Introduction Content */}
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                My Introduction
              </span>

              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                Hello, I&apos;m Shahin Reza.
                <br />
                <span className="gradient-text">
                  Web Developer.
                </span>
              </h2>

              <div className="mt-6 space-y-5 text-sm leading-8 text-muted sm:text-base">
                <p>
                  I&apos;m a Web Developer passionate about creating
                  modern, responsive and meaningful digital experiences.
                </p>

                <p>
                  My journey started with the fundamentals of HTML,
                  CSS and JavaScript. Over time, I expanded my knowledge
                  through TypeScript, React, Next.js and Tailwind CSS.
                </p>

                <p>
                  I enjoy transforming ideas into functional user
                  interfaces, exploring modern technologies and solving
                  development challenges through practical projects.
                </p>

                <p>
                  I believe consistent learning, thoughtful development
                  and attention to user experience are essential to
                  creating useful digital products.
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <p className="text-sm font-semibold text-purple-300">
                  My Philosophy
                </p>

                <p className="mt-3 text-sm leading-7 text-muted">
                  Keep learning, write maintainable code, focus on
                  user experience and improve with every project.
                </p>
              </div>
            </div>

            {/* Profile Image */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/30 via-violet-600/10 to-transparent blur-2xl" />

              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-primary/30 bg-surface">
                <Image
                  src="/assets/images/shahin-reza.png"
                  alt="Shahin Reza"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#080b1c]/80 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-2xl font-bold text-white">
                    Shahin Reza
                  </p>

                  <p className="mt-1 text-sm text-purple-300">
                    Web Developer
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-4 rounded-2xl border border-primary/30 bg-[#111831] px-5 py-4 shadow-xl sm:-right-8">
                <p className="text-xs uppercase tracking-wider text-muted">
                  My Motivation
                </p>

                <p className="mt-2 text-sm font-semibold text-white">
                  Building digital products
                  <br />
                  that make an impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-custom">
          <div className="mb-10 max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              What I Focus On
            </span>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              My Development{" "}
              <span className="gradient-text">Approach</span>
            </h2>

            <p className="mt-4 leading-8 text-muted">
              The areas I focus on while learning, building and
              improving my development skills.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {highlights.map((item) => (
              <article
                key={item.number}
                className="glass-panel group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 font-mono text-sm font-bold text-purple-300 transition-colors group-hover:bg-primary group-hover:text-white">
                  {item.number}
                </span>

                <h3 className="mt-6 text-lg font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted">
                  {item.description}
                </p>

                <div className="mt-6 h-1 w-12 rounded-full bg-primary/50 transition-all duration-300 group-hover:w-20 group-hover:bg-primary" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="section-padding relative overflow-hidden pt-0">
        <div className="container-custom">
          <div className="glass-panel rounded-3xl p-6 sm:p-10">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              My Toolkit
            </span>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Technologies I{" "}
              <span className="gradient-text">Work With</span>
            </h2>

            <p className="mt-4 max-w-2xl leading-8 text-muted">
              Technologies I have studied and used while building
              web development projects.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-xl border border-border bg-white/[0.03] px-5 py-3 text-sm font-medium text-gray-200 transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-purple-300"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
