import { sessionOptions } from "@lib/withSession";
import { User as AuthUser } from "@utils/types";
import { unsealData } from "iron-session";
import { cookies } from "next/headers";

interface User {
  user?: AuthUser;
}

export const useUser = async (): Promise<User> => {
  const cookie = cookies().get(sessionOptions.cookieName);

  if (cookie?.value) {
    return await unsealData(cookie.value, {
      password: sessionOptions.password,
    });
  }

  return {};
};
