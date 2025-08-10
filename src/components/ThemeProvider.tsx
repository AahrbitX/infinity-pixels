"use client";
import { ReactNode, useEffect } from 'react';
import { applyThemeToDocument, loadTheme } from '@/lib/theme';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    loadTheme()
      .then((t) => applyThemeToDocument(t))
      .catch(() => {});
  }, []);

  return <>{children}</>;
}


