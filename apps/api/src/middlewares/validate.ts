
import type { RequestHandler } from "express";
import type { ZodType } from "zod";
import ApiError from "../utils/ApiError.js";

const validate = (schema: ZodType): RequestHandler => {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => {
          const path = issue.path.join(".");
          return path ? `${path}: ${issue.message}` : issue.message;
        })
        .join(", ");

      return next(new ApiError(400, message));
    }

    req.body = result.data;
    next();
  };
};

export default validate;
