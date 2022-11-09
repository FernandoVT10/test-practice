import authorizePage, { LOGIN_URL } from "../authorizePage";

import getUserFromAuthToken from "../getUserFromAuthToken";
import mockExpress from "../../../test/utils/mockExpress";

import { ValidationError } from "../../../utils/errors";

jest.mock("../getUserFromAuthToken");

describe("middlewares/auth/authorizePage", () => {
  const middleware = authorizePage();

  const getUserFromAuthTokenMocked = jest.mocked(getUserFromAuthToken);

  const callMiddleware = async (authToken = "token") => {
    const { res, next } = mockExpress();

    const req = {
      cookies: { authToken }
    } as any;

    await middleware(req, res, next);

    return { res, next };
  };

  beforeEach(() => jest.resetAllMocks());

  it("should call next", async () => {
    getUserFromAuthTokenMocked.mockResolvedValueOnce({} as any);

    const { next } = await callMiddleware();

    expect(next).toHaveBeenCalled();
  });

  describe("should redirect when", () => {
    it("there's no authToken", async () => {
      const { res } = await callMiddleware("");

      expect(res.redirect).toHaveBeenCalledWith(LOGIN_URL);
    });

    it("getUserFromAuthToken throws a ValidationError", async () => {
      getUserFromAuthTokenMocked.mockRejectedValueOnce(
        new ValidationError(500, "error")
      );

      const { res } = await callMiddleware();

      expect(res.redirect).toHaveBeenCalledWith(LOGIN_URL);
    });
  });

  it("should call next with the error thrown by getUserFromAuthToken", async () => {
    const error = new Error("error");
    getUserFromAuthTokenMocked.mockRejectedValueOnce(error);

    const { next } = await callMiddleware();

    expect(next).toHaveBeenCalledWith(error);
  });
});
