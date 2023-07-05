import Config from "@config";
import { User } from "@utils/types";
import { createResponse, getIronSession } from "iron-session";

export const sessionOptions = {
  password: Config.auth.cookiePassword,
  cookieName: Config.auth.cookieName,
  cookieOptions: {
    secure: Config.env === "production",
  },
};

export const getSession = (req: Request, res: Response) => {
  return getIronSession<{ user?: User }>(req, res, sessionOptions);
};

export { createResponse };
