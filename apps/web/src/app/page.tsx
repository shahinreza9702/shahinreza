
const colors = [
  { name: "Background", value: "#080B1C", color: "#080B1C" },
  { name: "Surface", value: "#0C1025", color: "#0C1025" },
  { name: "Primary", value: "#A855F7", color: "#A855F7" },
  { name: "Secondary", value: "#7C3AED", color: "#7C3AED" },
  { name: "Muted", value: "#94A3B8", color: "#94A3B8" },
];

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-60" />

      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />

      <section className="container-custom relative z-10 py-24">
        <div className="animate-fade-up max-w-3xl">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-purple-300">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Portfolio Design System
          </span>

          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
            Building digital products
            <br />
            that make an{" "}
            <span className="gradient-text">impact.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
            A modern design foundation for Shahin Reza&apos;s
            personal developer portfolio.
          </p>

          <div className="mt-12 flex flex-wrap gap-3">
            {colors.map((item) => (
              <div
                key={item.name}
                className="glass-panel flex items-center gap-3 rounded-xl px-4 py-3"
              >
                <span
                  className="h-8 w-8 rounded-lg border border-white/10"
                  style={{ backgroundColor: item.color }}
                />

                <div>
                  <p className="text-sm font-medium">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-surface/80 p-6">
            <p className="text-sm text-muted">
              Design direction
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "Premium Dark UI",
                "Purple Gradients",
                "Glassmorphism",
                "Responsive Layout",
                "Smooth Animations",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-lg bg-white/5 px-3 py-2 text-xs text-gray-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
