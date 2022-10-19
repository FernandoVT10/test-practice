import { CustomValidator } from "express-validator";
import logger from "../../utils/logger";

import service from "./service";

const isUsernameAvailable: CustomValidator = async (username) => {
  try {
    const user = await service.findUserByUsername(username); 

    if(!user) return true;
  } catch (err) {
    logger.error(err);
  }

  throw new Error("The username already exists");
};

export default {
  isUsernameAvailable
};
