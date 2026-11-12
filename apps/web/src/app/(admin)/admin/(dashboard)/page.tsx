
import Link from "next/link";

const sections = [
  {
    title: "Manage Blogs",
    description: "Create, edit, publish and manage your blog posts.",
    href: "/admin/blogs",
    action: "View Blogs",
  },
  {
    title: "Manage Projects",
    description: "Add, update and manage your portfolio projects.",
    href: "/admin/projects",
    action: "View Projects",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">

      {/* Page Heading */}
      <section>
        <p className="text-sm font-medium text-primary">
          WORKSPACE OVERVIEW
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>

        <p className="mt-2 text-sm text-muted">
          Manage your portfolio content from one place.
        </p>
      </section>

      {/* Welcome Section */}
      <section className="rounded-2xl border border-border bg-surface p-6 md:p-8">
        <p className="text-sm text-primary font-medium">
          SHAHIN REZA PORTFOLIO
        </p>

        <h2 className="mt-3 text-2xl font-bold">
          Welcome to your <span className="gradient-text">Workspace.</span>
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          Keep your portfolio updated by managing your blog posts
          and projects through this dashboard.
        </p>
      </section>

      {/* Management Cards */}
      <section>
        <h2 className="mb-5 text-lg font-semibold">
          Content Management
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <article
              key={section.href}
              className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-primary/60"
            >
              <h3 className="text-xl font-semibold">
                {section.title}
              </h3>

              <p className="mt-3 min-h-12 text-sm leading-6 text-muted">
                {section.description}
              </p>

              <Link
                href={section.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-white"
              >
                {section.action}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
