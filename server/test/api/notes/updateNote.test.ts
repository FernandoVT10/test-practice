import { request, connectDB } from "../../utils";
import { testAuthorizationMiddleware } from "../shared";
import { authFactory, noteFactory, userFactory } from "../../factories";
import { faker } from "@faker-js/faker";

connectDB();

describe("PUT /api/notes/:noteId", () => {
  testAuthorizationMiddleware(() => request.put("/api/notes/123"));

  const callApi = async (noteId: string, data?: object, user?: any) => {
    const authCookie = await authFactory.generateAuthCookie(user);
    return request.put(`/api/notes/${noteId}`)
      .send(data)
      .set("Cookie", authCookie);
  };

  it("should response the updated note", async () => {
    const user = await userFactory.createUser();
    const note = await noteFactory.createNote(user._id);

    const newData = {
      title: faker.random.words(3),
      content: faker.lorem.sentences(3)
    };

    const res = await callApi(note._id.toString(), newData, user);
    expect(res.statusCode).toBe(200);

    const updatedNote = res.body;
    expect(updatedNote).toMatchObject(newData);
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

    it("Title larger than 100 characters", async () => {
      const res = await callApi(
        faker.database.mongodbObjectId(),
        { title: faker.random.alpha(101) }
      );

      expect(res.statusCode).toBe(400);
      expect(res).toContainValidationError({
        field: "title",
        message: "Title must be 100 characters or shorter"
      });
    });

    it("Content is larger than 5000 characters", async () => {
      const res = await callApi(
        faker.database.mongodbObjectId(),
        { content: faker.random.alpha(5001) }
      );

      expect(res.statusCode).toBe(400);
      expect(res).toContainValidationError({
        field: "content",
        message: "Content must be 5000 characters or shorter"
      });
    });
  });
});
