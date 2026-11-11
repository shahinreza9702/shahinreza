
import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/shahinreza9702",
    icon: "/assets/icons/github.svg",
  },
  {
    label: "Email",
    href: "mailto:iamshahinreza@gmail.com",
    icon: "/assets/icons/email.svg",
  },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 grid-pattern opacity-40" />

      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="container-custom grid min-h-[calc(100vh-80px)] items-center gap-14 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div className="animate-fade-up order-2 lg:order-1">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-medium tracking-wide text-purple-300 sm:text-sm">
              FRONTEND DEVELOPER
            </span>
          </div>

          <p className="mb-3 text-lg text-muted">
            Hello, I&apos;m
          </p>

          <h1 className="text-5xl font-bold leading-[1.12] tracking-tight sm:text-6xl xl:text-7xl">
            Shahin
            <br />
            <span className="gradient-text">Reza.</span>
          </h1>

          <h2 className="mt-7 max-w-xl text-2xl font-semibold leading-snug sm:text-3xl">
            Building digital products that make an impact.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-muted">
            I build responsive and user-focused web experiences
            using modern frontend technologies. I enjoy turning
            ideas into clean, accessible, and functional interfaces.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:-translate-y-1 hover:shadow-purple-500/30"
            >
              Explore My Work
              <span aria-hidden="true">↗</span>
            </Link>

            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-border px-7 py-4 text-sm font-semibold text-white transition-all hover:border-primary hover:text-primary"
            >
              Get In Touch
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-5">
            <span className="text-sm text-muted">
              Find me on
            </span>

            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary/10"
              >
                <Image
                  src={social.icon}
                  alt=""
                  width={19}
                  height={19}
                  className="brightness-0 invert"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-[430px] animate-fade-up lg:order-2">
          <div className="relative">
            <div className="absolute -inset-5 rounded-[40%] bg-gradient-to-br from-primary/20 to-secondary/10 blur-3xl" />

            <div className="gradient-border glow-effect relative aspect-[4/5] overflow-hidden rounded-[32px] bg-surface">
              <Image
                src="/assets/images/shahin-reza-hero.png"
                alt="Shahin Reza"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 430px"
                className="object-contain object-bottom"
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/50 to-transparent" />
            </div>

            <div className="glass-panel absolute -bottom-5 -left-5 rounded-2xl px-5 py-4 sm:-left-8">
              <p className="text-sm font-semibold text-white">
                Shahin Reza
              </p>
              <p className="mt-1 text-xs text-muted">
                Web Developer
              </p>
            </div>

            <div className="absolute -right-3 top-10 rounded-2xl border border-primary/20 bg-surface/90 px-4 py-3 shadow-xl shadow-purple-500/10 sm:-right-7">
              <span className="text-sm font-semibold gradient-text">
                Creative Developer
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
