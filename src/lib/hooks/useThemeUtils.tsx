"use client";

import { useTheme } from '@/components/ThemeProvider';
import { ThemeColors } from '@/lib/theme';
import { useCallback, useEffect, useState } from 'react';

/**
 * Hook to get CSS variable value for a specific theme color
 * @param colorKey The theme color key
 * @param fallback Optional fallback value
 * @returns The CSS variable value
 */
export function useThemeColor(colorKey: keyof ThemeColors, fallback?: string): string {
  const { currentPreset } = useTheme();
  const [color, setColor] = useState(fallback || '');
  
  useEffect(() => {
    // Read directly from CSS variables for immediate updates
    const updateColor = () => {
      if (typeof document === 'undefined') return;
      const cssValue = getComputedStyle(document.documentElement)
        .getPropertyValue(`--color-${colorKey}`).trim();
      setColor(cssValue || fallback || '');
    };
    
    // Update immediately
    updateColor();
    
    // Also listen for theme changes via data attribute changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && 
            mutation.attributeName === 'data-theme-version') {
          updateColor();
        }
      });
    });
    
    if (document.body) {
      observer.observe(document.body, { attributes: true });
    }
    
    return () => observer.disconnect();
  }, [colorKey, fallback, currentPreset]);
  
  return color;
}

/**
 * Hook to create rgba colors with dynamic opacity from theme colors
 * @param colorKey The theme color key
 * @returns Function to get rgba value with desired opacity
 */
export function useThemeRgba(colorKey: keyof ThemeColors) {
  const { getRgba } = useTheme();
  
  const getRgbaColor = useCallback((opacity: number) => {
    return getRgba(colorKey, opacity);
  }, [colorKey, getRgba]);
  
  return getRgbaColor;
}

/**
 * Hook to create CSS gradients with theme colors
 * @param startColor The start color key
 * @param endColor The end color key
 * @param direction The gradient direction (default: 'to right')
 * @returns The CSS gradient string
 */
export function useThemeGradient(
  startColor: keyof ThemeColors, 
  endColor: keyof ThemeColors,
  direction: string = 'to right'
): string {
  const { currentPreset } = useTheme();
  const [gradient, setGradient] = useState('');
  
  useEffect(() => {
    // Read directly from CSS variables for immediate updates
    const updateGradient = () => {
      if (typeof document === 'undefined') return;
      const start = getComputedStyle(document.documentElement)
        .getPropertyValue(`--color-${startColor}`).trim();
      const end = getComputedStyle(document.documentElement)
        .getPropertyValue(`--color-${endColor}`).trim();
      
      if (start && end) {
        setGradient(`linear-gradient(${direction}, ${start}, ${end})`);
      }
    };
    
    // Update immediately
    updateGradient();
    
    // Also listen for theme changes via data attribute changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && 
            mutation.attributeName === 'data-theme-version') {
          updateGradient();
        }
      });
    });
    
    if (document.body) {
      observer.observe(document.body, { attributes: true });
    }
    
    return () => observer.disconnect();
  }, [startColor, endColor, direction, currentPreset]);
  
  return gradient;
}

/**
 * Hook that indicates if the current theme is dark mode
 * @returns Boolean indicating if dark mode is active
 */
export function useIsDarkMode(): boolean {
  const { isDarkMode } = useTheme();
  return isDarkMode;
}

/**
 * Hook to dynamically apply theme colors to SVG elements
 * @param ref React ref to the SVG element
 * @param colorMapping Mapping from original colors to theme color keys
 */
export function useSvgTheming(
  svgRef: React.RefObject<SVGSVGElement | null>,
  colorMapping: Record<string, keyof ThemeColors>
) {
  const { currentPreset } = useTheme();
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Process the SVG and replace colors
    const svg = svgRef.current;
    
    // Function to process an element and its children
    const processElement = (el: Element) => {
      // Apply color to strokes
      if (el.hasAttribute('stroke')) {
        const originalColor = el.getAttribute('stroke');
        if (originalColor && colorMapping[originalColor]) {
          const themeColor = getComputedStyle(document.documentElement)
            .getPropertyValue(`--color-${colorMapping[originalColor]}`).trim();
          if (themeColor) {
            el.setAttribute('stroke', themeColor);
          }
        }
      }

      // Apply color to fills
      if (el.hasAttribute('fill')) {
        const originalColor = el.getAttribute('fill');
        if (originalColor && colorMapping[originalColor]) {
          const themeColor = getComputedStyle(document.documentElement)
            .getPropertyValue(`--color-${colorMapping[originalColor]}`).trim();
          if (themeColor) {
            el.setAttribute('fill', themeColor);
          }
        }
      }

      // Process all child elements
      Array.from(el.children).forEach(child => processElement(child));
    };

    // Start processing from the root SVG element
    processElement(svg);
  }, [svgRef, colorMapping, currentPreset]);
}

/**
 * Hook that provides immediate access to theme colors via CSS custom properties
 * This hook is more reactive than useThemeColor for immediate theme switching
 * @param colorKey The theme color key
 * @returns The current theme color value
 */
export function useThemeColorImmediate(colorKey: keyof ThemeColors): string {
  const { currentPreset } = useTheme();
  const [color, setColor] = useState('');
  
  useEffect(() => {
    const updateColor = () => {
      if (typeof document === 'undefined') return;
      const cssValue = getComputedStyle(document.documentElement)
        .getPropertyValue(`--color-${colorKey}`).trim();
      setColor(cssValue);
    };
    
    // Update immediately
    updateColor();
    
    // Listen for theme changes via data attribute changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && 
            (mutation.attributeName === 'data-theme-version' || 
             mutation.attributeName === 'data-theme-updated')) {
          updateColor();
        }
      });
    });
    
    if (document.body) {
      observer.observe(document.body, { attributes: true });
    }
    
    return () => observer.disconnect();
  }, [colorKey, currentPreset]);
  
  return color;
}
