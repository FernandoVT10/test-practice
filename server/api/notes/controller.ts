import service from "./service";

import { HydratedDocument, Types } from "mongoose";
import { INote } from "../../models/Note";

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

export default {
  createNote,
  getUserNotes
};
