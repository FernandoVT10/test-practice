import { HydratedDocument } from "mongoose";
import { faker } from "@faker-js/faker";

import User, { IUser } from "../../models/User";

const createUser = async (): Promise<HydratedDocument<IUser>> => {
  return User.create({
    username: faker.internet.userName(),
    password: faker.internet.password()
  });
};

export default {
  createUser
};
