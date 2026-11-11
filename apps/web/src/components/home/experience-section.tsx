
export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            My Journey
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Professional <span className="gradient-text">Experience</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
            My professional experience has helped me develop
            responsibility, communication, and practical workplace skills.
          </p>
        </div>

        <div className="mx-auto max-w-2xl border-l border-primary/30 pl-7">
          <article className="glass-panel relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-8">
            <span className="absolute -left-[34px] top-9 h-3 w-3 rounded-full border-2 border-primary bg-background" />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Present
              </span>

              <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                Current Position
              </span>
            </div>

            <h3 className="mt-5 text-xl font-bold sm:text-2xl">
              Manager
            </h3>

            <p className="mt-2 text-sm font-medium text-gray-300">
              Adi Mohini Mohan Kanjilal BD
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">
              Currently working as a Manager, gaining professional experience
              in a business environment while developing organizational and
              communication skills.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
