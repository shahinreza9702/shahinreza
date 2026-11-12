
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://shahinreza.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Shahin Reza",
      url: siteUrl,
      jobTitle: "Web Developer",
      sameAs: [
        "https://github.com/shahinreza9702",
        "https://www.linkedin.com/in/shahinreza97/",
        "https://www.facebook.com/shahin.reza.97",
        "https://x.com/shahin_reza97",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Shahin Reza Portfolio",
      url: siteUrl,
      description:
        "Explore Shahin Reza's portfolio, web development projects, technical skills, and professional journey.",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Shahin Reza | Web Developer",
    template: "%s | Shahin Reza",
  },

  description:
    "Explore Shahin Reza's portfolio, web development projects, technical skills, and professional journey.",

  applicationName: "Shahin Reza Portfolio",

  keywords: [
    "Shahin Reza",
    "Web Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "JavaScript Developer",
  ],

  authors: [{ name: "Shahin Reza" }],
  creator: "Shahin Reza",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Shahin Reza Portfolio",
    title: "Shahin Reza | Web Developer",
    description:
      "Explore Shahin Reza's portfolio, web development projects, technical skills, and professional journey.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shahin Reza | Web Developer",
    description:
      "Explore Shahin Reza's portfolio, web development projects, technical skills, and professional journey.",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  const serializedJsonLd = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializedJsonLd,
          }}
        />

        {children}
      </body>
    </html>
  );
}
