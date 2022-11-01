import { HydratedDocument } from "mongoose";
import { IUser } from "../../models/User";

import userFactory from "./userFactory";
import jwtHelpers from "../../utils/jwtHelpers";

const generateAuthCookie = async (user?: HydratedDocument<IUser>): Promise<string> => {
  const { _id: userId } = user || await userFactory.createUser();

  const token = await jwtHelpers.signToken({ userId });

  return `authToken=${token}`;
};

export default {
  generateAuthCookie
};
