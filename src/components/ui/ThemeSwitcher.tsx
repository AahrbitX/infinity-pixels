import { useTheme } from '@/components/ThemeProvider';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ThemeSwitcherProps {
  className?: string;
}

export default function ThemeSwitcher({ className = '' }: ThemeSwitcherProps) {
  const { availablePresets, currentPreset, setPreset } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  if (availablePresets.length === 0) return null;
  
  const toggleOpen = () => setIsOpen(!isOpen);
  
  // Helper function to capitalize first letter
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  
  // Map of preset names to color indicators
  const presetColors: Record<string, string> = {
    light: 'bg-white border-gray-300',
    dark: 'bg-gray-900 border-gray-600',
    blue: 'bg-blue-500 border-blue-700',
    green: 'bg-green-500 border-green-700',
    orange: 'bg-orange-500 border-orange-700',
    red: 'bg-red-500 border-red-700'
  };
  
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={toggleOpen}
        className="flex items-center space-x-2 p-2 rounded-md bg-white/10 backdrop-blur-sm border border-gray-200 shadow-sm hover:bg-white/20 transition-colors"
        aria-label="Change theme"
      >
        <div className={`w-4 h-4 rounded-full border ${presetColors[currentPreset] || 'bg-gray-100'}`} />
        <span>Theme</span>
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
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="absolute top-full mt-2 right-0 z-50 min-w-[180px] bg-white rounded-lg shadow-lg border border-gray-200 py-2 overflow-hidden"
        >
          <div className="px-2 pb-2 mb-1 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-500">Select theme</p>
          </div>
          {availablePresets.map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setPreset(preset);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 transition-colors ${
                currentPreset === preset ? 'bg-gray-50' : ''
              }`}
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
                  className="ml-auto text-green-500"
                >
                  <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
