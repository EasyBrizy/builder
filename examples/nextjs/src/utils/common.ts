import Config from "@config";

export const IS_SERVER = typeof window === "undefined";

const getServerUrl = (): string | undefined => Config.serverUrl;

export const getUrl = (path: string): string => {
  const baseURL = IS_SERVER ? getServerUrl() : window.location.origin;
  return new URL(path, baseURL).toString();
};

export const customerLoginPath = "customer/login";
export const customerLoginRegistration = "customer/registration";
export const customerLoginLogout = "customer/logout";
export const customerLoginForgot = "customer/password_reset";

export const builderRedirects = {
  [customerLoginPath]: "api/auth/signIn",
  [customerLoginRegistration]: "api/auth/signUp",
  [customerLoginLogout]: "api/auth/logout",
  [customerLoginForgot]: "api/auth/resetPassword",
};

export const getError = (error: unknown, message?: string): string => {
  if (error !== null && typeof error === "object" && "message" in error) {
    return JSON.stringify({
      status: "error",
      message: error.message,
    });
  }

  return JSON.stringify({ status: "error", message });
};
