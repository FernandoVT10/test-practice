import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/constants";

const verifyToken = (token: string): Promise<JwtPayload | string | undefined> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if(err) {
        return reject(err);
      }

      resolve(decoded);
    });
  });
};

export default {
  verifyToken
};
