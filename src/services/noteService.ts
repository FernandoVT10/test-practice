import api from "@utils/api";

export type Note = {
  _id: string,
  title: string,
  content: string
}

const getAllUserNotes = async (cookie: string): Promise<Note[]> => {
  try {
    const { statusCode, response } = await api.get("notes/", {
      cache: "no-cache",
      headers: { Cookie: cookie }
    });

    if(statusCode === 200) {
      return response;
    }

    return [];
  } catch (error) {
    return [];
  }
};

type CommonNoteData = Pick<Note, "title" | "content">;

export type CreateNoteData = CommonNoteData;

const createNote = async (data: CreateNoteData): Promise<boolean> => {
  try {
    const { statusCode } = await api.post("/notes", data);

    if(statusCode === 200) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
};

export type UpdateNoteData = CommonNoteData;

const updateNote = async (
  noteId: Note["_id"],
  data: UpdateNoteData
): Promise<boolean> => {
  try {
    const { statusCode } = await api.put(`notes/${noteId}`, data);

    if(statusCode === 200) return true;

    return false;
  } catch {
    return false;
  }
};

const deleteNote = async (noteId: Note["_id"]): Promise<boolean> => {
  try {
    const { statusCode } = await api.delete(`notes/${noteId}`);

    if(statusCode === 200) return true;

    return false;
  } catch {
    return false;
  }
};

export default {
  getAllUserNotes,
  createNote,
  updateNote,
  deleteNote
};
