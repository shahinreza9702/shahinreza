
export type BlogStatus = "coming-soon" | "published";

export interface Blog {
  number: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  initials: string;
  gradient: string;
  status: BlogStatus;
}

export const blogs: Blog[] = [
  {
    number: "01",
    slug: "building-better-user-experiences-with-react",
    category: "Frontend Development",
    title: "Building Better User Experiences with React",
    description:
      "Exploring component-based architecture, reusable UI, and practical ways to build user-friendly web applications.",
    tags: ["React", "JavaScript"],
    initials: "RE",
    gradient: "from-violet-600/30 via-purple-500/10 to-transparent",
    status: "coming-soon",
  },
  {
    number: "02",
    slug: "getting-started-with-nextjs",
    category: "Web Development",
    title: "Getting Started with Next.js",
    description:
      "An introduction to modern web development with Next.js, routing, rendering, and project structure.",
    tags: ["Next.js", "TypeScript"],
    initials: "NX",
    gradient: "from-blue-600/30 via-cyan-500/10 to-transparent",
    status: "coming-soon",
  },
  {
    number: "03",
    slug: "my-journey-into-web-development",
    category: "Learning & Growth",
    title: "My Journey into Web Development",
    description:
      "Sharing lessons, challenges, and experiences from my journey of learning modern web development.",
    tags: ["Learning", "Career"],
    initials: "DEV",
    gradient: "from-pink-600/30 via-fuchsia-500/10 to-transparent",
    status: "coming-soon",
  },
];
