import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../utils/errors";

import getUserFromAuthToken from "./getUserFromAuthToken";

export const LOGIN_URL = "/login";

const redirect = (res: Response) => res.redirect(LOGIN_URL);

const authorizePage = () => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authToken } = req.cookies;

  if(!authToken) return redirect(res);

  try {
    await getUserFromAuthToken(authToken);

    next();
  } catch (error) {
    if(error instanceof ValidationError) {
      return redirect(res);
    }

    next(error);
  }
};

export default authorizePage;
