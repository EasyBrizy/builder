const builderHost = "https://brizy.cloud";

const Config = {
  env: process.env["NODE_ENV"],
  serverUrl:
    process.env["NEXT_PUBLIC_SITE_URL"] ??
    process.env["NEXT_PUBLIC_VERCEL_URL"],
  auth: {
    cookieName: process.env["COOKIE_NAME"] ?? "@brizy/nextjs",
    cookiePassword:
      process.env["COOKIE_PASSWORD"] ??
      "complex_password_at_least_32_characters_long",
    register: "http://localhost:9000/register",
    signIn: "http://localhost:9000/login",
    reset: "http://localhost:9000/reset",
  },
  apiKey: process.env["API_KEY"] ?? "",
  builderWelcomeUrl: `${builderHost}/share/zWuCORqKPEnqI8J`,
};

export default Config;
