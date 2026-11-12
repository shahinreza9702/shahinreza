
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  {
    label: "Overview",
    href: "/admin",
  },
  {
    label: "Blogs",
    href: "/admin/blogs",
  },
  {
    label: "Projects",
    href: "/admin/projects",
  },
];

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">

      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-surface md:flex md:flex-col">

        <div className="border-b border-border px-6 py-6">
          <Link href="/admin" className="text-xl font-bold">
            <span className="gradient-text">SR.</span> Admin
          </Link>

          <p className="mt-1 text-xs text-muted">
            Portfolio Management
          </p>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted">
            Workspace
          </p>

          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-4 py-3 text-sm text-muted transition-colors hover:bg-surface-elevated hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <Link
            href="/"
            className="block rounded-lg px-4 py-3 text-sm text-muted transition-colors hover:bg-surface-elevated hover:text-white"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">

        <header className="flex h-16 items-center justify-between border-b border-border bg-surface px-5 md:px-8">
          <div>
            <p className="text-sm font-semibold">Admin Dashboard</p>
            <p className="text-xs text-muted">
              Manage your portfolio content
            </p>
          </div>

          <Link
            href="/admin/login"
            className="rounded-lg border border-border px-4 py-2 text-xs text-muted transition-colors hover:border-primary hover:text-white"
          >
            Admin Account
          </Link>
        </header>

        <main className="flex-1 p-5 md:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}
