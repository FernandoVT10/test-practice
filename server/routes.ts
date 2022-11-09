import { Router } from "express";

import errorHandler from "./middlewares/errorHandler";
import apiRoutes from "./api";

import authorizePage from "./middlewares/auth/authorizePage";
import notAuthenticated from "./middlewares/auth/notAuthenticated";

const router = Router();

router.use(apiRoutes);

// pages with authentication required
// this pages are going to be handled first by the
// authorize page middleware and then handled by next js
router.get("/", authorizePage());

// pages that requires not to be authenticated
router.get("/login", notAuthenticated());
router.get("/register", notAuthenticated());

router.use(errorHandler);

export default router;
