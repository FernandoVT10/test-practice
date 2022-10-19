import { Router } from "express";
import asyncHandler from "express-async-handler";

import controller from "./controller";

const router = Router();

router.get("/tasks/", asyncHandler((_, res) => {
  const tasks = controller.getTasks();

  res.json(tasks);
}));

export default router;
