
import { createHash, randomBytes } from "node:crypto";
import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import Admin from "../models/admin.model.js";
import Session from "../models/session.model.js";
import ApiError from "../utils/ApiError.js";
import type { LoginInput } from "../validators/auth.validator.js";

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;
const COOKIE_NAME = "admin_session";

const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_DURATION,
});

const hashToken = (token: string): string =>
  createHash("sha256").update(token).digest("hex");

// Admin login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body as LoginInput;

    const admin = await Admin.findOne({ email }).select("+passwordHash");

    if (!admin || !admin.isActive) {
      throw new ApiError(401, "Invalid email or password.");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      admin.passwordHash,
    );

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password.");
    }

    const token = randomBytes(32).toString("hex");
    const tokenHash = hashToken(token);
    const expiresAt = new Date(Date.now() + SESSION_DURATION);

    await Session.create({
      admin: admin._id,
      tokenHash,
      expiresAt,
    });

    res.cookie(COOKIE_NAME, token, getCookieOptions());

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        admin: {
          id: admin._id,
          email: admin.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Admin logout
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.cookies?.[COOKIE_NAME];

    if (token) {
      await Session.deleteOne({
        tokenHash: hashToken(token),
      });
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    next(error);
  }
};

// Get current admin
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = req.cookies?.[COOKIE_NAME];

    if (!token) {
      throw new ApiError(401, "Authentication required.");
    }

    const session = await Session.findOne({
      tokenHash: hashToken(token),
      expiresAt: { $gt: new Date() },
    }).populate("admin", "email isActive");

    const admin = session?.admin as unknown as {
      _id: unknown;
      email: string;
      isActive: boolean;
    } | null;

    if (!admin || !admin.isActive) {
      throw new ApiError(401, "Invalid or expired session.");
    }

    res.status(200).json({
      success: true,
      data: {
        admin: {
          id: admin._id,
          email: admin.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
