export const IS_SERVER = typeof window === "undefined";

const getServerUrl = (): string | undefined =>
  process.env["NUXT_PUBLIC_SITE_URL"] ?? process.env["NUXT_PUBLIC_VERCEL_URL"];

export const getUrl = (path: string): string => {
  const baseURL = IS_SERVER ? getServerUrl() : window.location.origin;
  return new URL(path, baseURL).toString();
};
