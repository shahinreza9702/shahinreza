import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import connectDB from "../src/config/db.js";
import Admin from "../src/models/admin.model.js";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));

const envResult = dotenv.config({
    path: path.resolve(scriptDirectory, "../.env"),
    override: true,
});

if (envResult.error) {
    throw envResult.error;
}


const createAdmin = async (): Promise<void> => {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
        throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");
    }

    if (password.length < 12 || password.length > 128) {
        throw new Error("Admin password must be 12–128 characters.");
    }

    await connectDB();

    const existingAdmin = await Admin.findOne();

    if (existingAdmin) {
        console.log("An admin account already exists. No account was created.");
        return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await Admin.create({
        email,
        passwordHash,
        isActive: true,
    });

    console.log("Admin account created successfully.");
};

void createAdmin()
    .catch((error: unknown) => {
        console.error("Admin initialization failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.disconnect();
    });
