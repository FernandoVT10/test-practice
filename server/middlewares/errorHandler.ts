import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../utils/errors";
import logger from "../utils/logger";

// eslint-disable-next-line
const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if(err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  if(err instanceof Error) {
    logger.error(err);
  } else {
    // now the err variable can have something unexpected so when want to get as
    // much information as possible using the String constuctor and then passing it
    // to the logger
    logger.error(String(err));
  }

  res.status(500).json({
    message: "There was an internal server trying to complete your request"
  });
};

export default errorHandler;
