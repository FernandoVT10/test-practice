import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { defineConfig } from "cypress";

dotenv.config({ path: path.resolve(__dirname, "./.env.test") });

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on) {
      on("task", {
        async cleanDB() {
          await mongoose.connect(process.env.MONGO_URI as string);
          await mongoose.connection.dropDatabase();

          return null;
        }
      });
    }
  }
});
