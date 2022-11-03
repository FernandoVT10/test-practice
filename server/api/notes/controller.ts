import service from "./service";

import { HydratedDocument, Types } from "mongoose";
import { INote } from "../../models/Note";
import { ValidationError } from "../../utils/errors";

type BaseData = {
  title: string,
  content: string
}

type CreateNoteData = BaseData & {
  userId: Types.ObjectId
}

const createNote = (data: CreateNoteData): Promise<HydratedDocument<INote>> => {
  return service.createOneNote(data);
};

const getUserNotes = (userId: Types.ObjectId) => {
  return service.getAllUserNotes(userId);
};

const checkNoteIdIsValid = async (userId: Types.ObjectId, noteId: string) => {
  if(!await service.existsUserNote(userId, noteId)) {
    throw new ValidationError(400, "The note doesn't exist");
  }
};

const updateNoteById = async (
  userId: Types.ObjectId,
  noteId: string,
  data: BaseData
): Promise<HydratedDocument<INote>> => {
  await checkNoteIdIsValid(userId, noteId);

  return await service.updateNoteById(noteId, data) as HydratedDocument<INote>;
};

const deleteNoteById = async (
  userId: Types.ObjectId,
  noteId: string
): Promise<HydratedDocument<INote> | null> => {
  await checkNoteIdIsValid(userId, noteId);

  return service.deleteNoteById(noteId);
};

export default {
  createNote,
  getUserNotes,
  updateNoteById,
  deleteNoteById
};
