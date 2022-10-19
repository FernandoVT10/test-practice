import path from "path";

export const PRODUCTION = process.env.NODE_ENV === "production";

export const ROOT_DIR = path.resolve(__dirname, "../../");
export const LOGFILES_DIR = path.resolve(ROOT_DIR, "logs");
