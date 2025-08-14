import Image from 'next/image';
import { motion } from 'framer-motion';

export type GalleryImage = {
  src: string;
  alt: string;
  title: string;
};

export default function Gallery({ id }: { id?: string }) {
  const galleryImages: GalleryImage[] = [
    { src: '/images/camera.jpg', alt: 'Professional camera setup', title: 'Camera Setup' },
    { src: '/images/wedding.jpg', alt: 'Wedding photography', title: 'Wedding' },
    { src: '/images/weding.jpg', alt: 'Wedding ceremony', title: 'Ceremony' },
    { src: '/images/camera.jpg', alt: 'Professional camera setup', title: 'Camera Setup' },
    { src: '/images/wedding.jpg', alt: 'Wedding photography', title: 'Wedding' },
    { src: '/images/weding.jpg', alt: 'Wedding ceremony', title: 'Ceremony' },
    { src: '/images/camera.jpg', alt: 'Professional camera setup', title: 'Camera Setup' },
    { src: '/images/wedding.jpg', alt: 'Wedding photography', title: 'Wedding' },
    { src: '/images/weding.jpg', alt: 'Wedding ceremony', title: 'Ceremony' },
    { src: '/images/camera.jpg', alt: 'Professional camera setup', title: 'Camera Setup' },
    { src: '/images/wedding.jpg', alt: 'Wedding photography', title: 'Wedding' },
    { src: '/images/weding.jpg', alt: 'Wedding ceremony', title: 'Ceremony' },
  ];

  // Calculate proper dimensions for seamless scrolling
  const imageHeight = 350; // Height of each image
  const gapSize = 16; // Gap between images (gap-4 = 16px)
  const totalImages = galleryImages.length;
  const totalContentHeight = totalImages * imageHeight + (totalImages - 1) * gapSize;
  
  // For seamless loop, we need to duplicate images and calculate proper animation values
  // The animation should move exactly the height of one complete set of images
  const duplicatedImages = [...galleryImages, ...galleryImages, ...galleryImages];

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
              <div key={`col1-${index}`} className="group">
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
              <div key={`col2-${index}`} className="group">
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
              <div key={`col3-${index}`} className="group">
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
              <div key={`col4-${index}`} className="group">
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
              <div key={`col5-${index}`} className="group">
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
    </motion.section>
  );
}


