export const IS_SERVER = typeof window === "undefined";

const getServerUrl = (): string | undefined =>
  process.env["NEXT_PUBLIC_SITE_URL"] ?? process.env["NEXT_PUBLIC_VERCEL_URL"];

export const getUrl = (path: string): string => {
  const baseURL = IS_SERVER ? getServerUrl() : window.location.origin;
  return new URL(path, baseURL).toString();
};

export const makeUrl = (
  baseUrl: string,
  params: Record<string, string> = {}
): string => {
  const url = new URL(baseUrl);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  return url.toString();
};
