const BASE_API_URL = "http://localhost:3000/api";

type ApiResponse = {
  statusCode: number,
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  response: any
}

type GetOptions = {
  cache: "no-cache" | undefined,
  headers: HeadersInit
}

const get = async (url: string, options: GetOptions): Promise<ApiResponse> => {
  const res = await fetch(`${BASE_API_URL}/${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...options.headers
    },
    cache: options.cache
  });

  const data = await res.json();
  
  return { statusCode: res.status, response: data };
};

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const post = async (url: string, body: any): Promise<ApiResponse> => {
  const res = await fetch(`${BASE_API_URL}/${url}`, {
    method: "POST",
    headers: { 
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    cache: "no-cache"
  });

  const data = await res.json();

  return { statusCode: res.status, response: data };
};

export default {
  get,
  post,
};
