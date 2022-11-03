import { testAuthorizationMiddleware } from "../shared";
import { request, connectDB } from "../../utils";
import { faker } from "@faker-js/faker";

import { authFactory } from "../../factories";

connectDB();

describe("POST /api/notes", () => {
  const callApi = async (data: object) => {
    const authCookie = await authFactory.generateAuthCookie();

    return request.post("/api/notes")
      .send(data)
      .set("Cookie", authCookie);
  };

  testAuthorizationMiddleware(() => request.post("/api/notes"));

  it("should create a note", async () => {
    const noteData = {
      title: "note #1",
      content: "dummy"
    };

    const res = await callApi(noteData);
    expect(res.statusCode).toBe(200);

    const createdNote = res.body;
    expect(createdNote).toMatchObject(noteData);
  });

  describe("should response with an error when", () => {
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
