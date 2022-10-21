import express from "express";
import mongoose from "mongoose";
import next from "next";
import cookieParser from "cookie-parser";

import routes from "./routes";

import { PRODUCTION } from "./config/constants";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = 3000;

const nextApp = next({ dev: !PRODUCTION });
const nextHandle = nextApp.getRequestHandler();

async function main() {
  try {
    console.log("Connecting to database...");
    await mongoose.connect("mongodb://localhost:27017/notes");

    console.log("Preparing next...");
    await nextApp.prepare();

    app.use(routes);

    app.all("*", (req, res) => {
      nextHandle(req, res);
    });

    app.listen(port);

    console.log("Server running on http://localhost:3000");
  } catch (e) {
    console.error(e);
  }
}

main();
