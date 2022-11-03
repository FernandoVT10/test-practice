import { authFactory, noteFactory, userFactory } from "../../factories";
import { testAuthorizationMiddleware } from "../shared";
import { request, connectDB } from "../../utils";

connectDB();

describe("GET /api/notes", () => {
  testAuthorizationMiddleware(() => {
    return request.get("/api/notes");
  });

  it("should response the user notes", async () => {
    const user = await userFactory.createUser();
    const anotherUser = await userFactory.createUser();

    const userNote = await noteFactory.createNote(user._id);
    await noteFactory.createNote(anotherUser._id);

    const authCookie = await authFactory.generateAuthCookie(user);

    const res = await request.get("/api/notes")
      .set("Cookie", authCookie);

    expect(res.statusCode).toBe(200);

    const notes = res.body;

    // we're authenticated as the user, so we just want to get the user's notes
    expect(notes).toHaveLength(1);
    expect(notes[0]).toMatchObject(userNote.toObject());
  });
});
