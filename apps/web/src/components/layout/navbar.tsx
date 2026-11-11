
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/", section: false },
  { label: "About", href: "/about", section: false },
  { label: "Skills", href: "/#skills", section: true },
  { label: "Projects", href: "/projects", section: false },
  { label: "Blog", href: "/blog", section: false },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string, section: boolean) => {
    if (section) return false;
    return pathname === href;
  };

  const linkClasses = (href: string, section: boolean) =>
    `text-sm transition-colors duration-300 ${
      isActive(href, section)
        ? "font-semibold text-primary"
        : "text-muted hover:text-primary"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/85 backdrop-blur-xl">
      <nav
        className="container-custom flex h-20 items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="text-2xl font-bold tracking-tight"
          aria-label="Shahin Reza - Home"
        >
          Shahin<span className="gradient-text">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={
                isActive(link.href, link.section) ? "page" : undefined
              }
              className={linkClasses(link.href, link.section)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Contact Button */}
        <Link
          href="/#contact"
          className="hidden rounded-full bg-linear-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/20 md:inline-flex"
        >
          Let&apos;s Talk
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-label={
            isOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-white transition-colors hover:border-primary/50 hover:text-primary md:hidden"
        >
          {isOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                d="m6 6 12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-surface px-5 py-5 md:hidden"
        >
          <div className="container-custom flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={
                  isActive(link.href, link.section) ? "page" : undefined
                }
                className={linkClasses(link.href, link.section)}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-linear-to-r from-primary to-secondary px-5 py-3 text-center text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-purple-500/20"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
