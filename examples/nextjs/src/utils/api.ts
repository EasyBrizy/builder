import { ClientItem, SignIn, User, ResetPass, SignUp } from "./types";
import { Client, CompilerData } from "@brizy/react";
import Config from "@config";

//#region API

class API {
  private static instance: API;
  private readonly client: Client;

  private constructor() {
    this.client = Client.buildClient({ apiKey: Config.apiKey });
  }

  public static getInstance(): API {
    if (!API.instance) {
      API.instance = new API();
    }

    return API.instance;
  }

  public getHTMLByItem({ item }: ClientItem): Promise<CompilerData> {
    return this.client.page.getPages(item);
  }

  public async resetPass(data: ResetPass): Promise<User> {
    try {
      const r = await fetch(Config.auth.reset, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const user = await r.json();

      if (r.ok && user?.token) {
        return {
          id: user._id,
          token: user.token,
        };
      }

      throw new Error("Invalid User");
    } catch (e) {
      throw new Error("Fail to reset password");
    }
  }

  public async signIn(data: SignIn): Promise<User> {
    try {
      const r = await fetch(Config.auth.signIn, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const user = await r.json();

      if (r.ok && user?.token) {
        return {
          id: user._id,
          token: user.token,
        };
      }
      throw new Error("Invalid User");
    } catch (e) {
      throw new Error("Fail to SignIn");
    }
  }

  public async signUp(data: SignUp): Promise<User> {
    try {
      const r = await fetch(Config.auth.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const user = await r.json();

      if (r.ok && user?.token) {
        return {
          id: user._id,
          token: user.token,
        };
      }

      throw new Error("Invalid User");
    } catch (e) {
      throw new Error("Fail to SignUp");
    }
  }
}

export { API };

//#endregion
