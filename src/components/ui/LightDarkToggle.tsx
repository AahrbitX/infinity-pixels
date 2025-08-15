"use client";

import { useTheme } from '@/components/ThemeProvider';
// import { motion } from 'framer-motion';

interface LightDarkToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function LightDarkToggle({ 
  className = '', 
  showLabel = true 
}: LightDarkToggleProps) {
  const { currentPreset, setPreset, isDarkMode } = useTheme();
  
  // Get the base theme name (remove '-dark' suffix if present)
  const baseTheme = currentPreset.replace('-dark', '');
  
  // Check if current theme has a dark variant
  const hasDarkVariant = currentPreset !== 'light' && currentPreset !== 'dark';
  
  // Toggle between light and dark mode for the current theme
  const toggleMode = () => {
    if (isDarkMode && hasDarkVariant) {
      // Switch to light mode of current theme
      setPreset(baseTheme);
    } else if (!isDarkMode && hasDarkVariant) {
      // Switch to dark mode of current theme
      setPreset(`${baseTheme}-dark`);
    } else {
      // For base light/dark themes, switch to opposite
      const newPreset = currentPreset === 'light' ? 'dark' : 'light';
      setPreset(newPreset);
    }
  };
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showLabel && (
        <span 
          className="text-sm"
          style={{ color: 'var(--color-foregroundMuted)' }}
        >
          {isDarkMode ? 'Dark' : 'Light'}
        </span>
      )}
      
      <button
        onClick={toggleMode}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{ 
          backgroundColor: isDarkMode ? 'var(--color-primary)' : 'var(--color-gray-200)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <span
          className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform"
          style={{ 
            transform: isDarkMode ? 'translateX(1.25rem)' : 'translateX(0.25rem)'
          }}
        />
      </button>
      
      {showLabel && (
        <span 
          className="text-sm"
          style={{ color: 'var(--color-foregroundMuted)' }}
        >
          {isDarkMode ? 'Light' : 'Dark'}
        </span>
      )}
      

    </div>
  );
}
