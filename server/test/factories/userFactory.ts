import bcrypt from "bcrypt";

import { HydratedDocument } from "mongoose";
import { faker } from "@faker-js/faker";

import User, { IUser } from "../../models/User";

const DEFAULT_PASSWORD = "password";

const createUser = async (options: Partial<IUser> = {}): Promise<HydratedDocument<IUser>> => {
  return User.create({
    username: options.username || faker.internet.userName(),
    password: options.password || await bcrypt.hash(DEFAULT_PASSWORD, 1)
  });
};

export default {
  createUser,
  DEFAULT_PASSWORD
};
