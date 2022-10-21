import path from "path";
import dotenv from "dotenv";
dotenv.config();

export const PRODUCTION = process.env.NODE_ENV === "production";

export const ROOT_DIR = path.resolve(__dirname, "../../");
export const LOGFILES_DIR = path.resolve(ROOT_DIR, "logs");

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
