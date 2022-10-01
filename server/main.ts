import express from "express";
import next from "next";

const app = express();

const dev = process.env.NODE_ENV !== "production";
const port = 3000;

const nextApp = next({ dev });
const nextHandle = nextApp.getRequestHandler();

async function main() {
  try {
    await nextApp.prepare();

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
