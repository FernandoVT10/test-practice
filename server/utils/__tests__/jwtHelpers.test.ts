import jwt, { JsonWebTokenError } from "jsonwebtoken";
import jwtHelpers from "../jwtHelpers";

import { JWT_SECRET_KEY } from "../../config/constants";

describe("utils/jwtHelpers", () => {
  describe("verifyToken", () => {
    const { verifyToken } = jwtHelpers;

    it("should resolve with the decoded data", () => {
      const data = { foo: "dummy" };
      const token = jwt.sign(data, JWT_SECRET_KEY);

      return expect(verifyToken(token))
        .resolves.toMatchObject(data);
    });

    it("should reject", () => {
      return expect(verifyToken("invalid token"))
        .rejects.toBeInstanceOf(JsonWebTokenError);
    });
  });
});
