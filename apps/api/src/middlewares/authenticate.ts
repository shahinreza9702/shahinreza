
import { createHash } from "node:crypto";
import type { RequestHandler } from "express";

import Admin from "../models/admin.model.js";
import Session from "../models/session.model.js";
import ApiError from "../utils/ApiError.js";

const COOKIE_NAME = "admin_session";

const hashToken = (token: string): string =>
  createHash("sha256").update(token).digest("hex");

const authenticate: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies?.[COOKIE_NAME];

    if (!token || typeof token !== "string") {
      throw new ApiError(401, "Authentication required.");
    }

    const session = await Session.findOne({
      tokenHash: hashToken(token),
      expiresAt: { $gt: new Date() },
    });

    if (!session) {
      throw new ApiError(401, "Invalid or expired session.");
    }

    const admin = await Admin.findOne({
      _id: session.admin,
      isActive: true,
    }).select("_id email");

    if (!admin) {
      await Session.deleteOne({ _id: session._id });
      throw new ApiError(401, "Admin account is inactive.");
    }

    res.locals.admin = {
      id: admin._id,
      email: admin.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
