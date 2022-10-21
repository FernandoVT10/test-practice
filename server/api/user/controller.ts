import service from "./service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { ValidationError } from "../../utils/errors";
import { JWT_SECRET_KEY } from "../../config/constants";

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
    throw new ValidationError(404, "Username or password are invalid");
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
    expiresIn: "30d"
  });

  return token;
};

export default {
  createUser,
  getAuthToken
};
