export const arrayToPathApi = (arr: Array<string>): string => arr.join("/");

export const getBaseUrl = (): string | undefined =>
  process.env["NEXT_PUBLIC_SITE_URL"] ?? process.env["NEXT_PUBLIC_VERCEL_URL"];
