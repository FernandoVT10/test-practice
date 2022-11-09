import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../utils/errors";
import getUserFromAuthToken from "./getUserFromAuthToken";

const authorizeApi = () => async (req: Request, _: Response, next: NextFunction) => {
  const { authToken } = req.cookies;

  if(!authToken) {
    return next(new ValidationError(401, "You need to be authenticated"));
  }

  try {
    const user = await getUserFromAuthToken(authToken);

    req.userId = user._id;

    next();
  } catch (error) {
    next(error);
  }
};

export default authorizeApi;
