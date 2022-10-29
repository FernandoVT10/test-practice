import { Response } from "supertest";

import bcrypt from "bcrypt";
import User from "../../../models/User";

import { JWT_SECRET_KEY } from "../../../config/constants";

import jwt, { JwtPayload } from "jsonwebtoken";
import { connectDB, request } from "../../utils";

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
      // saving the hashed password as it's going to be saved by the register route
      password: await bcrypt.hash(userData.password, 1)
    });

    userId = user.id;
  });

  const getAuthTokenFromCookies = (res: Response): string => {
    const cookieString = res.headers["set-cookie"][0];
    const authTokenString = cookieString.split(";")[0];
    return authTokenString.replace("authToken=", "");
  };

  it("should set a cookie with a jsonwebtoken", async () => {
    const res = await request.post("/api/user/login")
      .send(userData)
      .expect(200);

    const token = getAuthTokenFromCookies(res);
    const data = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;

    expect(data.userId).toBe(userId);
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

    it("Password is incorrect", async () => {
      const res = await request.post("/api/user/login")
        .send({ username: userData.username, password: "secret" })
        .expect(400);

      expect(res.body.message).toBe("Username or password are invalid");
    });
  });
});
