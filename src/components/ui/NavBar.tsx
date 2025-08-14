import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import ThemeSwitcher from './ThemeSwitcher';
import { NavItem } from '@/lib/content';
import { useTheme } from '@/components/ThemeProvider';
import { useThemeColor } from '@/lib/hooks/useThemeUtils';

interface NavBarProps {
  items?: NavItem[];
}

export default function NavBar({ items = [] }: NavBarProps) {
  const [docked, setDocked] = useState(false);
  const [menuItems, setMenuItems] = useState<NavItem[]>(items);
  const router = useRouter();
  const [currentAnchor, setCurrentAnchor] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const primaryColor = useThemeColor('primary');
  const backgroundColor = useThemeColor('background');
  const foregroundColor = useThemeColor('foreground');
  
  // Load nav items from JSON if not provided
  useEffect(() => {
    // Always hydrate menu from JSON so navbar works across all pages
    fetch('/content/home.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.nav) setMenuItems(data.nav as NavItem[]);
      })
      .catch(() => {});
  }, []);


  useEffect(() => {
    const onScroll = () => setDocked(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track which in-page section (anchor) is active on the homepage
  useEffect(() => {
    if (router.pathname !== '/') return;
    const anchorIds = menuItems.map((i) => i.anchor).filter(Boolean) as string[];
    const elements = anchorIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el instanceof HTMLElement);
    if (elements.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Choose the entry most in view
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
        
        if (visible[0]?.target?.id) {
          setCurrentAnchor(visible[0].target.id);
        } else {
          // If no sections are visible, check if we're at the top (home section)
          const scrollTop = window.scrollY;
          if (scrollTop < 100) {
            setCurrentAnchor(null);
          }
        }
      },
      { root: null, rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => io.observe(el));
    
    // Also listen to scroll to detect when we're back at the top
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop < 100) {
        setCurrentAnchor(null);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuItems, router.pathname]);

  // When navigating to '/', clear anchor so the Home route can be active
  useEffect(() => {
    const handleRoute = (url: string) => {
      if (url === '/') {
        // Check if there's a hash in the URL
        if (window.location.hash) {
          const hash = window.location.hash.substring(1);
          setCurrentAnchor(hash);
        } else {
          setCurrentAnchor(null);
        }
      }
    };
    router.events.on('routeChangeComplete', handleRoute);
    return () => router.events.off('routeChangeComplete', handleRoute);
  }, [router.events]);

  // Handle hash changes and scroll to sections
  useEffect(() => {
    const handleHashChange = () => {
      if (router.pathname === '/' && window.location.hash) {
        const hash = window.location.hash.substring(1);
        const element = document.getElementById(hash);
        if (element) {
          // Set the current anchor immediately
          setCurrentAnchor(hash);
          // Scroll to the element with a small delay to ensure the page is fully loaded
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    };

    // Handle initial hash
    if (router.pathname === '/' && window.location.hash) {
      handleHashChange();
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [router.pathname]);

  // Use a constant fixed container; animate the 'top' position with Framer for smooth docking
  const containerClass = 'fixed z-50 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:right-auto';

  const navClassDesktop = `relative hidden md:inline-block ${docked ? 'w-[700px]' : 'w-[600px]'} px-0 py-0 rounded-l-[15px] rounded-r-[15px] before:content-[''] before:absolute before:top-0 before:left-0 before:w-[200px] before:h-full before:bg-[var(--color-background)] before:skew-x-[25deg] before:-translate-x-1/2 before:rounded-tl-[20px] before:rounded-bl-[20px] before:z-[-1] after:content-[''] after:absolute after:top-0 after:right-0 after:w-[200px] after:h-full after:bg-[var(--color-background)] after:skew-x-[-25deg] after:translate-x-1/2 after:rounded-tr-[20px] after:rounded-br-[20px] after:z-[-1] transition-all duration-300`;

  const navClassMobile = 'md:hidden w-full px-3';

  return (
    <motion.div
      initial={{ opacity: 0, y: -16, top: 8 }}
      animate={{ opacity: 1, y: 0, top: docked ? 0 : 8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`flex justify-center items-start ${containerClass}`}
      style={{ position: 'fixed' as const }}
    >
      {/* Mobile bar */}
      <div className={navClassMobile}>
        <div 
          className="flex items-center justify-between rounded-lg px-3 py-2 shadow-md"
          style={{ 
            backgroundColor: 'var(--color-background)',
            color: 'var(--color-foreground)'
          }}
        >
          <button
            aria-label="Toggle navigation"
            className="p-2"
            onClick={() => setIsOpen((v) => !v)}
          >
            {/* simple hamburger */}
            <span className="block w-5 h-0.5 mb-1" style={{ backgroundColor: 'var(--color-foreground)' }} />
            <span className="block w-5 h-0.5 mb-1" style={{ backgroundColor: 'var(--color-foreground)' }} />
            <span className="block w-5 h-0.5" style={{ backgroundColor: 'var(--color-foreground)' }} />
          </button>
          
          {/* Add theme switcher to mobile nav */}
          <ThemeSwitcher />
        </div>

        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          className="overflow-hidden mt-2 rounded-2xl border"
          style={{ 
            backgroundColor: 'var(--color-background)',
            color: 'var(--color-foreground)',
            borderColor: 'var(--color-border)'
          }}
        >
          <ul className="flex flex-col" style={{ borderColor: 'var(--color-border)' }}>
            {(menuItems || []).map((it) => {
              const href = it.anchor ? `/#${it.anchor}` : it.href ?? '#';
              const isActiveRoute = !!it.href && router.pathname === it.href && !(router.pathname === '/' && currentAnchor);
              const isActiveAnchor = router.pathname === '/' && !!it.anchor && currentAnchor === it.anchor;
              const isActive = isActiveRoute || isActiveAnchor;
              return (
                <li key={it.label} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <Link
                    href={href}
                    scroll={true}
                    onClick={(e) => {
                      setIsOpen(false);
                      if (it.anchor) {
                        e.preventDefault();
                        if (router.pathname !== '/') {
                          // Navigate to home page with hash, then let the hash handler do the scrolling
                          router.push(`/#${it.anchor as string}`);
                        } else {
                          // Already on home page, just scroll to section
                          const el = document.getElementById(it.anchor as string);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            setCurrentAnchor(it.anchor as string);
                          }
                        }
                      } else if (it.href === '/') {
                        setCurrentAnchor(null);
                      }
                    }}
                    className={`block px-4 py-3 transition-all duration-300 ease-out nav-link ${isActive ? 'border-l-4' : ''}`}
                    style={{ 
                      backgroundColor: isActive ? 'var(--color-backgroundAlt)' : 'transparent',
                      borderLeftColor: isActive ? 'var(--color-primary)' : 'transparent'
                    }}
                  >
                    <span className="inline-flex items-center gap-2">
                      {isActive && (
                        <motion.span 
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}
                        />
                      )}
                      {it.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>

      {/* Desktop bar */}
      <nav className={navClassDesktop} style={{ 
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-foreground)'
      }}>
        <div className="flex items-center justify-between h-15 px-8">
          <ul className={`relative hidden md:flex justify-center gap-6 list-none m-0 p-0 ${docked ? 'py-3 mx-auto' : ''}`}>
            {(menuItems || []).map((it) => {
              const href = it.anchor ? `/#${it.anchor}` : it.href ?? '#';
              const isActiveRoute = !!it.href && router.pathname === it.href && !(router.pathname === '/' && currentAnchor);
              const isActiveAnchor = router.pathname === '/' && !!it.anchor && currentAnchor === it.anchor;
              const isActive = isActiveRoute || isActiveAnchor;
              return (
                <li key={it.label} className="relative px-1 py-0.5">
                  <Link
                    href={href}
                    scroll={true}
                    onClick={(e) => {
                      if (it.anchor) {
                        e.preventDefault();
                        if (router.pathname !== '/') {
                          // Navigate to home page with hash, then let the hash handler do the scrolling
                          router.push(`/#${it.anchor as string}`);
                        } else {
                          // Already on home page, just scroll to section
                          const el = document.getElementById(it.anchor as string);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            setCurrentAnchor(it.anchor as string);
                          }
                        }
                      } else if (it.href === '/') {
                        // Allow route navigation; clear anchor highlight immediately
                        setCurrentAnchor(null);
                      }
                    }}
                    className={`transition-all duration-300 ease-out px-3 py-1 rounded-full nav-link ${isActive ? 'scale-105' : 'hover:scale-105'}`}
                    style={{ 
                      backgroundColor: isActive ? 'var(--color-backgroundAlt)' : 'transparent',
                      color: isActive ? 'var(--color-foreground)' : 'var(--color-foregroundMuted)'
                    }}
                  >
                    <span className="inline-flex items-center gap-2">
                      {isActive && (
                        <motion.span 
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}
                        />
                      )}
                      {it.label}
                    </span>
                  </Link>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-pill" 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ backgroundColor: 'var(--color-primary)', opacity: 0.15 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
          
          {/* Add theme switcher to desktop nav */}
          <ThemeSwitcher className="hidden md:block" />
        </div>
      </nav>
    </motion.div>
  );
}