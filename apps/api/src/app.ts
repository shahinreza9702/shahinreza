import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

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
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Shahin Portfolio API is running.",
  });
});


// Handle unknown routes
app.use(notFound);

// Centralized error handler (must be registered last)
app.use(errorHandler);

export default app;
