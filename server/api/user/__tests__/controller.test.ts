import controller from "../controller";
import service from "../service";
import bcrypt from "bcrypt";

import { ServerError } from "../../../utils/errors";

describe("api/user/controller", () => {
  describe("createUser", () => {
    const { createUser } = controller;

    const data = {
      username: "foo",
      password: "secret"
    };

    const createOneUserSpy = jest.spyOn(service, "createOneUser");

    beforeEach(() => {
      jest.resetAllMocks();

      createOneUserSpy.mockResolvedValueOnce({} as any);

      jest.spyOn(bcrypt, "hash")
        .mockImplementationOnce(() => Promise.resolve("hashed password"));
    });

    it("should return a successful message", () => {
      return expect(createUser(data)).resolves.toEqual({
        message: "User was registered successfully"
      });
    });

    it("should hash the password before sending it to the createOneUser", async () => {
      await createUser(data);

      expect(createOneUserSpy).toHaveBeenCalledWith(expect.objectContaining({
        password: "hashed password"
      }));
    });

    it("should throw a 'CustomError' when a function rejects", () => {
      const error = new Error("dummy");

      createOneUserSpy
        .mockReset()
        .mockRejectedValueOnce(error);

      return expect(createUser(data)).rejects.toThrowError(
        new ServerError(
          500,
          "There was an error trying to register the user",
          error
        )
      );
    });
  });
});
