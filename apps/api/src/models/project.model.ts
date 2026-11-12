
import { InferSchemaType, model, models, Schema } from "mongoose";

const projectImageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    alt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    caption: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const projectSeoSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 320,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 160,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    filterCategory: {
      type: String,
      enum: ["Web App", "Website", "E-commerce", "Blog"],
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    overview: {
      type: String,
      required: true,
      trim: true,
    },
    focus: {
      type: String,
      required: true,
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      default: [],
    },
    images: {
      type: [projectImageSchema],
      default: [],
    },
    socialImage: {
      type: String,
      trim: true,
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    displayStatus: {
      type: String,
      trim: true,
      default: "Personal Project",
      maxlength: 60,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    seo: {
      type: projectSeoSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

projectSchema.index({ isFeatured: -1, sortOrder: 1 });

export type ProjectDocument = InferSchemaType<typeof projectSchema>;

const Project = models.Project || model("Project", projectSchema);

export default Project;
