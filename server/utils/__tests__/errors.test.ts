import { ServerError } from "../errors";

describe("utils/errorw", () => {
  describe("ServerError - getCauseMessage method", () => {
    describe("when the cause is an error", () => {
      it("should return its stack if defined", () => {
        const error = new Error("dummy error");

        const customError = new ServerError(404, "dummy", error);

        expect(customError.getCauseMessage()).toBe(error.stack);
      });

      it("should return its message if stack is undefined", () => {
        const error = new Error("dummy error");
        // if for some reason the stack is undefined
        error.stack = undefined;

        const customError = new ServerError(404, "dummy", error);

        expect(customError.getCauseMessage()).toBe(error.message);
      });
    });

    it("when the cause is no an error, it should call String with the cause and return it", () => {
      const obj = {
        text: "dummy"
      };

      const customError = new ServerError(404, "dummy", obj);

      expect(customError.getCauseMessage()).toBe(String(obj));
    });
  });
});
