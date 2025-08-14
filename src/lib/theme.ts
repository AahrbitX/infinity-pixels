export type ThemeColors = {
  primary: string;
  secondary?: string;
  accent?: string;
  background: string;
  foreground: string;
  gray?: Record<string, string>;
  success?: string;
  error?: string;
  warning?: string;
  info?: string;
};

export type ThemePreset = {
  colors: Partial<ThemeColors>;
  fonts?: Partial<ThemeFonts>;
};

export type ThemeFonts = {
  body: string;
  heading: string;
};

export type Theme = {
  colors: ThemeColors;
  fonts: ThemeFonts;
  borderRadius?: Record<string, string>;
  spacing?: Record<string, unknown>;
  shadows?: Record<string, string>;
  presets?: Record<string, ThemePreset>;
};

export async function loadTheme(): Promise<Theme> {
  const res = await fetch('/content/theme.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load theme');
  return (await res.json()) as Theme;
}

export function applyThemeToDocument(theme: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  
  // Apply color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      root.style.setProperty(`--color-${key}`, value);
    } else if (typeof value === 'object' && value !== null) {
      // For nested color objects like gray.50, gray.100, etc.
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        root.style.setProperty(`--color-${key}-${nestedKey}`, nestedValue as string);
      });
    }
  });
  
  // Apply font variables
  Object.entries(theme.fonts).forEach(([key, value]) => {
    root.style.setProperty(`--font-${key}`, value);
  });
  
  // Apply border radius variables if they exist
  if (theme.borderRadius) {
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });
  }
  
  // Apply shadow variables if they exist
  if (theme.shadows) {
    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });
  }
}

export function applyThemePreset(theme: Theme, presetName: string): Theme {
  if (!theme.presets || !theme.presets[presetName]) {
    console.warn(`Theme preset "${presetName}" not found`);
    return theme;
  }
  
  const preset = theme.presets[presetName];
  
  // Create a new theme object with the preset values merged
  return {
    ...theme,
    colors: {
      ...theme.colors,
      ...preset.colors
    },
    fonts: preset.fonts ? { ...theme.fonts, ...preset.fonts } : theme.fonts
  };
}

// Helper function to get available presets
export function getAvailablePresets(theme: Theme): string[] {
  if (!theme.presets) return [];
  return Object.keys(theme.presets);
}