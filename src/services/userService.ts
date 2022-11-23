import api, { ApiResponse } from "@utils/api";

interface UserData {
  username: string,
  password: string
}

const register = (data: UserData): Promise<ApiResponse> => {
  return api.post("user/register", data);
};

const login = (data: UserData): Promise<ApiResponse> => {
  return api.post("user/login", data);
};

export default {
  register, login
};
