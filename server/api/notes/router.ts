import { Router } from "express";

import { body } from "express-validator";

import asyncHandler from "express-async-handler";
import authorize from "../../middlewares/authorize";
import checkValidation from "../../middlewares/checkValidation";
import controller from "./controller";

const router = Router();

router.get(
  "/notes",

  authorize(),

  asyncHandler(async (req, res) => {
    const notes = await controller.getUserNotes(req.userId);

    res.json(notes);
  })
);

router.post(
  "/notes",
  authorize(),

  body("title")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title must be 100 characters or shorter"),

  body("content")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Content is required")
    .isLength({ max: 5000 })
    .withMessage("Content must be 5000 characters or shorter"),

  checkValidation(),

  asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const userId = req.userId;

    const note = await controller.createNote({
      title, content, userId
    });

    res.json(note);
  })
);

export default router;
