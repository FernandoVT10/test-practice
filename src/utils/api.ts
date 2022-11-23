/* eslint-disable @typescript-eslint/no-explicit-any */

const BASE_API_URL = "http://localhost:3000/api";

export type ApiResponse = {
  statusCode: number,
  response: any
}

interface GenericApiCallParams {
  url: string,
  method: string,
  headers?: HeadersInit,
  body?: BodyInit,
  cache: RequestCache
}

const genericApiCall = async ({
  url,
  method,
  headers,
  body,
  cache
}: GenericApiCallParams): Promise<ApiResponse> => {
  const res = await fetch(`${BASE_API_URL}/${url}`, {
    method,
    headers: {
      Accept: "application/json",
      ...headers
    },
    body,
    cache
  });

  const data = await res.json();

  return { statusCode: res.status, response: data };
};

interface GetOptions {
  cache: "no-cache" | undefined,
  headers: HeadersInit
}

const get = (url: string, options: GetOptions): Promise<ApiResponse> => {
  return genericApiCall({
    url,
    method: "GET",
    headers: {
      ...options.headers
    },
    cache: options.cache || "default"
  });
};

const apiCallWithJSON = (
  url: string,
  body: any,
  method: "POST" | "PUT"
): Promise<ApiResponse> => {
  return genericApiCall({
    url,
    method,
    body: JSON.stringify(body),
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    }
  });
};

const post = (url: string, body: any) =>
  apiCallWithJSON(url, body, "POST");

const put = async (url: string, body: any) =>
  apiCallWithJSON(url, body, "PUT");

const deleteFn = async (url: string): Promise<ApiResponse> => {
  return genericApiCall({
    url,
    method: "DELETE",
    cache: "no-cache"
  });
};

export default { get, post, put, delete: deleteFn };
