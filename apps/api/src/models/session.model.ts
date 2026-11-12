
import mongoose, { InferSchemaType, Schema } from "mongoose";

const sessionSchema = new Schema(
  {
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    tokenHash: {
      type: String,
      required: true,
      unique: true,
      select: false,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Automatically remove expired sessions.
sessionSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 },
);

export type SessionDocument = InferSchemaType<typeof sessionSchema>;

const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);

export default Session;
