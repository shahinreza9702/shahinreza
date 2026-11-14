
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiRequestError, apiRequest } from "@/lib/api";

type ProjectStatus = "draft" | "published";

interface ProjectImage {
    url: string;
    alt: string;
    caption?: string;
}

interface ProjectSeo {
    title?: string;
    description?: string;
    image?: string;
}

interface Project {
    _id: string;
    name: string;
    slug: string;
    category: string;
    filterCategory: "Web App" | "Website" | "E-commerce" | "Blog";
    description: string;
    overview: string;
    focus: string;
    features: string[];
    technologies: string[];
    images: ProjectImage[];
    socialImage?: string;
    liveUrl?: string;
    githubUrl?: string;
    displayStatus: string;
    status: ProjectStatus;
    isFeatured: boolean;
    sortOrder: number;
    seo?: ProjectSeo;
}

interface ProjectFormProps {
    mode: "create" | "edit";
    initialProject?: Project;
}

interface ProjectFormData {
    name: string;
    slug: string;
    category: string;
    filterCategory: Project["filterCategory"];
    description: string;
    overview: string;
    focus: string;
    features: string[];
    technologies: string[];
    images: ProjectImage[];
    socialImage: string;
    liveUrl: string;
    githubUrl: string;
    displayStatus: string;
    status: ProjectStatus;
    isFeatured: boolean;
    sortOrder: number;
    seo: ProjectSeo;
}

interface ApiResponse {
    success: boolean;
    message?: string;
    data: Project;
}

const inputClass =
    "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary";

const labelClass = "text-sm font-medium text-foreground";

const emptyForm: ProjectFormData = {
    name: "",
    slug: "",
    category: "",
    filterCategory: "Website",
    description: "",
    overview: "",
    focus: "",
    features: [],
    technologies: [],
    images: [],
    socialImage: "",
    liveUrl: "",
    githubUrl: "",
    displayStatus: "Personal Project",
    status: "draft",
    isFeatured: false,
    sortOrder: 0,
    seo: {},
};

function createSlug(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

export default function ProjectForm({
    mode,
    initialProject,
}: ProjectFormProps) {
    const router = useRouter();

    const [form, setForm] = useState<ProjectFormData>(() => {
        if (!initialProject) return emptyForm;

        return {
            name: initialProject.name,
            slug: initialProject.slug,
            category: initialProject.category,
            filterCategory: initialProject.filterCategory,
            description: initialProject.description,
            overview: initialProject.overview,
            focus: initialProject.focus,
            features: initialProject.features ?? [],
            technologies: initialProject.technologies ?? [],
            images: initialProject.images ?? [],
            socialImage: initialProject.socialImage ?? "",
            liveUrl: initialProject.liveUrl ?? "",
            githubUrl: initialProject.githubUrl ?? "",
            displayStatus: initialProject.displayStatus ?? "Personal Project",
            status: initialProject.status,
            isFeatured: initialProject.isFeatured,
            sortOrder: initialProject.sortOrder,
            seo: initialProject.seo ?? {},
        };
    });

    const [slugManuallyEdited, setSlugManuallyEdited] = useState(
        Boolean(initialProject),
    );
    const [featureInput, setFeatureInput] = useState("");
    const [technologyInput, setTechnologyInput] = useState("");
    const [imageInput, setImageInput] = useState<ProjectImage>({
        url: "",
        alt: "",
        caption: "",
    });
    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!slugManuallyEdited && mode === "create") {
            setForm((current) => ({
                ...current,
                slug: createSlug(current.name),
            }));
        }
    }, [form.name, slugManuallyEdited, mode]);

    function updateField<K extends keyof ProjectFormData>(
        field: K,
        value: ProjectFormData[K],
    ) {
        setForm((current) => ({ ...current, [field]: value }));
    }

    function updateSeo<K extends keyof ProjectSeo>(
        field: K,
        value: ProjectSeo[K],
    ) {
        setForm((current) => ({
            ...current,
            seo: { ...current.seo, [field]: value },
        }));
    }

    function addListItem(
        field: "features" | "technologies",
        value: string,
    ) {
        const cleaned = value.trim();
        if (!cleaned) return;

        setForm((current) => ({
            ...current,
            [field]: [...current[field], cleaned],
        }));

        if (field === "features") setFeatureInput("");
        else setTechnologyInput("");
    }

    function removeListItem(
        field: "features" | "technologies",
        index: number,
    ) {
        setForm((current) => ({
            ...current,
            [field]: current[field].filter((_, i) => i !== index),
        }));
    }

    function addImage() {
        if (!imageInput.url.trim() || !imageInput.alt.trim()) return;

        setForm((current) => ({
            ...current,
            images: [...current.images, { ...imageInput }],
        }));

        setImageInput({ url: "", alt: "", caption: "" });
    }

    function removeImage(index: number) {
        setForm((current) => ({
            ...current,
            images: current.images.filter((_, i) => i !== index),
        }));
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();
        setError("");

        const submitter = (event.nativeEvent as SubmitEvent)
            .submitter as HTMLButtonElement | null;

        const status: ProjectStatus =
            submitter?.value === "published" ? "published" : "draft";

        if (form.features.some((item) => !item.trim())) {
            setError("Please remove empty features.");
            return;
        }

        const payload = {
            ...form,
            status,
            socialImage: form.socialImage.trim() || undefined,
            liveUrl: form.liveUrl.trim() || undefined,
            githubUrl: form.githubUrl.trim() || undefined,
            seo: {
                title: form.seo.title?.trim() || undefined,
                description: form.seo.description?.trim() || undefined,
                image: form.seo.image?.trim() || undefined,
            },
        };

        setIsSaving(true);

        try {
            const response =
                mode === "create"
                    ? await apiRequest<ApiResponse>("/admin/projects", {
                        method: "POST",
                        body: JSON.stringify(payload),
                    })
                    : await apiRequest<ApiResponse>(
                        `/admin/projects/${initialProject?._id}`,
                        {
                            method: "PATCH",
                            body: JSON.stringify(payload),
                        },
                    );

            if (!response.success) {
                throw new Error(response.message || "Unable to save project.");
            }

            router.push("/admin/projects");
            router.refresh();
        } catch (err) {
            setError(
                err instanceof ApiRequestError || err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again.",
            );
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="mx-auto max-w-5xl space-y-8">
            <div>
                <h1 className="text-2xl font-bold">
                    {mode === "create" ? "Create Project" : "Edit Project"}
                </h1>
                <p className="mt-2 text-sm text-muted">
                    Manage project information and portfolio display settings.
                </p>
            </div>

            {error && (
                <div
                    role="alert"
                    className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400"
                >
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >
                {/* Basic Information */}
                <section className="space-y-5 rounded-2xl border border-border bg-surface p-6">
                    <div>
                        <h2 className="text-lg font-semibold">Basic Information</h2>
                        <p className="mt-1 text-sm text-muted">
                            Add the project&apos;s main details.
                        </p>
                    </div>

                    <div>
                        <label className={labelClass}>Project Name *</label>
                        <input
                            required
                            minLength={2}
                            maxLength={120}
                            className={inputClass}
                            value={form.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            placeholder="e.g. Kindora"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Slug *</label>
                        <input
                            required
                            minLength={3}
                            maxLength={160}
                            pattern="[a-z0-9]+(-[a-z0-9]+)*"
                            className={inputClass}
                            value={form.slug}
                            onChange={(e) => {
                                setSlugManuallyEdited(true);
                                updateField("slug", e.target.value);
                            }}
                            placeholder="kindora"
                        />
                        <p className="mt-2 text-xs text-muted">
                            Lowercase letters, numbers and hyphens only.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <label className={labelClass}>Category *</label>
                            <input
                                required
                                minLength={2}
                                maxLength={100}
                                className={inputClass}
                                value={form.category}
                                onChange={(e) => updateField("category", e.target.value)}
                                placeholder="e.g. Full Stack Development"
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Filter Category *</label>
                            <select
                                className={inputClass}
                                value={form.filterCategory}
                                onChange={(e) =>
                                    updateField(
                                        "filterCategory",
                                        e.target.value as Project["filterCategory"],
                                    )
                                }
                            >
                                <option value="Web App">Web App</option>
                                <option value="Website">Website</option>
                                <option value="E-commerce">E-commerce</option>
                                <option value="Blog">Blog</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Short Description *</label>
                        <textarea
                            required
                            minLength={10}
                            maxLength={500}
                            rows={3}
                            className={inputClass}
                            value={form.description}
                            onChange={(e) => updateField("description", e.target.value)}
                            placeholder="A short summary of this project..."
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Display Status</label>
                        <input
                            maxLength={60}
                            className={inputClass}
                            value={form.displayStatus}
                            onChange={(e) => updateField("displayStatus", e.target.value)}
                            placeholder="Personal Project"
                        />
                    </div>
                </section>

                {/* Project Details */}
                <section className="space-y-5 rounded-2xl border border-border bg-surface p-6">
                    <h2 className="text-lg font-semibold">Project Details</h2>

                    <div>
                        <label className={labelClass}>Overview *</label>
                        <textarea
                            required
                            minLength={10}
                            rows={6}
                            className={inputClass}
                            value={form.overview}
                            onChange={(e) => updateField("overview", e.target.value)}
                            placeholder="Describe the project in detail..."
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Development Focus *</label>
                        <textarea
                            required
                            minLength={3}
                            rows={4}
                            className={inputClass}
                            value={form.focus}
                            onChange={(e) => updateField("focus", e.target.value)}
                            placeholder="Explain the main development focus..."
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Features</label>
                        <div className="mt-2 flex gap-2">
                            <input
                                className={inputClass + " mt-0"}
                                value={featureInput}
                                onChange={(e) => setFeatureInput(e.target.value)}
                                placeholder="Add a feature"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        addListItem("features", featureInput);
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => addListItem("features", featureInput)}
                                className="rounded-xl bg-primary px-5 text-sm font-medium text-white"
                            >
                                Add
                            </button>
                        </div>

                        <ul className="mt-3 space-y-2">
                            {form.features.map((feature, index) => (
                                <li
                                    key={`${feature}-${index}`}
                                    className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm"
                                >
                                    {feature}
                                    <button
                                        type="button"
                                        onClick={() => removeListItem("features", index)}
                                        className="text-red-400"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <label className={labelClass}>Technologies</label>
                        <div className="mt-2 flex gap-2">
                            <input
                                className={inputClass + " mt-0"}
                                value={technologyInput}
                                onChange={(e) => setTechnologyInput(e.target.value)}
                                placeholder="e.g. Next.js"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        addListItem("technologies", technologyInput);
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    addListItem("technologies", technologyInput)
                                }
                                className="rounded-xl bg-primary px-5 text-sm font-medium text-white"
                            >
                                Add
                            </button>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {form.technologies.map((technology, index) => (
                                <span
                                    key={`${technology}-${index}`}
                                    className="flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm"
                                >
                                    {technology}
                                    <button
                                        type="button"
                                        onClick={() => removeListItem("technologies", index)}
                                        className="text-red-400"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Images */}
                <section className="space-y-5 rounded-2xl border border-border bg-surface p-6">
                    <div>
                        <h2 className="text-lg font-semibold">Project Images</h2>
                        <p className="mt-1 text-sm text-muted">
                            Add image URLs and meaningful alt text.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className={labelClass}>Image URL</label>
                            <input
                                type="url"
                                className={inputClass}
                                value={imageInput.url}
                                onChange={(e) =>
                                    setImageInput((current) => ({
                                        ...current,
                                        url: e.target.value,
                                    }))
                                }
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Alt Text</label>
                            <input
                                className={inputClass}
                                value={imageInput.alt}
                                onChange={(e) =>
                                    setImageInput((current) => ({
                                        ...current,
                                        alt: e.target.value,
                                    }))
                                }
                                placeholder="Describe the image"
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Caption (Optional)</label>
                        <input
                            className={inputClass}
                            value={imageInput.caption}
                            onChange={(e) =>
                                setImageInput((current) => ({
                                    ...current,
                                    caption: e.target.value,
                                }))
                            }
                            placeholder="Image caption"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={addImage}
                        disabled={!imageInput.url.trim() || !imageInput.alt.trim()}
                        className="rounded-xl border border-border px-5 py-3 text-sm font-medium disabled:opacity-50"
                    >
                        Add Image
                    </button>

                    <div className="space-y-3">
                        {form.images.map((image, index) => (
                            <div
                                key={`${image.url}-${index}`}
                                className="flex flex-col justify-between gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center"
                            >
                                <div className="min-w-0">
                                    <p className="break-all text-sm font-medium">{image.url}</p>
                                    <p className="mt-1 text-xs text-muted">{image.alt}</p>
                                    {image.caption && (
                                        <p className="mt-1 text-xs text-muted">
                                            {image.caption}
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="text-left text-sm text-red-400"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Links */}
                <section className="space-y-5 rounded-2xl border border-border bg-surface p-6">
                    <h2 className="text-lg font-semibold">Project Links</h2>

                    <div>
                        <label className={labelClass}>Live Project URL</label>
                        <input
                            type="url"
                            className={inputClass}
                            value={form.liveUrl}
                            onChange={(e) => updateField("liveUrl", e.target.value)}
                            placeholder="https://example.com"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>GitHub Repository URL</label>
                        <input
                            type="url"
                            className={inputClass}
                            value={form.githubUrl}
                            onChange={(e) => updateField("githubUrl", e.target.value)}
                            placeholder="https://github.com/username/project"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Social Image URL</label>
                        <input
                            type="url"
                            className={inputClass}
                            value={form.socialImage}
                            onChange={(e) => updateField("socialImage", e.target.value)}
                            placeholder="https://example.com/preview.jpg"
                        />
                    </div>
                </section>

                {/* SEO */}
                <section className="space-y-5 rounded-2xl border border-border bg-surface p-6">
                    <h2 className="text-lg font-semibold">SEO Settings</h2>

                    <div>
                        <label className={labelClass}>SEO Title</label>
                        <input
                            maxLength={160}
                            className={inputClass}
                            value={form.seo.title ?? ""}
                            onChange={(e) => updateSeo("title", e.target.value)}
                            placeholder="Project SEO title"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>SEO Description</label>
                        <textarea
                            maxLength={320}
                            rows={3}
                            className={inputClass}
                            value={form.seo.description ?? ""}
                            onChange={(e) => updateSeo("description", e.target.value)}
                            placeholder="Search engine description..."
                        />
                    </div>

                    <div>
                        <label className={labelClass}>SEO Image URL</label>
                        <input
                            type="url"
                            className={inputClass}
                            value={form.seo.image ?? ""}
                            onChange={(e) => updateSeo("image", e.target.value)}
                            placeholder="https://example.com/seo-image.jpg"
                        />
                    </div>
                </section>

                {/* Publishing Settings */}
                <section className="space-y-5 rounded-2xl border border-border bg-surface p-6">
                    <h2 className="text-lg font-semibold">Publishing Settings</h2>

                    <label className="flex items-center gap-3 text-sm">
                        <input
                            type="checkbox"
                            checked={form.isFeatured}
                            onChange={(e) =>
                                updateField("isFeatured", e.target.checked)
                            }
                            className="h-4 w-4 accent-primary"
                        />
                        Feature this project on the homepage
                    </label>

                    <div>
                        <label className={labelClass}>Sort Order</label>
                        <input
                            type="number"
                            step={1}
                            className={inputClass}
                            value={form.sortOrder}
                            onChange={(e) =>
                                updateField("sortOrder", Number(e.target.value))
                            }
                        />
                        <p className="mt-2 text-xs text-muted">
                            Lower numbers appear earlier when sorting by order.
                        </p>
                    </div>
                </section>

                {/* Actions */}
                <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
                    <button
                        type="button"
                        onClick={() => router.push("/admin/projects")}
                        className="rounded-xl border border-border px-6 py-3 text-sm font-medium"
                    >
                        Cancel
                    </button>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            type="submit"
                            value="draft"
                            disabled={isSaving}
                            className="rounded-xl border border-border px-6 py-3 text-sm font-medium disabled:opacity-50"
                        >
                            Save Draft
                        </button>

                        <button
                            type="submit"
                            value="published"
                            disabled={isSaving}
                            className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
                        >
                            {isSaving
                                ? "Saving..."
                                : mode === "create"
                                    ? "Publish Project"
                                    : "Update Project"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
