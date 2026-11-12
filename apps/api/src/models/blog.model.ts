
import { InferSchemaType, model, models, Schema } from "mongoose";

const blogContentBlockSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["paragraph", "heading", "image", "list", "quote", "code"],
      required: true,
    },
    text: {
      type: String,
      trim: true,
    },
    headingLevel: {
      type: Number,
      enum: [2, 3],
    },
    url: {
      type: String,
      trim: true,
    },
    alt: {
      type: String,
      trim: true,
    },
    caption: {
      type: String,
      trim: true,
    },
    listStyle: {
      type: String,
      enum: ["ordered", "unordered"],
    },
    items: {
      type: [String],
      default: undefined,
    },
    language: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const blogSeoSchema = new Schema(
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

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
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
      maxlength: 80,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 320,
    },
    content: {
      type: [blogContentBlockSchema],
      default: [],
    },
    coverImage: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      required: true,
    },
    seo: {
      type: blogSeoSchema,
      default: () => ({}),
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type BlogDocument = InferSchemaType<typeof blogSchema>;

const Blog = models.Blog || model("Blog", blogSchema);

export default Blog;
