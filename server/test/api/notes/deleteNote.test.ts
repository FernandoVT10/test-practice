import { faker } from "@faker-js/faker";
import { connectDB, request } from "../../utils";
import { testAuthorizationMiddleware } from "../shared";
import { authFactory, noteFactory, userFactory } from "../../factories";

connectDB();

describe("DELETE /api/notes/:noteId", () => {
  testAuthorizationMiddleware(() => request.delete(
    `/api/notes/${faker.database.mongodbObjectId()}`
  ));

  const callApi = async (noteId: string, user?: any) => {
    const authCookie = await authFactory.generateAuthCookie(user);
    return request.delete(`/api/notes/${noteId}`)
      .set("Cookie", authCookie);
  };

  it("should response the deleted note", async () => {
    const user = await userFactory.createUser();
    const note = await noteFactory.createNote(user._id);

    const res = await callApi(note._id.toString(), user);

    expect(res.statusCode).toBe(200);

    expect(res.body).toMatchObject(note.toObject());
  });

  describe("should response with an error when", () => {
    it("Note Id is invalid", async () => {
      const res = await callApi("123");

      expect(res.statusCode).toBe(400);

      expect(res).toContainValidationError({
        field: "noteId",
        message: "The note id is invalid"
      });
    });

    it("The note doesn't exist", async () => {
      const res = await callApi(faker.database.mongodbObjectId());

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("The note doesn't exist");
    });

    it("The note owner isn't the user", async () => {
      const anotherUser = await userFactory.createUser();
      const note = await noteFactory.createNote(anotherUser._id);

      const res = await callApi(note._id.toString());

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("The note doesn't exist");

    });
  });
});
