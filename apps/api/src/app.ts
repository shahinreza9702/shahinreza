
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import blogRoutes from "./routes/blog.routes.js";
import projectRoutes from "./routes/project.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminBlogRoutes from "./routes/adminBlog.routes.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Shahin Portfolio API is running.",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/admin/blogs", adminBlogRoutes);

app.use("/api/blogs", blogRoutes);
app.use("/api/projects", projectRoutes);

// Handle unknown routes
app.use(notFound);

// Centralized error handler (must be registered last)
app.use(errorHandler);

export default app;
