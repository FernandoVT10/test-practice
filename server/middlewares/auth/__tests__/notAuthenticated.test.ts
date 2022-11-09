import getUserFromAuthToken from "../getUserFromAuthToken";
import mockExpress from "../../../test/utils/mockExpress";

import notAuthenticated, { HOME_URL } from "../notAuthenticated";

jest.mock("../getUserFromAuthToken");

describe("middlewares/auth/notAuthenticated", () => {
  const middleware = notAuthenticated();

  const getUserFromAuthTokenMocked = jest.mocked(getUserFromAuthToken);
  
  const callMiddleware = async (authToken = "token") => {
    const { res, next } = mockExpress();

    const req = {
      cookies: { authToken }
    };

    await middleware(req as any, res, next);

    return { res, next };
  };

  it("should call next when there's no authToken", async () => {
    const { next } = await callMiddleware("");

    expect(next).toHaveBeenCalled();
  });

  it("should redirect when getUserFromAuthToken doesn't throw an user", async () => {
    getUserFromAuthTokenMocked
      .mockResolvedValueOnce({} as any);

    const { res } = await callMiddleware();
    expect(res.redirect).toHaveBeenCalledWith(HOME_URL);
  });

  it("should call next if getUserFromAuthToken throws", async () => {
    getUserFromAuthTokenMocked.mockRejectedValueOnce(new Error);

    const { next } = await callMiddleware();
    expect(next).toHaveBeenCalled();
  });
});
