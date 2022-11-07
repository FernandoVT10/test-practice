const BASE_API_URL = "http://localhost:3000/api";

type PostResponse = {
  statusCode: number,
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  response: any
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const post = async (url: string, body: any): Promise<PostResponse> => {
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
  post,
};
