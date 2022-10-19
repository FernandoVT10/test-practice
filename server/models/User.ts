import { Schema, model } from "mongoose";

export interface IUser {
  username: string,
  password: string
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    maxLength: 20
  },
  password: {
    type: String,
    required: true
  }
});

const User = model<IUser>("User", userSchema);

export default User;
