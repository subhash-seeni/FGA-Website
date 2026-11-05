/**
 * Utility to resolve public asset paths correctly, supporting subpath hosting
 * such as GitHub Pages (e.g. /FGA-Website) as well as custom domains (/).
 */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

export const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : isGithubActions
    ? "/FGA-Website"
    : "";

export function assetPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (basePath && (cleanPath === basePath || cleanPath.startsWith(`${basePath}/`))) {
    return cleanPath;
  }
  return `${basePath}${cleanPath}`;
}
