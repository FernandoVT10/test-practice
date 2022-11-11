import path from "path";
import dotenv from "dotenv";

export const PRODUCTION = process.env.NODE_ENV === "production";
export const DEVELOPMENT = process.env.NODE_ENV === "development";
export const TESTING = process.env.NODE_ENV === "test";

if(TESTING) {
  dotenv.config({
    path: path.resolve(__dirname, "../../.env.test")
  });
} else {
  dotenv.config();
}

export const ROOT_DIR = path.resolve(__dirname, "../../");
export const LOGFILES_DIR = path.resolve(ROOT_DIR, "logs");

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
export const MONGO_URI = process.env.MONGO_URI as string;
