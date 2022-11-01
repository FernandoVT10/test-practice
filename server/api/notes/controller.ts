import service from "./service";

import { HydratedDocument, isValidObjectId, Types } from "mongoose";
import { INote } from "../../models/Note";
import { ValidationError } from "../../utils/errors";

type CreateNoteData = {
  title: string,
  content: string,
  userId: Types.ObjectId
}

const createNote = (data: CreateNoteData): Promise<HydratedDocument<INote>> => {
  return service.createOneNote(data);
};

const getUserNotes = (userId: Types.ObjectId) => {
  return service.getAllUserNotes(userId);
};

const deleteNoteById = async (userId: Types.ObjectId, noteId: string): Promise<HydratedDocument<INote> | null> => {
  if(!isValidObjectId(noteId)) {
    throw new ValidationError(400, "The note id is invalid");
  }

  if(!await service.existsUserNote(userId, noteId)) {
    throw new ValidationError(400, "The note doesn't exist");
  }

  return service.deleteNoteById(noteId);
};

export default {
  createNote,
  getUserNotes,
  deleteNoteById
};
