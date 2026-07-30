export const STORAGE_KEY = "swiftsecure.designOption";

/** Ships as the built-in default: every page renders with this before any
 *  stored preference is read, so it is what a first-time visitor sees. */
export const DEFAULT_THEME = "d";

export interface ThemeOption {
  id: string;
  name: string;
  note: string;
  /** Canvas / surface / accent, for the swatch on the settings page. */
  swatch: [string, string, string];
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "a",
    name: "Corporate Trust",
    note: "Light canvas, navy bands, emerald accent. Inter throughout.",
    swatch: ["#f7f8fa", "#ffffff", "#1f8a5c"],
  },
  {
    id: "b",
    name: "Dark Casino",
    note: "Near-black and neon, square corners, uppercase headings in Archivo.",
    swatch: ["#0a0c0b", "#141917", "#3ef08a"],
  },
  {
    id: "c",
    name: "Premium Gold",
    note: "Gold on near-black, Playfair Display headlines, zero radius.",
    swatch: ["#14120f", "#1d1a16", "#cba53c"],
  },
  {
    id: "d",
    name: "Catalog",
    note: "Light canvas, dark floating nav, soft rounded cards, gradient buttons.",
    swatch: ["#f4f5f7", "#ffffff", "#1f8fd6"],
  },
];

export const THEMES = THEME_OPTIONS.map((o) => o.id);

export const isTheme = (value: string | null): value is string =>
  value !== null && THEMES.includes(value);

/** Reads the stored choice, falling back to the shipped default on anything
 *  unexpected — including a value left over from a since-removed option. */
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
