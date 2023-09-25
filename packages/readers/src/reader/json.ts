import { Reader } from "./types";
import { ResponseWithBody } from "./types";

export const read: Reader<unknown> = (v) => {
  if (typeof v === "string") {
    try {
      return JSON.parse(v);
    } catch (e) {
      return undefined;
    }
  }

  return undefined;
};

export const parseJSON = <T>(
  response: Response
): Promise<ResponseWithBody<T>> => {
  return response
    .json()
    .then((body) => ({
      status: response.status,
      ok: response.ok,
      data: body || null,
    }))
    .catch(() => {
      throw {
        status: 500,
        data: "Server Error",
      };
    });
};
