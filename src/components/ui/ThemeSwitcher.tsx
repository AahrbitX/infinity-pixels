import { useTheme } from '@/components/ThemeProvider';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ThemeSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'switch' | 'buttons';
  showLabel?: boolean;
  position?: 'top' | 'bottom';
}

export default function ThemeSwitcher({ 
  className = '', 
  variant = 'dropdown', 
  showLabel = true,
  position = 'bottom' 
}: ThemeSwitcherProps) {
  const { availablePresets, currentPreset, setPreset, isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [useSystemTheme, setUseSystemTheme] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const defaultPreset = 'lime';
  
  // Toggle dropdown
  const toggleOpen = () => setIsOpen(!isOpen);
  
  // Helper function to capitalize first letter
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Check for system theme preference on mount
  useEffect(() => {
    const preferSystemTheme = localStorage.getItem('preferSystemTheme') === 'true';
    setUseSystemTheme(preferSystemTheme);
  }, []);
  
  // Toggle system theme preference
  const toggleSystemTheme = () => {
    const newValue = !useSystemTheme;
    setUseSystemTheme(newValue);
    localStorage.setItem('preferSystemTheme', String(newValue));
    
    // If enabling system theme, immediately check system preference
    if (newValue) {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setPreset(isDarkMode ? 'dark' : defaultPreset);
    }
  };
  
  // Early return after all hooks are called
  if (availablePresets.length === 0) return null;
  
  // Map of preset names to color indicators using CSS variables for dynamic colors
  const presetColors: Record<string, string> = {
    light: 'bg-white border-gray-300',
    dark: 'bg-gray-900 border-gray-600',
    blue: 'bg-[var(--color-blue-500)] border-[var(--color-blue-700)]',
    'blue-dark': 'bg-[var(--color-blue-700)] border-[var(--color-blue-900)]',
    green: 'bg-[var(--color-green-500)] border-[var(--color-green-700)]',
    'green-dark': 'bg-[var(--color-green-700)] border-[var(--color-green-900)]',
    orange: 'bg-[var(--color-orange-500)] border-[var(--color-orange-700)]',
    'orange-dark': 'bg-[var(--color-orange-700)] border-[var(--color-orange-900)]',
    red: 'bg-[var(--color-red-500)] border-[var(--color-red-700)]',
    'red-dark': 'bg-[var(--color-red-700)] border-[var(--color-red-900)]',
    lime: 'bg-[var(--color-lime-500)] border-[var(--color-lime-700)]',
    'lime-dark': 'bg-[var(--color-lime-700)] border-[var(--color-lime-900)]'
  };
  
  // Render simple light/dark mode toggle switch
  if (variant === 'switch') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {showLabel && <span className="text-sm text-foregroundMuted">Light</span>}
        <button
          onClick={() => {
            // Use animation frame for higher priority update
            requestAnimationFrame(() => {
              setPreset(isDarkMode ? 'light' : 'dark');
            });
          }}
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          style={{ 
            backgroundColor: isDarkMode ? 'var(--color-primary)' : 'var(--color-gray-200)'
          }}
        >
          <span
            className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform"
            style={{ 
              transform: isDarkMode ? 'translateX(1.25rem)' : 'translateX(0.25rem)'
            }}
          />
        </button>
        {showLabel && <span className="text-sm text-foregroundMuted">Dark</span>}
      </div>
    );
  }
  
  // Render theme buttons in a row
  if (variant === 'buttons') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {showLabel && <span className="text-sm text-foregroundMuted mr-2">Theme:</span>}
        <div className="flex space-x-1">
          {availablePresets.map((preset) => (
            <button
              key={preset}
              onClick={() => {
                requestAnimationFrame(() => {
                  setPreset(preset);
                });
              }}
              aria-label={`${capitalize(preset)} theme`}
              className={`w-6 h-6 rounded-full border ${
                currentPreset === preset ? 'ring-2 ring-primary' : ''
              }`}
              style={{
                backgroundColor: `var(--color-${preset === 'light' ? 'background' : preset === 'dark' ? 'gray-800' : preset}-500)`,
                borderColor: currentPreset === preset ? 'var(--color-primary)' : 'var(--color-gray-200)'
              }}
            />
          ))}
        </div>
      </div>
    );
  }
  
  // Default: dropdown selector
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={toggleOpen}
        className="flex items-center space-x-2 p-2 rounded-md border shadow-sm transition-colors"
        style={{
          backgroundColor: 'var(--color-background)', 
          borderColor: 'var(--color-border)',
          color: 'var(--color-foreground)'
        }}
        aria-label="Change theme"
      >
        <div className={`w-4 h-4 rounded-full border ${presetColors[currentPreset] || 'bg-gray-100'}`} />
        {showLabel && <span>Theme</span>}
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: position === 'top' ? 5 : -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position === 'top' ? 5 : -5 }}
          className={`absolute ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} right-0 z-50 min-w-[180px] rounded-lg shadow-lg overflow-hidden`}
          style={{
            backgroundColor: 'var(--color-background)',
            borderColor: 'var(--color-border)',
            borderWidth: '1px'
          }}
        >
          <div className="px-2 pb-2 mb-1 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-sm font-medium" style={{ color: 'var(--color-foregroundMuted)' }}>Select theme</p>
          </div>
          
          {/* System theme preference toggle */}
          <div className="px-3 py-2 flex items-center justify-between">
            <span style={{ color: 'var(--color-foreground)' }}>Use system theme</span>
            <button
              onClick={toggleSystemTheme}
              aria-label={useSystemTheme ? 'Disable system theme' : 'Enable system theme'}
              className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none"
              style={{ 
                backgroundColor: useSystemTheme ? 'var(--color-primary)' : 'var(--color-gray-200)'
              }}
            >
              <span
                className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform"
                style={{ 
                  transform: useSystemTheme ? 'translateX(1rem)' : 'translateX(0.15rem)'
                }}
              />
            </button>
          </div>
          
          <div className="border-t" style={{ borderColor: 'var(--color-border)' }}>
          {availablePresets.map((preset) => (
            <button
              key={preset}
              onClick={() => {
                    // Set theme with high priority
                    requestAnimationFrame(() => {
                setPreset(preset);
                setIsOpen(false);
                    });
                  }}
                className="w-full flex items-center space-x-2 px-3 py-2 transition-colors"
                style={{ 
                  backgroundColor: currentPreset === preset 
                    ? 'var(--color-backgroundAlt)' 
                    : 'var(--color-background)',
                  color: 'var(--color-foreground)'
                }}
            >
              <div className={`w-4 h-4 rounded-full border ${presetColors[preset] || 'bg-gray-100'}`} />
              <span className={currentPreset === preset ? 'font-medium' : ''}>{capitalize(preset)}</span>
              {currentPreset === preset && (
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                    className="ml-auto"
                    style={{ color: 'var(--color-success)' }}
                >
                  <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
