import { Router } from "express";

import notesRouter from "./notes/router";
import userRouter from "./user/router";

const router = Router();

router.use("/api/", notesRouter);
router.use("/api/", userRouter);

export default router;
