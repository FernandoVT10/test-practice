/* eslint-disable @typescript-eslint/no-explicit-any */

const BASE_API_URL = "http://localhost:3000/api";

export type ApiResponse = {
  statusCode: number,
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


const apiCallWithJSON = async (
  url: string,
  body: any,
  method: "POST" | "PUT"
): Promise<ApiResponse> => {
  const res = await fetch(`${BASE_API_URL}/${url}`, {
    method,
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

const post = (url: string, body: any) =>
  apiCallWithJSON(url, body, "POST");

const put = async (url: string, body: any) =>
  apiCallWithJSON(url, body, "PUT");

// TODO: Make the code cleaner

const deleteFn = async (url: string): Promise<ApiResponse> => {
  const res = await fetch(`${BASE_API_URL}/${url}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json"
    },
    cache: "no-cache"
  });

  const data = await res.json();
  
  return { statusCode: res.status, response: data };
};

export default { get, post, put, delete: deleteFn };
