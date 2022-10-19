import { Router } from "express";
import { body } from "express-validator";
import asyncHandler from "express-async-handler";

import controller from "./controller";
import validator from "./validator";
import checkValidation from "../../middlewares/checkValidation";

const router = Router();

router.post(
  "/user/register",
  body("username")
    .isLength({ min: 4, max: 20 })
    .withMessage("Username must have at least 4 characters")
    .custom(validator.isUsernameAvailable),

  body("password")
    .exists({ checkNull: true, checkFalsy: true }).withMessage("Password is required"),

  checkValidation,

  asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const response = await controller.createUser({ username, password });

    res.json(response);
  })
);

export default router;
