import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useThemeRgba } from '@/lib/hooks/useThemeUtils';

export type HeroProps = {
  slides: Array<{
    backgroundImage?: string;
    backgroundVideo?: string;
    eyebrow: string;
    title: string;
    description: string;
    statLabel: string;
    statBody: string;
    statImage: string;
    ctaLabel: string;
    ctaHref?: string;
  }>;
};

export default function Hero(props: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  
  const { isDarkMode } = useTheme();
  const primaryRgba = useThemeRgba('primary');
  
  // Get slides from props
  const slides = props.slides;
  
  // Auto-slide functionality
  useEffect(() => {
    if (slides.length > 1) {
      autoSlideRef.current = setInterval(() => {
        setSlideDirection('left');
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000); // Change slide every 5 seconds

      return () => {
        if (autoSlideRef.current) {
          clearInterval(autoSlideRef.current);
        }
      };
    }
  }, [slides.length]);

  // Reset auto-slide timer when manually changing slides
  useEffect(() => {
    if (slides.length > 1 && autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      
      autoSlideRef.current = setInterval(() => {
        setSlideDirection('left');
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
  }, [currentSlide, slides.length]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // const nextSlide = () => {
  //   setSlideDirection('left');
  //   setCurrentSlide((prev) => (prev + 1) % slides.length);
  // };

  // const prevSlide = () => {
  //   setSlideDirection('right');
  //   setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  // };

  // const goToSlide = (index: number) => {
  //   setSlideDirection(index > currentSlide ? 'left' : 'right');
  //   setCurrentSlide(index);
  // };

  // Auto-slide functionality
  useEffect(() => {
    autoSlideRef.current = setInterval(() => {
      setSlideDirection('left');
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, []);

  // Reset auto-slide timer when manually changing slides
  useEffect(() => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
    
    autoSlideRef.current = setInterval(() => {
      setSlideDirection('left');
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  }, [currentSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative w-full min-h-[520px] rounded-3xl overflow-hidden">
      <motion.div 
        initial={{ scale: 1.06 }} 
        animate={{ scale: 1 }} 
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        {currentSlideData.backgroundVideo ? (
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="w-full h-full object-cover"
            preload="metadata"
            aria-hidden="true"
          >
            <source src={currentSlideData.backgroundVideo} type="video/mp4" />
            {currentSlideData.backgroundImage && (
              <Image 
                src={currentSlideData.backgroundImage} 
                alt="Hero background fallback" 
                fill 
                priority 
                className="object-cover" 
              />
            )}
          </video>
        ) : currentSlideData.backgroundImage ? (
          <Image 
            src={currentSlideData.backgroundImage} 
            alt="Hero background" 
            fill 
            priority 
            className="object-cover" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-700" />
        )}
      </motion.div>
      
      <div 
        className="absolute inset-0" 
        style={{
          background: `linear-gradient(to bottom, 
            rgba(0,0,0,0.45), 
            rgba(0,0,0,0.35), 
            rgba(0,0,0,0.6)
          )`
        }}
      />
      
      {/* Content */}
      <div className="relative z-[2] text-white grid gap-4 px-5 py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: slideDirection === 'left' ? 150 : -150 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: slideDirection === 'left' ? -150 : 150 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="grid gap-4 ml-10"
          >
            <div className="mt-32">
              <motion.span 
                initial={{ opacity: 0, x: slideDirection === 'left' ? 50 : -50 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.1, duration: 0.5 }} 
                className="px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm"
                style={{
                  backgroundColor: `${primaryRgba(0.1)}`,
                  borderColor: `${primaryRgba(0.2)}`,
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
              >
                {currentSlideData.eyebrow}
              </motion.span>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, x: slideDirection === 'left' ? 80 : -80 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.15, duration: 0.5 }} 
              className="[font-family:var(--font-heading)] text-[76px] leading-[0.95] tracking-[-0.02em] font-bold"
            >
              {currentSlideData.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, x: slideDirection === 'left' ? 60 : -60 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.2, duration: 0.5 }} 
              className="max-w-xl opacity-80 text-lg"
            >
              {currentSlideData.description}
            </motion.p>

            <div className="mt-2 grid grid-cols-[1fr_auto] items-end">
              <motion.div 
                initial={{ opacity: 0, x: slideDirection === 'left' ? 40 : -40 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.25, duration: 0.5 }} 
                className="flex gap-4"
              >
                {/* Stat card */}
                <div 
                  className="grid grid-cols-[48px_1fr] h-[200px] items-center gap-3 p-3 rounded-2xl backdrop-blur-sm"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.3)',
                    borderColor: `${primaryRgba(0.25)}`,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    boxShadow: `inset 0 0 0 1px ${primaryRgba(0.05)}`
                  }}
                >
                  <div className="w-8 h-8 rounded-xl overflow-hidden">
                    <Image src={currentSlideData.statImage} alt="Stat" width={44} height={44} />
                  </div>
                  <div>
                    <div className="font-bold">{currentSlideData.statLabel}</div>
                    <div className="opacity-80 text-sm">{currentSlideData.statBody}</div>
                  </div>
                </div>
              </motion.div>

              {/* Navigation Controls */}
              {/* {slides.length > 1 && (
                <div className="flex items-center gap-3 mr-6 mb-6"> */}
                  {/* Previous Button */}
                  {/* <motion.button 
                    whileHover={{ scale: 1.05, rotate: -6 }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={() => {
                      setSlideDirection('right');
                      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
                    }}
                    aria-label="Previous slide"
                    className="w-11 h-11 rounded-full border border-white/70 bg-white/20 text-white font-black shadow-[0_6px_16px_rgba(0,0,0,0.25)] hover:bg-white/30 transition-colors backdrop-blur-sm"
                  >
                    ←
                  </motion.button> */}

                  {/* Next Button */}
                  {/* <motion.button 
                    whileHover={{ scale: 1.05, rotate: 6 }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={() => {
                      setSlideDirection('left');
                      setCurrentSlide((prev) => (prev + 1) % slides.length);
                    }}
                    aria-label="Next slide"
                    className="w-11 h-11 rounded-full border border-white/70 bg-orange-400 text-black font-black shadow-[0_6px_16px_rgba(0,0,0,0.25)] hover:bg-orange-300 transition-colors"
                  >
                    →
                  </motion.button>
                </div>
              )} */}

            </div>
          </motion.div>
          
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-[3]">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setSlideDirection(index > currentSlide ? 'left' : 'right');
                setCurrentSlide(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-orange-400 scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

{/*       
      <motion.button 
          whileHover={{ scale: 1.05, rotate: 6 }} 
          whileTap={{ scale: 0.95 }} 
          onClick={nextSlide}
          aria-label="Next slide"
          className="w-11 h-11 rounded-full border border-white/70 bg-orange-400 text-black font-black shadow-[0_6px_16px_rgba(0,0,0,0.25)] hover:bg-orange-300 transition-colors"
        >
          →
        </motion.button> */}

      {/* Sound Toggle Button */}
      {currentSlideData.backgroundVideo && (
        <div className="absolute top-6 right-6 z-[3]">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="w-12 h-12 text-white border-0 focus:outline-none focus:ring-0 transition-all duration-300 flex items-center justify-center"
          >
            {isMuted ? (
              <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            )}
          </motion.button>
        </div>
      )}

      {/* Bottom CTA Section */}
      <div className="relative border-none rounded-3xl">
        <span
          className="flex justify-self-end items-end p-5 right-0"
          style={{
            WebkitMaskImage:
              'radial-gradient(circle 40px at 0 0, transparent 39.5px, black 40px)',
            backgroundColor: 'var(--color-background)'
          }}
        ></span>
        <div className="flex justify-end items-end border-none rounded-3xl">
        <span
          className="p-5 right-0"
          style={{
            WebkitMaskImage:
              'radial-gradient(circle 40px at 0 0, transparent 39.5px, black 40px)',
            backgroundColor: 'var(--color-background)'
          }}
        ></span>
          <div className="p-2 w-[300px] border-none rounded-tl-2xl" style={{ backgroundColor: 'var(--color-background)' }}>
            <Link 
              className="flex justify-center items-center p-2 w-[250px] ml-2 rounded-2xl font-bold text-lg transition-colors"
              style={{
                backgroundColor: 'transparent',
                color: isDarkMode ? 'var(--color-foreground)' : 'var(--color-foreground)',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: isDarkMode ? 'var(--color-foreground)' : 'var(--color-foreground)'
              }}
              href={currentSlideData.ctaHref || '#'}
              aria-label={`${currentSlideData.ctaLabel} - navigate to next section`}
            >
              {currentSlideData.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


