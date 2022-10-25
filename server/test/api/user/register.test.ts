import supertest, { Response } from "supertest";

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import app from "../../../app";
import User from "../../../models/User";

import { MongoMemoryServer } from "mongodb-memory-server";
import { faker } from "@faker-js/faker";

const request = supertest(app);

describe("/api/user/register", () => {
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongod.stop();
    await mongoose.disconnect();
  });

  const userData = {
    username: "jhon",
    password: "1234"
  };

  const expectValidationError = (res: Response, error: { field: string, message: string }) => {
    const { errors } = res.body;
    const { field, message } = error;

    expect(errors).toContainEqual({ field, message });
  };

  it("should register successfully", async () => {
    const { username, password } = userData;

    const res = await request.post("/api/user/register")
      .send({ username, password })
      .expect(200);

    expect(res.body.message).toBe("User was registered successfully");
    const user = await User.findOne({ username });
    expect(user).not.toBeNull();
    expect(await bcrypt.compare(password, user?.password || "")).toBeTruthy();
  });

  it.each([
    { testName: "is shorter than 4 characters", username: "123" },
    { testName: "is larger than 20 characters", username: faker.random.alpha(21) }
  ])("should response with an error when the username $testName", async ({ username }) => {
    const res = await request.post("/api/user/register")
      .send({
        username,
        password: userData.password
      })
      .expect(400);

    expectValidationError(res, {
      field: "username",
      message: "Username must have at least 4 characters"
    });
  });

  it("should response with an error when the password is null", async () => {
    const res = await request.post("/api/user/register")
      .send({
        username: userData.username,
        password: ""
      })
      .expect(400);

    expectValidationError(res, {
      field: "password",
      message: "Password is required"
    });
  });
});
