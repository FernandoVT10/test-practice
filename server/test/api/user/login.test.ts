import bcrypt from "bcrypt";
import connectDB from "../../utils/connectDB";
import request from "../../utils/request";
import User from "../../../models/User";

import { JWT_SECRET_KEY } from "../../../config/constants";

import jwt, { JwtPayload } from "jsonwebtoken";

connectDB();

describe("/api/user/login", () => {
  const userData = {
    username: "jhon",
    password: "1234"
  };

  let userId: string;

  beforeEach(async () => {
    const user = await User.create({
      username: userData.username,
      password: await bcrypt.hash(userData.password, 1)
    });

    userId = user.id;
  });

  it("should set a cookie with the jwt token", async () => {
    const res = await request.post("/api/user/login")
      .send(userData)
      .expect(200);

    const token = res.headers["set-cookie"][0].split(";")[0].replace("authToken=", "");
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;

    expect(decoded.userId).toBe(userId);
  });

  describe("should response with an error when", () => {
    it("Username is empty", async () => {
      const res = await request.post("/api/user/login")
        .send({ username: "", password: userData.password })
        .expect(400);

      expect(res).toContainValidationError({
        field: "username",
        message: "Username is required"
      });
    });

    it("Username doesn't exists", async () => {
      const res = await request.post("/api/user/login")
        .send({ username: "dummy", password: userData.password })
        .expect(400);

      expect(res.body.message).toBe("Username or password are invalid");
    });

    it("Password is empty", async () => {
      const res = await request.post("/api/user/login")
        .send({ username: userData.username, password: "" })
        .expect(400);

      expect(res).toContainValidationError({
        field: "password",
        message: "Password is required"
      });
    });

    it.todo("Password doesn't match");
  });
});
