import { Schema, model } from "mongoose";

export interface INote {
  title: string,
  content: string,
  user: Schema.Types.ObjectId
}

const noteSchema = new Schema<INote>({
  title: {
    type: String,
    maxLength: 50,
    required: true
  },
  content: {
    type: String,
    maxLength: 5000,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Note = model<INote>("Note", noteSchema);

export default Note;
