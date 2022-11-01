import { HydratedDocument, Types } from "mongoose";

import Note, { INote } from "../../models/Note";

type CreateOneNoteData = {
  title: string,
  content: string,
  userId: Types.ObjectId
}

const createOneNote = (data: CreateOneNoteData): Promise<HydratedDocument<INote>> => {
  return Note.create({
    title: data.title,
    content: data.content,
    user: data.userId
  });
};

const getAllUserNotes = (userId: Types.ObjectId) => {
  return Note.find({ user: userId });
};

const existsUserNote = async (userId: Types.ObjectId, noteId: string): Promise<boolean> => {
  return await Note.findOne(
    { _id: noteId, user: userId }
  ) ? true : false;
};

const deleteNoteById = (noteId: string) => {
  return Note.findByIdAndDelete(noteId);
};

export default {
  createOneNote,
  getAllUserNotes,
  existsUserNote,
  deleteNoteById
};
