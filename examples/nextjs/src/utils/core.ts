import { Core } from "@brizy/builder-sdk";

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
