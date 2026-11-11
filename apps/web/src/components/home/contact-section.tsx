
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
    icon: "GH",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/shahinreza97",
    href: "https://www.linkedin.com/in/shahinreza97/",
    icon: "in",
  },
];

type FormStatus = "idle" | "error" | "success";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormStatus("idle");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name || !email || !subject || !message) {
      setFormStatus("error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setFormStatus("error");
      return;
    }

    setFormStatus("success");
  }

  const inputClasses =
    "w-full rounded-xl border border-border bg-[#080b1c]/70 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-500 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20";

  const labelClasses =
    "mb-2.5 block text-sm font-medium text-gray-300";

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-purple-600/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[140px]"
      />

      <div className="container-custom relative z-10">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Get In Touch
          </span>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Let&amos;s Work{" "}
            <span className="gradient-text">Together</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base">
            Have a project idea or an opportunity in mind?
            Let&amos;s connect and discuss how we can create something meaningful.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-5 lg:gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="glass-panel relative h-full overflow-hidden rounded-2xl p-6 sm:p-8">
              {/* Decorative Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
              />

              <div className="relative">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Contact Information
                </span>

                <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
                  Let&amos;s connect
                </h3>

                <p className="mt-4 text-sm leading-7 text-muted">
                  Feel free to reach out through email or connect with me
                  on my professional platforms.
                </p>

                {/* Contact Cards */}
                <div className="mt-9 space-y-4">
                  {contactDetails.map((detail) => (
                    <a
                      key={detail.label}
                      href={detail.href}
                      target={
                        detail.label === "Email" ? undefined : "_blank"
                      }
                      rel={
                        detail.label === "Email" ? undefined : "noreferrer"
                      }
                      className="group flex items-center gap-4 rounded-xl border border-border bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/[0.06] hover:shadow-lg hover:shadow-purple-500/5"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-base font-bold text-primary transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/20">
                        {detail.icon}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-xs text-muted">
                          {detail.label}
                        </span>

                        <span className="mt-1 block truncate text-sm font-medium text-white transition-colors duration-300 group-hover:text-primary">
                          {detail.value}
                        </span>
                      </span>

                      <span
                        aria-hidden="true"
                        className="text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary"
                      >
                        →
                      </span>
                    </a>
                  ))}
                </div>

                {/* Opportunity Card */}
                <div className="mt-8 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-400" />

                    <p className="text-sm font-semibold text-white">
                      Open to opportunities
                    </p>
                  </div>

                  <p className="mt-3 text-xs leading-6 text-muted">
                    Interested in connecting with people and exploring
                    opportunities in web development.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="glass-panel relative overflow-hidden rounded-2xl p-6 sm:p-8"
            >
              {/* Form Top Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary via-violet-500 to-transparent"
              />

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Send a Message
                  </span>

                  <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
                    Let&amos;s talk about your idea
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted">
                    Fill out the form below to get in touch.
                  </p>
                </div>

                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-xl text-primary">
                  ✉
                </span>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className={labelClasses}>
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
                    autoComplete="name"
                    className={inputClasses}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className={labelClasses}>
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
                    autoComplete="email"
                    className={inputClasses}
                  />
                </div>

                {/* Subject */}
                <div className="sm:col-span-2">
                  <label htmlFor="contact-subject" className={labelClasses}>
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
                    className={inputClasses}
                  />
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label htmlFor="contact-message" className={labelClasses}>
                    Message
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    className={`${inputClasses} min-h-40 resize-y`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group mt-7 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#080b1c] sm:w-auto"
              >
                Validate Message

                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>

              {/* Form Feedback */}
              <div aria-live="polite">
                {formStatus === "error" && (
                  <p
                    role="alert"
                    className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-400"
                  >
                    Please fill in all fields with valid information.
                  </p>
                )}

                {formStatus === "success" && (
                  <p
                    role="status"
                    className="mt-5 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm leading-6 text-green-400"
                  >
                    Your information looks valid! Message delivery will be
                    available after backend integration.
                  </p>
                )}
              </div>

              <p className="mt-5 border-t border-border pt-4 text-xs leading-6 text-muted">
                This form currently validates your information only.
                Message delivery is not available yet.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
