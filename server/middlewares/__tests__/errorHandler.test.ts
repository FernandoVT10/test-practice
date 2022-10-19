import errorHandler from "../errorHandler";
import logger from "../../utils/logger";

import { CustomError } from "../../utils/error";

const mockExpress = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  };

  const req = {};

  const next = jest.fn();

  return { res, req, next };
};

describe("middlewares/errorHandler", () => {
  const loggerSpy = jest.spyOn(logger, "error");

  beforeEach(() => {
    jest.resetAllMocks();

    // we need to overwrite the original logger implementation
    loggerSpy.mockImplementation();
  });

  const callMiddleware = (error: any) => {
    const mockedExpress = mockExpress();
    const { req, res, next } = mockedExpress;

    errorHandler(error, req as any, res as any, next);
    
    return mockedExpress;
  };

  describe("when the error is instance of CustomError", () => {
    const customError = new CustomError(
      500, "There was a server error", new Error("dummy error")
    );

    it("should call the logger with the cause message", () => {
      callMiddleware(customError);
      expect(loggerSpy).toHaveBeenCalledWith(customError.getCauseMessage());
    });

    it("should send a response to the user", () => {
      const { res } = callMiddleware(customError);

      expect(res.status).toHaveBeenCalledWith(customError.statusCode);
      expect(res.json).toHaveBeenCalledWith({
        message: customError.message
      });
    });
  });

  it("should call the logger with the error if it's instance of Error", () => {
    const error = new Error("dummy");
    callMiddleware(error);

    expect(loggerSpy).toHaveBeenCalledWith(error);
  });

  it("should call the logger when the error is not instance of Error or CustomError", () => {
    // if it's the case that the error is not instance of the Error,
    // so we need to get as much information as possible,
    // to do that we going to pass the object or whatever into of String and then call the logger
    const object = { holi: "17" };

    callMiddleware(object);

    expect(loggerSpy).toHaveBeenCalledWith(String(object));
  });

  it("when the error isn't instance of CustomError, it should send an 500 error to the user", () => {
    const error = new Error;
    const { res } = callMiddleware(error);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "There was an internal server trying to complete your request"
    });
  });
});
