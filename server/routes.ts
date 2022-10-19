import { Router } from "express";

import errorHandler from "./middlewares/errorHandler";
import apiRoutes from "./api";

const router = Router();

router.use(apiRoutes);

router.use(errorHandler);

export default router;
