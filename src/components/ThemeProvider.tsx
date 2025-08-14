"use client";
import { ReactNode, useEffect, useState, createContext, useContext } from 'react';
import { applyThemeToDocument, loadTheme, Theme, applyThemePreset, getAvailablePresets } from '@/lib/theme';

interface ThemeContextType {
  currentTheme: Theme | null;
  currentPreset: string;
  availablePresets: string[];
  setPreset: (preset: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: null,
  currentPreset: 'light',
  availablePresets: [],
  setPreset: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [availablePresets, setAvailablePresets] = useState<string[]>([]);
  const [currentPreset, setCurrentPreset] = useState<string>('light');
  
  useEffect(() => {
    loadTheme()
      .then((loadedTheme) => {
        setTheme(loadedTheme);
        setAvailablePresets(getAvailablePresets(loadedTheme));
        
        // Check for stored preset preference
        const storedPreset = localStorage.getItem('themePreset') || 'light';
        setCurrentPreset(storedPreset);
        
        // Apply theme with preset
        const themedTheme = applyThemePreset(loadedTheme, storedPreset);
        applyThemeToDocument(themedTheme);
      })
      .catch((error) => {
        console.error('Failed to load theme:', error);
      });
  }, []);
  
  // Function to change preset
  const setPreset = (preset: string) => {
    if (!theme) return;
    
    setCurrentPreset(preset);
    localStorage.setItem('themePreset', preset);
    
    const themedTheme = applyThemePreset(theme, preset);
    applyThemeToDocument(themedTheme);
  };
  
  return (
    <ThemeContext.Provider value={{
      currentTheme: theme,
      currentPreset,
      availablePresets,
      setPreset
    }}>
      {children}
    </ThemeContext.Provider>
  );
}