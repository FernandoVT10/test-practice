import jwt from "jsonwebtoken";
import User from "../../../models/User";
import jwtHelpers from "../../../utils/jwtHelpers";

import getUserFromAuthToken, { INVALID_REQUEST_ERROR } from "../getUserFromAuthToken";

describe("middlewares/auth/getUserFromAuthToken", () => {
  const findByIdSpy = jest.spyOn(User, "findById");

  beforeEach(() => jest.resetAllMocks());

  const getAuthToken = (userId: number): Promise<string> => {
    return jwtHelpers.signToken({ userId });
  };

  it("should return the user", async () => {
    const mockUser = {
      _id: 123
    };
    findByIdSpy.mockResolvedValueOnce(mockUser as any);

    const authToken = await getAuthToken(123);

    return expect(
      getUserFromAuthToken(authToken)
    ).resolves.toEqual(mockUser);
  });

  it("should throw if the auth token is invalid", () => {
    const invalidToken = jwt.sign("invalid", "shhh");

    return expect(
      getUserFromAuthToken(invalidToken)
    ).rejects.toThrowError(INVALID_REQUEST_ERROR);
  });

  it("should throw if findById returns null", async () => {
    findByIdSpy.mockResolvedValueOnce(null);

    const userId = 123;
    const authToken = await getAuthToken(userId);

    await expect(
      getUserFromAuthToken(authToken)
    ).rejects.toThrowError(INVALID_REQUEST_ERROR);

    expect(findByIdSpy).toHaveBeenCalledWith(userId);
  });
});
