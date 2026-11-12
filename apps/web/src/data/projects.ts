
export type ProjectCategory = "Web App" | "Website" | "E-commerce" | "Blog";

export interface Project {
  number: string;
  name: string;
  category: string;
  filterCategory: ProjectCategory;
  description: string;
  overview: string;
  technologies: string[];
  slug: string;
  initials: string;
  status: string;
  accent: string;
  features: string[];
  focus: string;
  images: {
    src: string;
    alt: string;
  }[];
  socialImage?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    number: "01",
    name: "Kindora",
    category: "Social Development Platform",
    filterCategory: "Web App",
    description:
      "A community-driven platform designed to help people create, discover, join, and track social development events in their local communities.",
    overview:
      "Kindora is a social development platform concept focused on connecting people with community activities. It aims to make discovering and participating in local social development events easier through a modern digital experience.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Express.js",
      "MongoDB",
    ],
    slug: "kindora",
    initials: "K",
    status: "Featured Project",
    accent: "from-violet-500/25 via-purple-500/10 to-transparent",
    features: [
      "Community-focused event discovery",
      "Event creation and participation",
      "Tracking social development activities",
      "Modern responsive interface",
    ],
    focus:
      "Building a community-driven experience with a modern frontend and a scalable backend architecture.",
    images: [
      {
        src: "/assets/images/kindora-image-1.png",
        alt: "Kindora project screenshot 1",
      },
      {
        src: "/assets/images/kindora-image-2.png",
        alt: "Kindora project screenshot 2",
      },
    ],
  },
  {
    number: "02",
    name: "TheInfotik",
    category: "News & Media Platform",
    filterCategory: "Blog",
    description:
      "A modern news platform concept focused on presenting news articles, categories, and editorial content through a clean reading experience.",
    overview:
      "TheInfotik is a news and media platform designed to organize and present editorial content. The project focuses on a clean reading experience, structured news categories, and a modern content presentation system.",
    technologies: [
      "Next.js",
      "React",
      "Express.js",
      "MongoDB",
    ],
    slug: "theinfotik",
    initials: "T",
    status: "Personal Project",
    accent: "from-cyan-500/20 via-blue-500/10 to-transparent",
    features: [
      "News article presentation",
      "Category-based content organization",
      "Editorial content structure",
      "Responsive reading experience",
    ],
    focus:
      "Creating a structured news platform with a user-friendly reading experience and content management architecture.",
    images: [
      {
        src: "/assets/images/the-infotik-imae-1.png",
        alt: "TheInfotik project screenshot 1",
      },
      {
        src: "/assets/images/the-infotik-imae-2.png",
        alt: "TheInfotik project screenshot 2",
      },
    ],
  },
  {
    number: "03",
    name: "Dev Stack Explorer",
    category: "Technology Explorer",
    filterCategory: "Web App",
    description:
      "An interactive application that allows users to explore technologies across different categories and build their preferred development stack.",
    overview:
      "Dev Stack Explorer is an interactive technology exploration application. It helps users browse different development technologies and select their preferred tools to create a personalized development stack.",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
    ],
    slug: "dev-stack-explorer",
    initials: "D",
    status: "Personal Project",
    accent: "from-pink-500/20 via-fuchsia-500/10 to-transparent",
    features: [
      "Technology exploration by category",
      "Interactive technology selection",
      "Personalized development stack",
      "Responsive user interface",
    ],
    focus:
      "Building an interactive React application with reusable components, TypeScript, and a category-based selection experience.",
    images: [
      {
        src: "/assets/images/dev-stack-image-1.png",
        alt: "Dev Stack Explorer project screenshot 1",
      },
      {
        src: "/assets/images/dev-stack-image-2.png",
        alt: "Dev Stack Explorer project screenshot 2",
      },
    ],
  },
  {
    number: "04",
    name: "Bazar-Dor",
    category: "Daily Market Price Tracker",
    filterCategory: "Web App",
    description:
      "A Bengali-language web app for exploring daily essential commodity prices, comparing market-wise rates, and tracking price changes across Bangladesh.",
    overview:
      "Bazar-Dor helps users explore daily prices of essential products such as rice, lentils, oil, vegetables, fish, meat and eggs. Users can view price movements and compare minimum, maximum and average prices across markets.",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Better Auth",
      "MongoDB",
      "react-hot-toast",
      "Vercel",
    ],
    slug: "bazar-dor",
    initials: "BD",
    status: "Personal Project",
    accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
    features: [
      "Live scrolling product price ticker",
      "Daily price increase and decrease sections",
      "Market-wise minimum, maximum and average prices",
      "Category-based product browsing and sorting",
      "Email/password and social authentication",
      "Responsive design with loading skeletons and custom 404 page",
    ],
    focus:
      "Building a Bengali-language market price tracking experience with market-wise price comparisons and user authentication.",
    images: [
      {
        src: "/assets/images/bazar-dor-image-1.png",
        alt: "Bazar-Dor project screenshot 1",
      },
      {
        src: "/assets/images/bazar-dor-image-2.png",
        alt: "Bazar-Dor project screenshot 2",
      },
    ],
    liveUrl: "https://bazar-dor-lake.vercel.app",
    githubUrl: "https://github.com/shahinreza9702/bazar-dor",
  },
];
