import { Core } from "@brizy/core-client";

class CORE {
  private static instance: Core;

  public static getInstance(): Core {
    if (!CORE.instance) {
      CORE.instance = new Core();
    }

    return CORE.instance;
  }
}
export { CORE };
