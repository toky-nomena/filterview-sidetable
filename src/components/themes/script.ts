import type { Attribute } from "./types";

const themes = ["light", "dark", "system"] as const;

type Theme = (typeof themes)[number];

interface Options {
  onChange?: (theme: Theme) => void;
}

export const script = (
  attribute: Attribute,
  storageKey: string,
  defaultTheme: string,
  forcedTheme: string,
  themes: string[],
  value: string,
  enableSystem: boolean,
  enableColorScheme: boolean,
) => {
  const el = document.documentElement;
  const systemThemes = ["light", "dark"];

  function updateDOM(theme: string, options?: Options) {
    const root = document.documentElement;
    const { onChange } = options ?? {};

    const attributes = Array.isArray(attribute) ? attribute : [attribute];

    for (const attr of attributes) {
      const isClass = attr === "class";
      const classes =
        isClass && value ? themes.map((t) => value[t] || t) : themes;
      if (isClass) {
        root.classList.remove(...classes);
        root.classList.add(theme);
      } else {
        root.setAttribute(attr, theme);
      }
    }

    if (onChange) {
      onChange(theme as Theme);
    }

    setColorScheme(theme);
  }

  function setColorScheme(theme: string) {
    if (enableColorScheme && systemThemes.includes(theme)) {
      el.style.colorScheme = theme;
    }
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  if (forcedTheme) {
    updateDOM(forcedTheme);
  } else {
    try {
      const themeName = localStorage.getItem(storageKey) || defaultTheme;
      const isSystem = enableSystem && themeName === "system";
      updateDOM(isSystem ? getSystemTheme() : themeName);
    } catch (e) {
      //
    }
  }
};
