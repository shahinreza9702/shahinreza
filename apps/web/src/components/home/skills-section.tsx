
"use client";
import Image from "next/image";
import { useState } from "react";

const categories = [
    "All",
    "Frontend",
    "Backend",
    "Database",
    "Tools",
] as const;

type Category = (typeof categories)[number];

const skills: {
    name: string;
    category: Exclude<Category, "All">;
    icon?: string;
    shortName: string;
}[] = [
        {
            name: "HTML5",
            category: "Frontend",
            icon: "/assets/icons/html-5.svg",
            shortName: "HTML",
        },
        {
            name: "CSS3",
            category: "Frontend",
            icon: "/assets/icons/css3.svg",
            shortName: "CSS",
        },
        {
            name: "JavaScript",
            category: "Frontend",
            icon: "/assets/icons/js.png",
            shortName: "JS",
        },
        {
            name: "TypeScript",
            category: "Frontend",
            shortName: "TS",
        },
        {
            name: "React",
            category: "Frontend",
            icon: "/assets/icons/react.png",
            shortName: "R",
        },
        {
            name: "Next.js",
            category: "Frontend",
            shortName: "N",
        },
        {
            name: "Tailwind CSS",
            category: "Frontend",
            shortName: "TW",
        },
        {
            name: "Node.js",
            category: "Backend",
            icon: "/assets/icons/nodejs.png",
            shortName: "Node",
        },
        {
            name: "Express.js",
            category: "Backend",
            shortName: "Ex",
        },
        {
            name: "MongoDB",
            category: "Database",
            icon: "/assets/icons/mongo.png",
            shortName: "DB",
        },
        {
            name: "Git",
            category: "Tools",
            shortName: "Git",
        },
        {
            name: "GitHub",
            category: "Tools",
            icon: "/assets/icons/github.svg",
            shortName: "GH",
        },
        {
            name: "VS Code",
            category: "Tools",
            shortName: "VS",
        },
    ];

export default function SkillsSection() {
    const [activeCategory, setActiveCategory] =
        useState<Category>("All");

    const filteredSkills =
        activeCategory === "All"
            ? skills
            : skills.filter(
                (skill) => skill.category === activeCategory
            );

    return (
        <section
            id="skills"
            className="section-padding relative overflow-hidden"
        >
            <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-purple-600/10 blur-[120px]" />

            <div className="container-custom relative z-10">
                {/* Section Heading */}
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-purple-300">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        What I work with
                    </span>

                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        Technical <span className="gradient-text">Skills</span>
                    </h2>

                    <p className="mt-5 leading-8 text-muted">
                        Technologies and tools I use to build modern web
                        applications and digital experiences.
                    </p>
                </div>

                {/* Category Filters */}
                <div
                    className="mb-10 flex flex-wrap justify-center gap-3"
                    aria-label="Filter skills by category"
                >
                    {categories.map((category) => {
                        const isActive = activeCategory === category;

                        return (
                            <button
                                key={category}
                                type="button"
                                onClick={() => setActiveCategory(category)}
                                aria-pressed={isActive}
                                className={`rounded-xl border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${isActive
                                        ? "border-primary bg-primary text-white shadow-lg shadow-purple-500/20"
                                        : "border-border bg-surface text-muted hover:border-primary/50 hover:text-white"
                                    }`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8">
                    {filteredSkills.map((skill) => (
                        <div
                            key={skill.name}
                            className="glass-panel group flex min-h-28 flex-col items-center justify-center rounded-xl p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-purple-500/10 sm:min-h-32 sm:p-4"
                        >
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-surface-elevated transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/10">
                                {skill.icon ? (
                                    <Image
                                        src={skill.icon}
                                        alt=""
                                        width={36}
                                        height={36}
                                        className="h-8 w-8 object-contain"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <span className="text-lg font-bold text-purple-300">
                                        {skill.shortName}
                                    </span>
                                )}
                            </div>

                            <h3 className="text-sm font-semibold text-foreground">
                                {skill.name}
                            </h3>

                            <span className="mt-2 text-xs text-muted">
                                {skill.category}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Result Count */}
                <p
                    className="mt-8 text-center text-sm text-muted"
                    aria-live="polite"
                >
                    Showing {filteredSkills.length}{" "}
                    {filteredSkills.length === 1 ? "skill" : "skills"}
                    {activeCategory !== "All" &&
                        ` in ${activeCategory}`}
                </p>
            </div>
        </section>
    );
}
