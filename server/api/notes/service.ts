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

export default {
  createOneNote
};
