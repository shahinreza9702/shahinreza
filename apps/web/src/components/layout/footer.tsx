
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Web Development",
  "Frontend Development",
  "Responsive Design",
  "UI Implementation",
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/shahinreza9702",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shahinreza97/",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/shahin.reza.97",
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/shahin_reza97",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-[#060817]">
      <div className="container-custom py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-xl font-bold gradient-text">
                {"</>"}
              </span>
              <span className="text-lg font-bold">Shahin Reza</span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-muted">
              Building digital products that make an impact.
              Passionate about creating modern and user-friendly web
              experiences.
            </p>

            <a
              href="mailto:iamshahinreza@gmail.com"
              className="mt-5 inline-block text-sm text-primary transition-colors hover:text-white"
            >
              iamshahinreza@gmail.com
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-bold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-sm font-bold text-white">
              What I Do
            </h3>

            <ul className="space-y-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="text-sm text-muted"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-5 text-sm font-bold text-white">
              Connect With Me
            </h3>

            <ul className="space-y-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
                  >
                    {social.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}

              <li>
                <a
                  href="mailto:iamshahinreza@gmail.com"
                  className="text-sm text-muted transition-colors hover:text-primary"
                >
                  Email Me
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-xs leading-6 text-muted">
            © {currentYear} Shahin Reza. All rights reserved.
          </p>

          <a
            href="#"
            className="text-xs text-muted transition-colors hover:text-primary"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
