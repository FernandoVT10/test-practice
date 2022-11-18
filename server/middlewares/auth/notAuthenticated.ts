import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../utils/errors";
import getUserFromAuthToken from "./getUserFromAuthToken";

export const HOME_URL = "/";
export const FORBIDDEN_REQUEST = new ValidationError(
  403, "You can't access if you're authenticated"
);


/**
* This middleware let pass only not authenticated users
* @param [apiRoute=false] - If true instead or redirect it's going to response an error
*/
const notAuthenticated = (apiRoute = false) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authToken } = req.cookies;

  if(!authToken) return next();

  try {
    await getUserFromAuthToken(authToken);

    if(apiRoute) {
      return next(FORBIDDEN_REQUEST)
    }

    return res.redirect(HOME_URL);
  } catch {
    next();
  }
};

export default notAuthenticated;
