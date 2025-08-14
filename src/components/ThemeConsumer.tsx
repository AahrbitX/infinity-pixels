"use client";

import { ReactNode, useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

interface ThemeConsumerProps {
  children: ReactNode;
  forceRerender?: boolean;
}

/**
 * A component that forces children to re-render when theme changes
 */
export default function ThemeConsumer({ 
  children,
  forceRerender = true
}: ThemeConsumerProps) {
  const { currentPreset } = useTheme();
  const [key, setKey] = useState(currentPreset);
  
  // Update key when theme changes to force re-render
  useEffect(() => {
    if (forceRerender) {
      setKey(`theme-${currentPreset}-${Date.now()}`);
    }
  }, [currentPreset, forceRerender]);
  
  if (forceRerender) {
    return <div key={key}>{children}</div>;
  }
  
  return <>{children}</>;
}
