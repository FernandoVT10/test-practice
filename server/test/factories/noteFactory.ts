import { HydratedDocument, Types } from "mongoose";

import { faker } from "@faker-js/faker";
import Note, { INote } from "../../models/Note";

const createNote = (userId: Types.ObjectId): Promise<HydratedDocument<INote>> => {
  return Note.create({
    title: faker.random.words(3),
    content: faker.lorem.sentences(),
    user: userId
  });
};

export default {
  createNote
};
