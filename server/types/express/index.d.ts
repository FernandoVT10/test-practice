import { Types } from "mongoose";

declare global {
  declare namespace Express {
    interface Request {
      userId: Types.ObjectId
    }
  }
}
