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

export type CreateNoteData = {
  title: string,
  content: string
}

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

export default {
  getAllUserNotes,
  createNote
};
