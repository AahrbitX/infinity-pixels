import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';

export type GalleryImage = {
  src: string;
  alt: string;
  title: string;
  instagramUrl?: string;
};

export default function Gallery({ id }: { id?: string }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const galleryImages: GalleryImage[] = [
    { 
      src: '/images/camera.jpg', 
      alt: 'Professional camera setup', 
      title: 'Camera Setup',
      instagramUrl: 'https://www.instagram.com/p/example1/'
    },
    { 
      src: '/images/wedding.jpg', 
      alt: 'Wedding photography', 
      title: 'Wedding',
      instagramUrl: 'https://www.instagram.com/p/example2/'
    },
    { 
      src: '/images/weding.jpg', 
      alt: 'Wedding ceremony', 
      title: 'Ceremony',
      instagramUrl: 'https://www.instagram.com/p/example3/'
    },
    { 
      src: '/images/camera.jpg', 
      alt: 'Professional camera setup', 
      title: 'Camera Setup',
      instagramUrl: 'https://www.instagram.com/p/example4/'
    },
    { 
      src: '/images/wedding.jpg', 
      alt: 'Wedding photography', 
      title: 'Wedding',
      instagramUrl: 'https://www.instagram.com/p/example5/'
    },
    { 
      src: '/images/weding.jpg', 
      alt: 'Wedding ceremony', 
      title: 'Ceremony',
      instagramUrl: 'https://www.instagram.com/p/example6/'
    },
    { 
      src: '/images/camera.jpg', 
      alt: 'Professional camera setup', 
      title: 'Camera Setup',
      instagramUrl: 'https://www.instagram.com/p/example7/'
    },
    { 
      src: '/images/wedding.jpg', 
      alt: 'Wedding photography', 
      title: 'Wedding',
      instagramUrl: 'https://www.instagram.com/p/example8/'
    },
    { 
      src: '/images/weding.jpg', 
      alt: 'Wedding ceremony', 
      title: 'Ceremony',
      instagramUrl: 'https://www.instagram.com/p/example9/'
    },
    { 
      src: '/images/camera.jpg', 
      alt: 'Professional camera setup', 
      title: 'Camera Setup',
      instagramUrl: 'https://www.instagram.com/p/example10/'
    },
    { 
      src: '/images/wedding.jpg', 
      alt: 'Wedding photography', 
      title: 'Wedding',
      instagramUrl: 'https://www.instagram.com/p/example11/'
    },
    { 
      src: '/images/weding.jpg', 
      alt: 'Wedding ceremony', 
      title: 'Ceremony',
      instagramUrl: 'https://www.instagram.com/p/example12/'
    },
  ];

  // Calculate proper dimensions for seamless scrolling
  const imageHeight = 350; // Height of each image
  const gapSize = 16; // Gap between images (gap-4 = 16px)
  const totalImages = galleryImages.length;
  const totalContentHeight = totalImages * imageHeight + (totalImages - 1) * gapSize;
  
  // For seamless loop, we need to duplicate images and calculate proper animation values
  // The animation should move exactly the height of one complete set of images
  const duplicatedImages = [...galleryImages, ...galleryImages, ...galleryImages];

  const openModal = useCallback((index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
    document.body.style.overflow = 'unset';
  }, []);

  const goToNext = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  }, [selectedImageIndex, galleryImages.length]);

  const goToPrevious = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === 0 ? galleryImages.length - 1 : selectedImageIndex - 1);
    }
  }, [selectedImageIndex, galleryImages.length]);

  const openInstagram = useCallback(() => {
    if (selectedImageIndex !== null && galleryImages[selectedImageIndex]?.instagramUrl) {
      window.open(galleryImages[selectedImageIndex].instagramUrl, '_blank');
    }
  }, [selectedImageIndex, galleryImages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, goToNext, goToPrevious, closeModal]);

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <motion.section 
      id={id} 
      initial={{ opacity: 0, y: 24 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      className="py-12 scroll-mt-28"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Gallery</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our stunning photography collection with infinite scrolling gallery
        </p>
      </div>

      <div className="relative w-full h-[800px] mx-auto overflow-hidden">
        {/* Top Gradient Overlay - Fades images in from top */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white via-white/90 to-transparent z-10 pointer-events-none"></div>
        
        {/* Bottom Gradient Overlay - Fades images out to bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/90 to-transparent z-10 pointer-events-none"></div>
        
        {/* Column 1 - Scrolls Up Continuously */}
        <div className="absolute left-0 top-0 w-1/5 h-full overflow-hidden">
          <motion.div
            className="flex flex-col gap-4 p-2"
            animate={{ y: [0, -totalContentHeight] }}
            transition={{
              duration: 75,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {duplicatedImages.map((image, index) => (
              <div key={`col1-${index}`} className="group cursor-pointer" onClick={() => openModal(index % galleryImages.length)}>
                <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg">
                  <Image 
                    src={image.src} 
                    alt={image.alt} 
                    fill 
                    className="object-cover transition-transform duration-800 group-hover:scale-125" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-semibold text-sm">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Column 2 - Scrolls Down Continuously */}
        <div className="absolute left-[20%] top-0 w-1/5 h-full overflow-hidden">
          <motion.div
            className="flex flex-col gap-4 p-2"
            animate={{ y: [-totalContentHeight, 0] }}
            transition={{
              duration: 75,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {duplicatedImages.map((image, index) => (
              <div key={`col2-${index}`} className="group cursor-pointer" onClick={() => openModal(index % galleryImages.length)}>
                <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg">
                  <Image 
                    src={image.src} 
                    alt={image.alt} 
                    fill 
                    className="object-cover transition-transform duration-800 group-hover:scale-125" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-semibold text-sm">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Column 3 - Scrolls Up Continuously */}
        <div className="absolute left-[40%] top-0 w-1/5 h-full overflow-hidden">
          <motion.div
            className="flex flex-col gap-4 p-2"
            animate={{ y: [0, -totalContentHeight] }}
            transition={{
              duration: 65,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {duplicatedImages.map((image, index) => (
              <div key={`col3-${index}`} className="group cursor-pointer" onClick={() => openModal(index % galleryImages.length)}>
                <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg">
                  <Image 
                    src={image.src} 
                    alt={image.alt} 
                    fill 
                    className="object-cover transition-transform duration-800 group-hover:scale-125" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-semibold text-sm">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Column 4 - Scrolls Down Continuously */}
        <div className="absolute left-[60%] top-0 w-1/5 h-full overflow-hidden">
          <motion.div
            className="flex flex-col gap-4 p-2"
            animate={{ y: [-totalContentHeight, 0] }}
            transition={{
              duration: 70,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {duplicatedImages.map((image, index) => (
              <div key={`col4-${index}`} className="group cursor-pointer" onClick={() => openModal(index % galleryImages.length)}>
                <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg">
                  <Image 
                    src={image.src} 
                    alt={image.alt} 
                    fill 
                    className="object-cover transition-transform duration-800 group-hover:scale-125" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-semibold text-sm">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Column 5 - Scrolls Up Continuously */}
        <div className="absolute left-[80%] top-0 w-1/5 h-full overflow-hidden">
          <motion.div
            className="flex flex-col gap-4 p-2"
            animate={{ y: [0, -totalContentHeight] }}
            transition={{
              duration: 65,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {duplicatedImages.map((image, index) => (
              <div key={`col5-${index}`} className="group cursor-pointer" onClick={() => openModal(index % galleryImages.length)}>
                <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg">
                  <Image 
                    src={image.src} 
                    alt={image.alt} 
                    fill 
                    className="object-cover transition-transform duration-800 group-hover:scale-125" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-semibold text-sm">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {isModalOpen && selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div 
              className="relative w-full max-w-6xl h-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              {/* Instagram Button */}
              {galleryImages[selectedImageIndex]?.instagramUrl && (
                <button
                  onClick={openInstagram}
                  className="absolute top-4 right-16 z-10 p-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full transition-colors"
                  title="View on Instagram"
                >
                  <Instagram size={24} />
                </button>
              )}

              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <ChevronLeft size={32} />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <ChevronRight size={32} />
              </button>

              {/* Image Display */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={galleryImages[selectedImageIndex].src}
                  alt={galleryImages[selectedImageIndex].alt}
                  fill
                  className="object-contain"
                  priority
                />
                
                {/* Image Info */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full">
                  <h3 className="text-lg font-semibold text-center">
                    {galleryImages[selectedImageIndex].title}
                  </h3>
                  <p className="text-sm text-center opacity-80">
                    {selectedImageIndex + 1} of {galleryImages.length}
                  </p>
                </div>
              </div>

              {/* Touch Instructions */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/60 text-sm text-center">
                <p>Swipe left/right or use arrow keys to navigate</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}


