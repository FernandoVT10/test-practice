import api from "@utils/api";

export type Note = {
  _id: string,
  title: string,
  content: string
}

const getAllUserNotes = async (cookie: string): Promise<Note[]> => {
  const { statusCode, response } = await api.get("notes/", {
    cache: "no-cache",
    headers: { Cookie: cookie }
  });

  if(statusCode === 200) {
    return response;
  }

  return [];
};

type CommonNoteData = Pick<Note, "title" | "content">;

export type CreateNoteData = CommonNoteData;

const createNote = async (data: CreateNoteData): Promise<boolean> => {
  const { statusCode } = await api.post("/notes", data);
  return statusCode === 200;
};

export type UpdateNoteData = CommonNoteData;

const updateNote = async (
  noteId: Note["_id"],
  data: UpdateNoteData
): Promise<boolean> => {
  const { statusCode } = await api.put(`notes/${noteId}`, data);
  return statusCode === 200;
};

const deleteNote = async (noteId: Note["_id"]): Promise<boolean> => {
  const { statusCode } = await api.delete(`notes/${noteId}`);
  return statusCode === 200;
};

export default {
  getAllUserNotes,
  createNote,
  updateNote,
  deleteNote
};
