import mongoose from "mongoose";
import next from "next";

import expressApp from "./app";

import { DEVELOPMENT, MONGO_URI } from "./config/constants";

const port = 3000;

// we want to run next how production when testing with cypress
const nextApp = next({ dev: DEVELOPMENT });
const nextHandle = nextApp.getRequestHandler();

async function main() {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(MONGO_URI);

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
