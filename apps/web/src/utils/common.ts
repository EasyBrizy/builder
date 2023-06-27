export const getBaseUrl = (): string | undefined =>
  process.env["NEXT_PUBLIC_SITE_URL"] ?? process.env["NEXT_PUBLIC_VERCEL_URL"];

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
