import type { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError.js";

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const isOperationalError = error instanceof ApiError;

  const statusCode = isOperationalError ? error.statusCode : 500;

  const message = isOperationalError
    ? error.message
    : "Internal Server Error";

  if (!isOperationalError) {
    console.error("Unexpected API error:", error);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
