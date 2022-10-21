import { Router } from "express";
import { body } from "express-validator";
import asyncHandler from "express-async-handler";

import controller from "./controller";
import validator from "./validator";
import checkValidation from "../../middlewares/checkValidation";

const router = Router();

const sharedMiddlewares = [
  body("password")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Password is required"),

  checkValidation(),
];

router.post(
  "/user/register",

  body("username")
    .isLength({ min: 4, max: 20 })
    .withMessage("Username must have at least 4 characters")
    .custom(validator.isUsernameAvailable),

  ...sharedMiddlewares,

  asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const response = await controller.createUser({ username, password });

    res.json(response);
  })
);

router.post(
  "/user/login",

  body("username")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Username is required"),

  ...sharedMiddlewares,

  asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const token = await controller.getAuthToken({ username, password });

    res.cookie("authToken", token, { httpOnly: true, secure: true });

    res.json({
      message: "You have been logged in successfully"
    });
  })
);

export default router;
