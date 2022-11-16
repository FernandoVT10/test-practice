import { headers } from "next/headers";
import Home from "@domain/Home";
import noteService from "@services/noteService";

export default async function Page() {
  const nextHeaders = headers();

  const notes = await noteService.getAllUserNotes(
    nextHeaders.get("cookie") || ""
  );

  return <Home notes={notes}/>;
}
