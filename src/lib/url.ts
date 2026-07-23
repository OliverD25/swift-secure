const base = import.meta.env.BASE_URL;

/**
 * Prefixes an internal, root-relative path with the configured base.
 * GitHub Pages serves project sites from /<repo>/, so bare "/about/" links
 * would 404 there while working fine locally — this keeps both correct.
 */
export function withBase(path: string): string {
  return `${base.replace(/\/+$/, "")}${path}`;
}
