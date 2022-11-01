import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../utils/errors";
import { JwtPayload } from "jsonwebtoken";

import User from "../models/User";

import jwtHelpers from "../utils/jwtHelpers";

const requestInvalid = (next: NextFunction): void => {
  next(new ValidationError(400, "Your request is invalid"));
};

const authorize = () => async (req: Request, _: Response, next: NextFunction) => {
  const { authToken } = req.cookies;

  if(!authToken) {
    return next(new ValidationError(401, "You need to be authenticated"));
  }

  let decoded: JwtPayload;

  try {
    decoded = await jwtHelpers.verifyToken(authToken) as JwtPayload;
  } catch {
    return requestInvalid(next);
  }

  const { userId } = decoded;

  try {
    const user = await User.findById(userId);

    if(!user) {
      return requestInvalid(next);
    }

    req.userId = user._id;
    next();
  } catch (err) {
    return next(err);
  }
};

export default authorize;
