import validator from "../validator";
import service from "../service";
import logger from "../../../utils/logger";

import { Meta } from "express-validator";

const meta = {} as Meta;

describe("api/user/validator", () => {
  describe("isUsernameAvailable", () => {
    const findUserByUsernameSpy = jest.spyOn(service, "findUserByUsername");

    const { isUsernameAvailable } = validator;

    beforeEach(() => jest.resetAllMocks());

    it("should return true when findUserByUsername returns null", () => {
      findUserByUsernameSpy.mockResolvedValueOnce(null);

      return expect(isUsernameAvailable("dummy", meta)).resolves.toBeTruthy();
    });

    it("should throw an error when findUserByUsername doesn't return null", () => {
      findUserByUsernameSpy.mockResolvedValueOnce({} as any);

      return expect(isUsernameAvailable("dummy", meta))
        .rejects.toThrowError(new Error("The username already exists"));
    });

    it("should log the error thrown by findUserByUsername", async () => {
      // the mockImplementation overwrites the original implementation
      const logErrorSpy = jest.spyOn(logger, "error").mockImplementation();

      const error = new Error("error");
      findUserByUsernameSpy.mockRejectedValueOnce(error);

      await expect(isUsernameAvailable("dummy", meta))
        .rejects.toThrow();

      expect(logErrorSpy).toBeCalledWith(error);
    });
  });
});
