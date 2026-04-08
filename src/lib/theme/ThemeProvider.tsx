import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

/**
 * A map of CSS custom property names to their override values.
 *
 * @example
 * ```tsx
 * tokens={{
 *   "--color-rspl-primary-500": "#7c3aed",
 *   "--color-rspl-primary-600": "#6d28d9",
 * }}
 * ```
 */
export type ThemeTokens = Record<string, string>;

export interface ThemeContextValue {
  /** The user-selected setting ("light" | "dark" | "system"). */
  theme: Theme;
  /** The theme actually rendered — never "system". */
  resolvedTheme: ResolvedTheme;
  /** Change the active theme. */
  setTheme: (theme: Theme) => void;
  /** Toggle between light and dark (ignores "system"). */
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
  /**
   * Starting theme. Reads from localStorage first; falls back to this value.
   * @default "system"
   */
  defaultTheme?: Theme;
  /**
   * localStorage key used to persist the user's choice across sessions.
   * @default "rspl-theme"
   */
  storageKey?: string;
  /**
   * CSS custom property overrides injected onto the provider root element.
   * Use this to rebrand the library without rebuilding styles.
   *
   * @example
   * ```tsx
   * tokens={{ "--color-rspl-primary-500": "#7c3aed" }}
   * ```
   */
  tokens?: ThemeTokens;
  /** Extra class names applied to the wrapper element. */
  className?: string;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function readSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function readStoredTheme(key: string, fallback: Theme): Theme {
  try {
    return (localStorage.getItem(key) as Theme) ?? fallback;
  } catch {
    return fallback;
  }
}

// ─── Provider ────────────────────────────────────────────────────────────────

/**
 * Wraps your application (or a subtree) and provides light/dark theme control
 * along with optional CSS token overrides.
 *
 * Place this as high in the tree as possible — typically at the app root.
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="light" tokens={{ "--color-rspl-primary-500": "#7c3aed" }}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "rspl-theme",
  tokens,
  className,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() =>
    readStoredTheme(storageKey, defaultTheme),
  );

  const [systemTheme, setSystemTheme] =
    useState<ResolvedTheme>(readSystemTheme);

  // Track OS-level preference changes when theme === "system".
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) =>
      setSystemTheme(e.matches ? "dark" : "light");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const resolvedTheme: ResolvedTheme = theme === "system" ? systemTheme : theme;

  const setTheme = (next: Theme) => {
    try {
      localStorage.setItem(storageKey, next);
    } catch {
      // Silently ignore if localStorage is unavailable.
    }
    setThemeState(next);
  };

  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  const ctx = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme, resolvedTheme],
  );

  // CSS variable overrides are applied as inline styles on the root element.
  // TypeScript doesn't know about custom properties, so we cast here.
  const tokenStyle = tokens as unknown as CSSProperties | undefined;

  return (
    <ThemeContext.Provider value={ctx}>
      <div
        data-rspl-theme={resolvedTheme}
        className={
          [resolvedTheme === "dark" ? "dark" : "", className ?? ""]
            .filter(Boolean)
            .join(" ") || undefined
        }
        style={tokenStyle}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * Access the current theme and controls from any component inside
 * `<ThemeProvider>`.
 *
 * @throws if called outside of `<ThemeProvider>`
 *
 * @example
 * ```tsx
 * const { resolvedTheme, toggleTheme } = useTheme();
 * ```
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside <ThemeProvider>.");
  }
  return ctx;
}
