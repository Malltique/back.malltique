export const buildURL =
  (basePath: string) =>
  (path: string = "") => {
    return `/${basePath}/${path}`;
  };
