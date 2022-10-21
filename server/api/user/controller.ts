import service from "./service";
import bcrypt from "bcrypt";

import { ServerError } from "../../utils/errors";

const SALT_ROUNDS = 10;

type CreateUserData = {
  username: string,
  password: string
}

const createUser = async (data: CreateUserData) => {
  const { username, password } = data;

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await service.createOneUser({
      username,
      password: hashedPassword
    }); 

    return {
      message: "User was registered successfully"
    };
  } catch (err) {
    throw new ServerError(
      500,
      "There was an error trying to register the user",
      err
    );
  }
};

export default {
  createUser
};
