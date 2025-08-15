export type ThemeColors = {
  primary: string;
  primaryLight?: string;
  primaryDark?: string;
  secondary?: string;
  secondaryLight?: string;
  secondaryDark?: string;
  accent?: string;
  accentLight?: string;
  accentDark?: string;
  background: string;
  backgroundAlt?: string;
  foreground: string;
  foregroundMuted?: string;
  foregroundAlt?: string;
  gray?: Record<string, string>;
  success?: string;
  successLight?: string;
  error?: string;
  errorLight?: string;
  warning?: string;
  warningLight?: string;
  info?: string;
  infoLight?: string;
  lime?: string;
  limeLight?: string;
  limeDark?: string;
  border?: string;
  borderLight?: string;
  shadow?: string;
  overlay?: string;
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
  
  // Force layout recalculation by accessing offsetHeight
  if (document.body) {
    // Force layout recalculation by accessing offsetHeight
    void document.body.offsetHeight;
    
    // Add theme version to body for components to detect changes
    document.body.dataset.themeVersion = Date.now().toString();
    
    // Add transition class to ensure smooth transitions
    document.body.classList.add('theme-transition');
  }
  
  // Apply color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      root.style.setProperty(`--color-${key}`, value);
      
      // Extract RGB values for use in rgba() functions
      const hexToRgb = (hex: string): [number, number, number] | null => {
        // Handle shorthand hex (#fff)
        if (hex.startsWith('#') && hex.length === 4) {
          const r = parseInt(hex[1] + hex[1], 16);
          const g = parseInt(hex[2] + hex[2], 16);
          const b = parseInt(hex[3] + hex[3], 16);
          return [r, g, b];
        }
        
        // Handle full hex (#ffffff)
        if (hex.startsWith('#') && hex.length === 7) {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return [r, g, b];
        }
        
        return null;
      };
      
      const rgb = hexToRgb(value);
      if (rgb) {
        const [r, g, b] = rgb;
        root.style.setProperty(`--color-${key}-rgb`, `${r}, ${g}, ${b}`);
      }
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
  
  // Create CSS classes for text colors
  const styleSheet = document.createElement('style');
  let styleRules = '';
  
  // Text color classes
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      styleRules += `.text-${key} { color: var(--color-${key}); }\n`;
    }
    
    if (key === 'gray' && typeof value === 'object') {
      Object.keys(value).forEach((shade) => {
        styleRules += `.text-gray-${shade} { color: var(--color-gray-${shade}); }\n`;
      });
    }
  });
  
  // Background color classes
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      styleRules += `.bg-${key} { background-color: var(--color-${key}); }\n`;
    }
    
    if (key === 'gray' && typeof value === 'object') {
      Object.keys(value).forEach((shade) => {
        styleRules += `.bg-gray-${shade} { background-color: var(--color-gray-${shade}); }\n`;
      });
    }
  });
  
  // Border color classes
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      styleRules += `.border-${key} { border-color: var(--color-${key}); }\n`;
    }
    
    if (key === 'gray' && typeof value === 'object') {
      Object.keys(value).forEach((shade) => {
        styleRules += `.border-gray-${shade} { border-color: var(--color-gray-${shade}); }\n`;
      });
    }
  });
  
  // Add the style rules to the stylesheet
  styleSheet.textContent = styleRules;
  document.head.appendChild(styleSheet);
  
  // Remove transition class after a short delay to prevent transition during normal interactions
  if (document.body) {
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 300);
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

// Helper function to apply theme colors to SVG elements
export function applySvgThemeColors(svgElement: SVGElement, colorMapping: Record<string, string>): void {
  if (!svgElement) return;

  // Function to process an element and its children
  const processElement = (el: Element) => {
    // Apply color to strokes
    if (el.hasAttribute('stroke') && colorMapping[el.getAttribute('stroke') || '']) {
      const mappedColor = `var(--color-${colorMapping[el.getAttribute('stroke') || '']})`;
      el.setAttribute('stroke', mappedColor);
    }

    // Apply color to fills
    if (el.hasAttribute('fill') && colorMapping[el.getAttribute('fill') || '']) {
      const mappedColor = `var(--color-${colorMapping[el.getAttribute('fill') || '']})`;
      el.setAttribute('fill', mappedColor);
    }

    // Process all child elements
    Array.from(el.children).forEach(child => processElement(child));
  };

  // Start processing from the root SVG element
  processElement(svgElement);
}

// Hook for handling theme-based dynamic colors in components
export function useThemeColor(colorKey: keyof ThemeColors, fallback?: string): string {
  // This is a client-side function
  if (typeof document === 'undefined') return fallback || '';
  
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${colorKey}`).trim();
  
  return value || fallback || '';
}

// Helper to generate rgba from theme color
export function getRgbaFromThemeColor(colorKey: keyof ThemeColors, opacity: number): string {
  if (typeof document === 'undefined') return '';
  
  const rgb = getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${colorKey}-rgb`).trim();
  
  return rgb ? `rgba(${rgb}, ${opacity})` : '';
}