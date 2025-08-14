"use client";

import { useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { 
  useThemeColor, 
  useThemeGradient, 
  useThemeRgba, 
  useIsDarkMode,
  useSvgTheming 
} from '@/lib/hooks/useThemeUtils';

export default function ThemeExample() {
  // Get current theme information
  const { currentPreset, availablePresets } = useTheme();
  
  // Get specific theme colors
  const primaryColor = useThemeColor('primary');
  const secondaryColor = useThemeColor('secondary');
  // const backgroundColor = useThemeColor('background');
  
  // Get rgba colors with dynamic opacity
  const primaryWithOpacity = useThemeRgba('primary');
  
  // Get gradient using theme colors
  const gradient = useThemeGradient('primary', 'secondary');
  
  // Check if dark mode is active
  const isDarkMode = useIsDarkMode();
  
  // Reference to SVG element for dynamic coloring
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Apply theme colors to SVG
  useSvgTheming(svgRef, {
    '#000000': 'primary',
    '#FFFFFF': 'background',
    '#333333': 'foreground'
  });

  return (
    <div className="p-8 rounded-lg" style={{ backgroundColor: 'var(--color-backgroundAlt)' }}>
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-foreground)' }}>
        Dynamic Theme Example
      </h2>
      
      {/* Theme information */}
      <div className="mb-8 p-4 rounded" style={{ backgroundColor: 'var(--color-background)' }}>
        <p style={{ color: 'var(--color-foreground)' }}>
          Current theme: <span style={{ color: primaryColor }}>{currentPreset}</span>
        </p>
        <p style={{ color: 'var(--color-foregroundMuted)' }}>
          Available themes: {availablePresets.join(', ')}
        </p>
        <p style={{ color: 'var(--color-foregroundMuted)' }}>
          Is dark mode: {isDarkMode ? 'Yes' : 'No'}
        </p>
      </div>
      
      {/* Color examples */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {/* Primary color */}
        <div className="p-4 rounded text-center" style={{ backgroundColor: primaryColor, color: isDarkMode ? '#fff' : '#000' }}>
          Primary
        </div>
        
        {/* Secondary color */}
        <div className="p-4 rounded text-center" style={{ backgroundColor: secondaryColor, color: isDarkMode ? '#fff' : '#000' }}>
          Secondary
        </div>
        
        {/* Gradient example */}
        <div className="p-4 rounded text-center text-white" style={{ background: gradient }}>
          Gradient
        </div>
        
        {/* RGBA example */}
        <div className="p-4 rounded text-center" style={{ backgroundColor: primaryWithOpacity(0.2), color: 'var(--color-foreground)' }}>
          RGBA (20%)
        </div>
      </div>
      
      {/* Button styles */}
      <div className="space-y-4 mb-8">
        <button
          className="px-4 py-2 rounded-md w-full transition-all"
          style={{ 
            backgroundColor: 'var(--color-primary)',
            color: '#ffffff',
            boxShadow: '0 4px 6px -1px ' + primaryWithOpacity(0.3)
          }}
        >
          Primary Button
        </button>
        
        <button
          className="px-4 py-2 rounded-md w-full transition-all border"
          style={{ 
            backgroundColor: 'transparent',
            borderColor: 'var(--color-primary)',
            color: 'var(--color-primary)'
          }}
        >
          Outline Button
        </button>
      </div>
      
      {/* SVG with dynamic theme colors */}
      <div className="flex justify-center">
        <svg
          ref={svgRef}
          width="100"
          height="100"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="40" stroke="#000000" strokeWidth="3" fill="#FFFFFF" />
          <path d="M30 40 L70 40 L50 70 Z" fill="#333333" />
        </svg>
      </div>
    </div>
  );
}
