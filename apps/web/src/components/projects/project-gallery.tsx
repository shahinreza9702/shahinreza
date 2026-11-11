
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ProjectImage {
    src: string;
    alt: string;
}

interface ProjectGalleryProps {
    images: ProjectImage[];
    projectName: string;
}

export default function ProjectGallery({
    images,
    projectName,
}: ProjectGalleryProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const isOpen = activeIndex !== null;

    function showPrevious() {
        setActiveIndex((current) => {
            if (current === null) return null;
            return (current - 1 + images.length) % images.length;
        });
    }

    function showNext() {
        setActiveIndex((current) => {
            if (current === null) return null;
            return (current + 1) % images.length;
        });
    }

    function closeLightbox() {
        setActiveIndex(null);
    }


    useEffect(() => {
        if (!isOpen) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActiveIndex(null);
            }

            if (event.key === "ArrowLeft") {
                setActiveIndex((current) =>
                    current === null
                        ? null
                        : (current - 1 + images.length) % images.length,
                );
            }

            if (event.key === "ArrowRight") {
                setActiveIndex((current) =>
                    current === null
                        ? null
                        : (current + 1) % images.length,
                );
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, images.length]);


    if (images.length === 0) return null;

    return (
        <>
            <section className="section-padding relative pt-0">
                <div className="container-custom">
                    <div className="mb-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                            Visual Showcase
                        </p>

                        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                            Project <span className="gradient-text">Gallery</span>
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-muted">
                            Explore screenshots from {projectName}.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        {images.map((image, index) => (
                            <button
                                key={image.src}
                                type="button"
                                onClick={() => setActiveIndex(index)}
                                aria-label={`Preview ${projectName} screenshot ${index + 1}`}
                                className="glass-panel group relative overflow-hidden rounded-2xl border border-border text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-purple-500/10"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        sizes="(max-width: 640px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 flex items-center justify-center bg-[#080b1c]/0 transition-colors duration-300 group-hover:bg-[#080b1c]/35">
                                        <span className="translate-y-3 rounded-full border border-white/20 bg-black/50 px-5 py-2.5 text-sm font-medium text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                            View Screenshot ↗
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between px-5 py-4">
                                    <span className="text-sm font-medium text-white">
                                        Screenshot {index + 1}
                                    </span>

                                    <span className="text-xs text-muted">
                                        Click to preview
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {isOpen && activeIndex !== null && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050713]/95 p-4 backdrop-blur-xl sm:p-8"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${projectName} screenshot preview`}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) closeLightbox();
                    }}
                >
                    <div className="relative flex h-full max-h-[850px] w-full max-w-6xl flex-col">
                        <div className="mb-4 flex items-center justify-between gap-4">
                            <div>
                                <p className="font-semibold text-white">{projectName}</p>
                                <p className="mt-1 text-xs text-muted">
                                    Screenshot {activeIndex + 1} of {images.length}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeLightbox}
                                aria-label="Close screenshot preview"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-2xl text-white transition-colors hover:border-primary hover:bg-primary"
                            >
                                ×
                            </button>
                        </div>

                        <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1025]">
                            <Image
                                src={images[activeIndex].src}
                                alt={images[activeIndex].alt}
                                fill
                                priority
                                sizes="100vw"
                                className="object-contain p-2 sm:p-4"
                            />
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-4">
                            <button
                                type="button"
                                onClick={showPrevious}
                                disabled={images.length < 2}
                                className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-primary hover:bg-primary disabled:opacity-40"
                            >
                                ← Previous
                            </button>

                            <span className="text-sm text-muted">
                                {activeIndex + 1} / {images.length}
                            </span>

                            <button
                                type="button"
                                onClick={showNext}
                                disabled={images.length < 2}
                                className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-primary hover:bg-primary disabled:opacity-40"
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
