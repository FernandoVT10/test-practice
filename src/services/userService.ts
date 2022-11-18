import api, { ApiResponse } from "@utils/api";

interface UserData {
  username: string,
  password: string
}

const register = async (data: UserData): Promise<ApiResponse> => {
  try {
    return await api.post("user/register", data);
  } catch {
    return {
      statusCode: 500,
      response: { message: "There was an error. Try it later." }
    };
  }
};

const login = async (data: UserData): Promise<ApiResponse> => {
  try {
    return await api.post("user/login", data);
  } catch {
    return {
      statusCode: 500,
      response: { message: "There was an error. Try it later." }
    };
  }
};

export default {
  register, login
};
