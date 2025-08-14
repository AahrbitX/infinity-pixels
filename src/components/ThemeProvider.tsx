"use client";
import { ReactNode, useEffect, useState, createContext, useContext, useCallback } from 'react';
import { 
  applyThemeToDocument, 
  loadTheme, 
  Theme, 
  ThemeColors, 
  applyThemePreset, 
  getAvailablePresets,
  getRgbaFromThemeColor,
  // useThemeColor
} from '@/lib/theme';

interface ThemeContextType {
  currentTheme: Theme | null;
  currentPreset: string;
  availablePresets: string[];
  setPreset: (preset: string) => void;
  getColor: (colorKey: keyof ThemeColors) => string;
  getRgba: (colorKey: keyof ThemeColors, opacity: number) => string;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: null,
  currentPreset: 'light',
  availablePresets: [],
  setPreset: () => {},
  getColor: () => '',
  getRgba: () => '',
  isDarkMode: false
});

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [availablePresets, setAvailablePresets] = useState<string[]>([]);
  const [currentPreset, setCurrentPreset] = useState<string>('light');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  // Set initial theme state for SSR consistency
  const defaultPreset = 'light';
  
  // Load theme on initial render
  useEffect(() => {
    // Only run localStorage operations client-side
    if (typeof window === 'undefined') return;
    
    loadTheme()
      .then((loadedTheme) => {
        setTheme(loadedTheme);
        setAvailablePresets(getAvailablePresets(loadedTheme));
        
        // Check for stored preset preference
        const storedPreset = localStorage.getItem('themePreset') || defaultPreset;
        setCurrentPreset(storedPreset);
        setIsDarkMode(storedPreset === 'dark');
        
        // Apply theme with preset
        const themedTheme = applyThemePreset(loadedTheme, storedPreset);
        applyThemeToDocument(themedTheme);
      })
      .catch((error) => {
        console.error('Failed to load theme:', error);
      });
  }, []);
  
  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if user prefers system theme
    const preferSystemTheme = localStorage.getItem('preferSystemTheme') === 'true';
    if (!preferSystemTheme) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newPreset = e.matches ? 'dark' : 'light';
      if (theme) {
        setCurrentPreset(newPreset);
        setIsDarkMode(newPreset === 'dark');
        const themedTheme = applyThemePreset(theme, newPreset);
        applyThemeToDocument(themedTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);
  
  // Function to change preset
  const setPreset = useCallback((preset: string) => {
    if (!theme) return;
    
    // Force immediate state update
    setCurrentPreset(preset);
    setIsDarkMode(preset === 'dark');
    localStorage.setItem('themePreset', preset);
    
    // Apply theme synchronously
    const themedTheme = applyThemePreset(theme, preset);
    applyThemeToDocument(themedTheme);
    
    // Force a repaint by adding a minimal timeout and applying transition class
    setTimeout(() => {
      // Add transition class to body for smooth transition
      document.body.classList.add('theme-transition');
      document.body.dataset.themeUpdated = Date.now().toString();
      
      // Schedule another repaint after transitions would complete
      setTimeout(() => {
        document.body.classList.remove('theme-transition');
      }, 300);
    }, 0);
  }, [theme]);
  
  // Get color from current theme
  const getColor = useCallback((colorKey: keyof ThemeColors): string => {
    if (typeof document === 'undefined') return '';
    
    return getComputedStyle(document.documentElement)
      .getPropertyValue(`--color-${colorKey}`).trim();
  }, []);
  
  // Get rgba color from current theme
  const getRgba = useCallback((colorKey: keyof ThemeColors, opacity: number): string => {
    return getRgbaFromThemeColor(colorKey, opacity);
  }, []);
  
  return (
    <ThemeContext.Provider value={{
      currentTheme: theme,
      currentPreset,
      availablePresets,
      setPreset,
      getColor,
      getRgba,
      isDarkMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
}