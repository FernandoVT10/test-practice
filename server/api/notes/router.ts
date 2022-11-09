import { Router } from "express";

import { body, param } from "express-validator";

import asyncHandler from "express-async-handler";
import authorizeApi from "../../middlewares/auth/authorizeApi";
import checkValidation from "../../middlewares/checkValidation";
import controller from "./controller";

const router = Router();

router.get(
  "/notes",

  authorizeApi(),

  asyncHandler(async (req, res) => {
    const notes = await controller.getUserNotes(req.userId);

    res.json(notes);
  })
);

const validateTitle = () => body("title")
  .isLength({ max: 100 })
  .withMessage("Title must be 100 characters or shorter");

const validateContent = () => body("content")
  .isLength({ max: 5000 })
  .withMessage("Content must be 5000 characters or shorter");

router.post(
  "/notes",
  authorizeApi(),

  validateTitle()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Title is required"),

  validateContent()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Content is required"),

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

const validateNoteIdParam = () => param("noteId")
  .isMongoId()
  .withMessage("The note id is invalid");

router.put(
  "/notes/:noteId",

  authorizeApi(),

  validateNoteIdParam(),
  validateTitle(),
  validateContent(),

  checkValidation(),

  asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const { userId } = req;
    const { noteId } = req.params;

    const updatedNote = await controller.updateNoteById(
      userId,
      noteId,
      { title, content }
    );

    res.json(updatedNote);
  })
);

router.delete(
  "/notes/:noteId",

  authorizeApi(),

  validateNoteIdParam(),

  checkValidation(),

  asyncHandler(async (req, res) => {
    const { noteId } = req.params;

    const deletedNote = await controller.deleteNoteById(req.userId, noteId);

    res.json(deletedNote);
  })
);

export default router;
