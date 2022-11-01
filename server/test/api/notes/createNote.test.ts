import { request, connectDB } from "../../utils";

import { faker } from "@faker-js/faker";

import User from "../../../models/User";
import Note from "../../../models/Note";
import jwtHelpers from "../../../utils/jwtHelpers";

connectDB();

const createAuthToken = async (): Promise<string> => {
  const { _id: userId } = await User.create({
    username: "john",
    password: 1234
  });

  return jwtHelpers.signToken({ userId });
};

describe("POST /api/notes", () => {
  const callApi = async (data: object) => {
    const token = await createAuthToken();

    return request.post("/api/notes")
      .send(data)
      .set("Cookie", `authToken=${token}`);
  };

  it("should create a note", async () => {
    const noteData = {
      title: "note #1",
      content: "dummy"
    };

    const res = await callApi(noteData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(noteData);

    const note = await Note.findOne(noteData);
    expect(note).not.toBeNull();
  });

  describe("should response with an error when", () => {
    it("There's no authorization cookie", async () => {
      const res = await request.post("/api/notes").expect(401);

      expect(res.body.message).toBe("You need to be authenticated");
    });

    it("Title is empty", async () => {
      const res = await callApi({ title: "" });

      expect(res.statusCode).toBe(400);
      expect(res).toContainValidationError({
        field: "title",
        message: "Title is required"
      });
    });

    it("Title larger than 100 characters", async () => {
      const res = await callApi({ title: faker.random.alpha(101) });

      expect(res.statusCode).toBe(400);
      expect(res).toContainValidationError({
        field: "title",
        message: "Title must be 100 characters or shorter"
      });
    });

    it("Content is empty", async () => {
      const res = await callApi({ content: "" });

      expect(res.statusCode).toBe(400);
      expect(res).toContainValidationError({
        field: "content",
        message: "Content is required"
      });
    });

    it("Content is larger than 5000 characters", async () => {
      const res = await callApi({ content: faker.random.alpha(5001) });

      expect(res.statusCode).toBe(400);
      expect(res).toContainValidationError({
        field: "content",
        message: "Content must be 5000 characters or shorter"
      });
    });
  });
});
