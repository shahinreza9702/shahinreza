
import mongoose, { InferSchemaType, Schema } from "mongoose";

const adminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type AdminDocument = InferSchemaType<typeof adminSchema>;

const Admin =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;
