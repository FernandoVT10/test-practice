import service from "./service";
import bcrypt from "bcrypt";
import jwtHelpers from "../../utils/jwtHelpers";

import { ValidationError } from "../../utils/errors";

const SALT_ROUNDS = 10;

type UserData = {
  username: string,
  password: string
}

const createUser = async (data: UserData): Promise<{ message: string }> => {
  const { username, password } = data;

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  await service.createOneUser({
    username,
    password: hashedPassword
  }); 

  return {
    message: "User was registered successfully"
  };
};

const getAuthToken = async (data: UserData): Promise<string> => {
  const { username, password } = data;

  const user = await service.findUserByUsername(username);

  if(!user || !(await bcrypt.compare(password, user.password))) {
    throw new ValidationError(400, "Username or password are invalid");
  }

  const token = await jwtHelpers.signToken({ userId: user._id });

  return token;
};

export default {
  createUser,
  getAuthToken
};
