
import type { Metadata } from "next";

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
      "Improving development skills by exploring technologies and building real-world projects.",
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
    <main>
      {/* Page Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 top-10 h-80 w-80 rounded-full bg-purple-600/10 blur-[120px]" />

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
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="glass-panel rounded-2xl p-6 sm:p-9">
              <span className="text-sm font-medium text-purple-300">
                My Introduction
              </span>

              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                Hello, I&apos;m Shahin Reza.
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

              <div className="mt-8 border-t border-border pt-6">
                <p className="font-semibold text-foreground">
                  My Philosophy
                </p>

                <p className="mt-2 text-sm leading-7 text-muted">
                  Keep learning, write maintainable code, focus on
                  user experience and improve with every project.
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="flex flex-col gap-4">
              {highlights.map((item) => (
                <article
                  key={item.number}
                  className="glass-panel group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-purple-300 transition-colors group-hover:bg-primary/20">
                      {item.number}
                    </span>

                    <div>
                      <h3 className="text-base font-semibold sm:text-lg">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}

              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <p className="text-sm font-medium text-purple-300">
                  My Motivation
                </p>

                <p className="mt-3 text-sm leading-7 text-muted">
                  Building digital products that make an impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-custom">
          <div className="mb-10 max-w-2xl">
            <span className="text-sm font-medium text-purple-300">
              My Toolkit
            </span>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Technologies I <span className="gradient-text">Work With</span>
            </h2>

            <p className="mt-4 leading-8 text-muted">
              Technologies I have studied and used while building
              web development projects.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-purple-300"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
