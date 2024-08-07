import axios from "axios";
import getEnv from "./Env";

type TypeMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const envBaseUrl = getEnv("NEXT_PUBLIC_BACKEND_ENDPOINT");

const errorHandler = (error: any) => {
  console.error(error);
  if (error.response?.data)
    return typeof error.response?.data === "object"
      ? JSON.stringify(error.response.data)
      : error.response.data;
  if (
    error.response?.statusText &&
    error.response?.statusText.toString().length > 0
  )
    return error.response.statusText;
  if (error.response?.message) return error.response.message;
  return "Error fetching data";
};

export const myQuery =
  <T>(
    params:
      | { baseUrl?: string; method?: TypeMethods; token?: string }
      | undefined = undefined,
  ) =>
  (context: {
    queryKey: (string | number | Object)[];
    signal: AbortSignal;
    meta: Record<string, unknown> | undefined;
  }): Promise<T> =>
    axios(`${params?.baseUrl ?? envBaseUrl}${context.queryKey.join("/")}`, {
      method: params?.method ?? "GET",
      headers: {
        Authorization: params?.token ? `Token ${params.token}` : "",
      },
    })
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(errorHandler(error));
      });

export const myMutation =
  <T>({
    url,
    baseUrl,
    method,
    token,
  }: {
    url: string;
    baseUrl?: string;
    method?: TypeMethods;
    token?: string;
  }) =>
  (data: T) =>
    axios(`${baseUrl ?? envBaseUrl}${url}`, {
      method: method ?? "POST",
      data: data ?? undefined,
      headers: {
        Authorization: token ? `Token ${token}` : "",
      },
    })
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(errorHandler(error));
      });
