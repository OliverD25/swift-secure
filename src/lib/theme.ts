export const STORAGE_KEY = "swiftsecure.designOption";
export const DEFAULT_THEME = "a";
export const THEMES = ["a", "b", "c", "d"];

export const isTheme = (value: string | null): value is string =>
  value !== null && THEMES.includes(value);

/** Reads the stored choice, falling back to Option A on anything unexpected. */
export function readTheme(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isTheme(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function applyTheme(theme: string): void {
  document.documentElement.dataset.theme = isTheme(theme) ? theme : DEFAULT_THEME;
}
