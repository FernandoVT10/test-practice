import { Request, Response, NextFunction } from "express";
import getUserFromAuthToken from "./getUserFromAuthToken";

export const HOME_URL = "/";


/** This middleware let pass only not authenticated users */
const notAuthenticated = () => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authToken } = req.cookies;

  if(!authToken) return next();

  try {
    await getUserFromAuthToken(authToken);

    return res.redirect(HOME_URL);
  } catch { }

  next();
};

export default notAuthenticated;
