import jwt from "jsonwebtoken";
import authorize from "../authorize";
import mockExpress from "./__utils__/mockExpress";
import User from "../../models/User";

import { ValidationError } from "../../utils/errors";
import { JWT_SECRET_KEY } from "../../config/constants";

describe("middlewares/authorize", () => {
  const middleware = authorize();

  const findByIdSpy = jest.spyOn(User, "findById");

  beforeEach(() => jest.resetAllMocks());

  const getRequestWithCookies = (userId: number) => {
    const token = jwt.sign({ userId }, JWT_SECRET_KEY);

    return {
      cookies: { authToken: token }
    } as any;
  };

  const callMiddleware = async (req: any) => {
    const { res, next } = mockExpress();

    await middleware(req, res as any, next);

    return next;
  };

  it("should call next", async () => {
    const userId = 123;
    findByIdSpy.mockResolvedValueOnce({ _id: userId } as any);

    const req = getRequestWithCookies(userId);
    const next = await callMiddleware(req);

    expect(req.userId).toBe(userId);
    expect(next).toHaveBeenCalled();
  });

  describe("should call next with an error when", () => {
    it("the authToken cookie doesn't exist", async () => {
      const next = await callMiddleware({ cookies: {} });

      expect(next).toHaveBeenCalledWith(
        new ValidationError(401, "You need to be authenticated")
      );
    });

    it("the jsonwebtoken is invalid", async () => {
      const invalidToken = jwt.sign("invalid", "shhh");

      const req = {
        cookies: { authToken: invalidToken }
      };

      const next = await callMiddleware(req);

      expect(next).toHaveBeenCalledWith(
        new ValidationError(400, "Your request is invalid")
      );
    });

    it("findById returns null", async () => {
      findByIdSpy.mockResolvedValueOnce(null);

      const userId = 123;

      const req = getRequestWithCookies(userId);
      const next = await callMiddleware(req);

      expect(findByIdSpy).toHaveBeenCalledWith(userId);

      expect(next).toHaveBeenCalledWith(
        new ValidationError(400, "Your request is invalid")
      );
    });

    it("when findById throws an error", async () => {
      const error = new Error("error");
      findByIdSpy.mockRejectedValueOnce(error);

      const req = getRequestWithCookies(123);
      const next = await callMiddleware(req);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
