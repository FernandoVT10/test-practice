import { Router } from "express";

import taskRouter from "./task/router";
import userRouter from "./user/router";

const router = Router();

router.use("/api/", taskRouter);
router.use("/api/", userRouter);

export default router;
