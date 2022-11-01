import { authFactory, userFactory } from "../../factories";
import { testAuthorizationMiddleware } from "../shared";
import { request, connectDB } from "../../utils";
import { faker } from "@faker-js/faker";

import Note from "../../../models/Note";

connectDB();

describe("GET /api/notes", () => {
  testAuthorizationMiddleware(() => {
    return request.get("/api/notes");
  });

  it("should response the user notes", async () => {
    const user = await userFactory.createUser();
    const anotherUser = await userFactory.createUser();

    const notes = [
      {
        title: faker.random.words(3),
        content: faker.lorem.sentences(),
        user: user._id
      },
      {
        title: faker.random.words(3),
        content: faker.lorem.sentences(),
        user: anotherUser._id
      }
    ];

    await Note.create(notes);

    const authCookie = await authFactory.generateAuthCookie(user);

    const res = await request.get("/api/notes")
      .set("Cookie", authCookie);

    expect(res.statusCode).toBe(200);

    // we're authenticated as the user, so we just want to get the user's notes
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toMatchObject(notes[0]);
  });
});
