
import type { Metadata } from "next";

import ProjectsList from "./projects-list";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Shahin Reza's web development projects, technical interests and practical work.",
};

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsList />
    </main>
  );
}
