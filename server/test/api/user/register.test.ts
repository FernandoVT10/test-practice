import bcrypt from "bcrypt";

import { faker } from "@faker-js/faker";
import { HydratedDocument } from "mongoose";
import { connectDB, request } from "../../utils";

import User, { IUser } from "../../../models/User";

connectDB();

describe("/api/user/register", () => {
  const userData = {
    username: "jhon",
    password: "1234"
  };

  it("should register successfully", async () => {
    const { username, password } = userData;

    const res = await request.post("/api/user/register")
      .send({ username, password })
      .expect(200);

    expect(res.body.message).toBe("User was registered successfully");
    const user = await User.findOne({ username }) as HydratedDocument<IUser>;
    expect(user).not.toBeNull();
    expect(await bcrypt.compare(password, user.password)).toBeTruthy();
  });

  describe("should response with an error when", () => {
    it.each([
      { testName: "is shorter than 4 characters", username: "123" },
      { testName: "is larger than 20 characters", username: faker.random.alpha(21) }
    ])("username $testName", async ({ username }) => {
      const res = await request.post("/api/user/register")
        .send({ username })
        .expect(400);

      expect(res).toContainValidationError({
        field: "username",
        message: "Username must have at least 4 characters"
      });
    });

    it("password is null", async () => {
      const res = await request.post("/api/user/register")
        .send({ password: "" })
        .expect(400);

      expect(res).toContainValidationError({
        field: "password",
        message: "Password is required"
      });
    });
  });
});
