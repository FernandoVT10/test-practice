import jwtHelpers from "../../utils/jwtHelpers";

import { HydratedDocument } from "mongoose";
import { JwtPayload } from "jsonwebtoken";
import { ValidationError } from "../../utils/errors";

import User, { IUser } from "../../models/User";

export const INVALID_REQUEST_ERROR = new ValidationError(400, "Your request is invalid");

const getUserFromAuthToken = async (
  authToken: string
): Promise<HydratedDocument<IUser>> => {
  let decoded: JwtPayload;

  try {
    decoded = await jwtHelpers.verifyToken(authToken) as JwtPayload;
  } catch {
    throw INVALID_REQUEST_ERROR;
  }

  const { userId } = decoded;

  const user = await User.findById(userId);

  if(!user) {
    throw INVALID_REQUEST_ERROR;
  }

  return user;
};

export default getUserFromAuthToken;
