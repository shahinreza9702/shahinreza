
const highlights = [
  {
    number: "01",
    title: "Frontend Development",
    description:
      "Building modern, responsive and user-friendly web interfaces.",
  },
  {
    number: "02",
    title: "Modern Technologies",
    description:
      "Working with React, Next.js, TypeScript and modern frontend tools.",
  },
  {
    number: "03",
    title: "Continuous Learning",
    description:
      "Exploring new technologies and improving development skills through practical projects.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="container-custom relative z-10">
        {/* Section Heading */}
        <div className="mb-14 max-w-2xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-purple-300">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Get to know me
          </span>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            About <span className="gradient-text">Me</span>
          </h2>

          <p className="mt-5 leading-8 text-muted">
            A little introduction about my journey, interests and approach
            to web development.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Introduction */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-semibold sm:text-2xl">
              Hello, I&apos;m Shahin Reza.
            </h3>

            <div className="mt-6 space-y-5 text-sm leading-8 text-muted sm:text-base">
              <p>
                I&apos;m a Web Developer passionate about building modern,
                responsive and meaningful digital experiences.
              </p>

              <p>
                My journey into web development started with the
                fundamentals of HTML, CSS and JavaScript. Since then,
                I&apos;ve expanded my knowledge through React, Next.js,
                TypeScript and Tailwind CSS.
              </p>

              <p>
                I enjoy transforming ideas into functional user
                interfaces, exploring modern web technologies and
                solving development challenges through practical work.
              </p>

              <p>
                My goal is to keep growing as a developer, contribute
                to meaningful projects and create digital products
                that deliver a useful experience.
              </p>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <p className="text-sm font-medium text-foreground">
                My approach
              </p>
              <p className="mt-2 text-sm leading-7 text-muted">
                Keep learning, write maintainable code, focus on user
                experience and improve with every project.
              </p>
            </div>
          </div>

          {/* Highlights */}
          <div className="flex flex-col gap-4">
            {highlights.map((item) => (
              <div
                key={item.number}
                className="glass-panel group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-purple-300 transition-colors group-hover:bg-primary/20">
                    {item.number}
                  </span>

                  <div>
                    <h3 className="text-base font-semibold text-foreground sm:text-lg">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-sm font-medium text-purple-300">
                What drives me?
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                Building digital products that make an impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
