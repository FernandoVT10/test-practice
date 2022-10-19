import { HydratedDocument } from "mongoose";
import User, { IUser } from "../../models/User";

type CreateOneUserData = {
  username: string,
  password: string
}

const createOneUser = (data: CreateOneUserData): Promise<HydratedDocument<IUser>> => {
  return User.create(data);
};

const findUserByUsername = async (username: string): Promise<HydratedDocument<IUser> | null> => {
  return User.findOne({ username });
};

export default {
  createOneUser,
  findUserByUsername
};
