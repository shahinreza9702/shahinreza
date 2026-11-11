
"use client";

import { useState } from "react";

const contactDetails = [
  {
    label: "Email",
    value: "shahinreza.dev@gmail.com",
    href: "mailto:shahinreza.dev@gmail.com",
    icon: "✉",
  },
  {
    label: "GitHub",
    value: "github.com/shahinreza9702",
    href: "https://github.com/shahinreza9702",
    icon: "⌘",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/shahinreza97",
    href: "https://www.linkedin.com/in/shahinreza97/",
    icon: "in",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Backend integration will be added later.
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Get In Touch
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Let&apos;s Work <span className="gradient-text">Together</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
            Have a project idea or an opportunity in mind?
            I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="glass-panel h-full rounded-2xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold">
                Let&apos;s connect
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted">
                Feel free to reach out through email or connect with me
                on my professional platforms.
              </p>

              <div className="mt-8 space-y-5">
                {contactDetails.map((detail) => (
                  <a
                    key={detail.label}
                    href={detail.href}
                    target={detail.label === "Email" ? undefined : "_blank"}
                    rel={detail.label === "Email" ? undefined : "noreferrer"}
                    className="group flex items-center gap-4 rounded-xl border border-border p-4 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                      {detail.icon}
                    </span>

                    <span className="min-w-0">
                      <span className="block text-xs text-muted">
                        {detail.label}
                      </span>

                      <span className="mt-1 block truncate text-sm font-medium transition-colors group-hover:text-primary">
                        {detail.value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-5">
                <p className="text-sm font-semibold text-white">
                  Open to opportunities
                </p>
                <p className="mt-2 text-xs leading-6 text-muted">
                  Interested in connecting with people and exploring
                  opportunities in web development.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="glass-panel rounded-2xl p-6 sm:p-8"
            >
              <h3 className="text-2xl font-bold">
                Send Me a Message
              </h3>

              <p className="mt-2 text-sm text-muted">
                Fill out the form below to get in touch.
              </p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-primary"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-primary"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    className="w-full resize-y rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/20 sm:w-auto"
              >
                Send Message
                <span aria-hidden="true">→</span>
              </button>

              <p className="mt-4 text-xs leading-5 text-muted">
                Message delivery will be enabled after backend integration.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
