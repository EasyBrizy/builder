export const makeUrl = (
  baseUrl: string,
  params: Record<string, string> = {}
): string => {
  const url: URL = new URL(baseUrl);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  return url.toString();
};
