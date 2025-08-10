import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import type { DefaultSeoProps } from 'next-seo';
import { useEffect, useMemo, useState } from 'react';
import '@/styles/globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import { AnimatePresence, motion } from 'framer-motion';
import NavBar from '@/components/ui/NavBar';

type SeoConfig = DefaultSeoProps;

export default function MyApp({ Component, pageProps }: AppProps<{ __seo?: SeoConfig }>) {
  const [seo, setSeo] = useState<SeoConfig | undefined>(pageProps.__seo);

  useEffect(() => {
    if (!seo) {
      fetch('/content/seo.json')
        .then((r) => (r.ok ? r.json() : undefined))
        .then((data) => setSeo(data))
        .catch(() => {});
    }
  }, [seo]);

  const defaultSeo = useMemo(() => seo ?? {}, [seo]);

  return (
    <>
      <DefaultSeo {...defaultSeo} />
      <ThemeProvider>
        <NavBar />
        <AnimatePresence mode="wait">
          <motion.div
            key={(pageProps as any)?._key ?? typeof window !== 'undefined' ? location.pathname : 'server'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}

