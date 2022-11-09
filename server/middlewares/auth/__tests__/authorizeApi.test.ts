import authorizeApi from "../authorizeApi";
import mockExpress from "../../../test/utils/mockExpress";
import getUserFromAuthToken from "../getUserFromAuthToken";

import { ValidationError } from "../../../utils/errors";

jest.mock("../getUserFromAuthToken");

describe("middlewares/auth/authorizeApi", () => {
  const middleware = authorizeApi();

  const getUserFromAuthTokenMocked = jest.mocked(getUserFromAuthToken);

  beforeEach(() => jest.resetAllMocks());

  const callMiddleware = async (authToken = "token") => {
    const { res, next } = mockExpress();

    const req = {
      cookies: { authToken }
    } as any;

    await middleware(req, res, next);

    return { req, next };
  };

  it("should call next", async () => {
    const userId = 123;
    getUserFromAuthTokenMocked
      .mockResolvedValueOnce({ _id: userId } as any);

    const { req, next } = await callMiddleware();

    expect(req.userId).toBe(userId);
    expect(next).toHaveBeenCalled();
  });

  describe("should call next with an error when", () => {
    it("the authToken cookie doesn't exist", async () => {
      const { next } = await callMiddleware("");

      expect(next).toHaveBeenCalledWith(
        new ValidationError(401, "You need to be authenticated")
      );
    });

    it("getUserFromAuthToken throws a error", async () => {
      const error = new Error("error");
      getUserFromAuthTokenMocked.mockRejectedValueOnce(error);

      const { next } = await callMiddleware();

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
