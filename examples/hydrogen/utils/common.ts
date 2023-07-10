export const getUrl = (path: string): string => {
  const baseURL = window.location.origin;
  return new URL(path, baseURL).toString();
};
