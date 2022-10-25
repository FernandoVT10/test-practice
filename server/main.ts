import mongoose from "mongoose";
import next from "next";

import expressApp from "./app";

import { PRODUCTION } from "./config/constants";

const port = 3000;

const nextApp = next({ dev: !PRODUCTION });
const nextHandle = nextApp.getRequestHandler();

async function main() {
  try {
    console.log("Connecting to database...");
    await mongoose.connect("mongodb://localhost:27017/notes");

    console.log("Preparing next...");
    await nextApp.prepare();

    expressApp.all("*", (req, res) => {
      nextHandle(req, res);
    });

    expressApp.listen(port);

    console.log("Server running on http://localhost:3000");
  } catch (e) {
    console.error(e);
  }
}

main();
