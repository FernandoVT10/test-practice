import getUserFromAuthToken from "../getUserFromAuthToken";
import mockExpress from "../../../test/utils/mockExpress";

import notAuthenticated, { HOME_URL, FORBIDDEN_REQUEST } from "../notAuthenticated";

jest.mock("../getUserFromAuthToken");

describe("middlewares/auth/notAuthenticated", () => {
  const getUserFromAuthTokenMocked = jest.mocked(getUserFromAuthToken);
  
  const callMiddleware = async (
    middleware: any,
    authToken = "token"
  ) => {
    const { res, next } = mockExpress();

    const req = {
      cookies: { authToken }
    };

    await middleware(req as any, res, next);

    return { res, next };
  };

  describe("when apiRoute is false", () => {
    const middleware = notAuthenticated();

    it("should call next when there's no authToken", async () => {
      const { next } = await callMiddleware(middleware, "");

      expect(next).toHaveBeenCalled();
    });

    it("should redirect when getUserFromAuthToken doesn't throw", async () => {
      getUserFromAuthTokenMocked
        .mockResolvedValueOnce({} as any);

      const { res } = await callMiddleware(middleware);
      expect(res.redirect).toHaveBeenCalledWith(HOME_URL);
    });

    it("should call next if getUserFromAuthToken throws", async () => {
      getUserFromAuthTokenMocked.mockRejectedValueOnce(new Error);

      const { next } = await callMiddleware(middleware);
      expect(next).toHaveBeenCalled();
    });
  });

  describe("when apiRoute is true", () => {
    const middleware = notAuthenticated(true);

    it("should call next when there's no authToken", async () => {
      const { next } = await callMiddleware(middleware, "");
      expect(next).toHaveBeenCalled();
    });

    it("should call next with an error when getUserFromAuthToken doesn't throw", async () => {
      getUserFromAuthTokenMocked
        .mockResolvedValueOnce({} as any);

      const { next } = await callMiddleware(middleware);
      expect(next).toHaveBeenCalledWith(FORBIDDEN_REQUEST);
    });
  });
});
