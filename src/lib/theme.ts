export type Theme = {
  colors: Record<string, string>;
  fonts: { body: string; heading: string };
};

export async function loadTheme(): Promise<Theme> {
  const res = await fetch('/content/theme.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load theme');
  return (await res.json()) as Theme;
}

export function applyThemeToDocument(theme: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--color-primary', theme.colors.primary);
  root.style.setProperty('--color-background', theme.colors.background);
  root.style.setProperty('--color-foreground', theme.colors.foreground);
  root.style.setProperty('--font-body', theme.fonts.body);
  root.style.setProperty('--font-heading', theme.fonts.heading);
}


