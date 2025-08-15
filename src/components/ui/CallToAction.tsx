import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import ContactFormModal from './ContactFormModal';
import { CallToActionContent } from '@/lib/content';
import { useTheme } from '@/components/ThemeProvider';
import { useThemeColor, useThemeRgba } from '@/lib/hooks/useThemeUtils';

interface CallToActionProps {
  id?: string;
  content: CallToActionContent;
}

export default function CallToAction({ id, content }: CallToActionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const { isDarkMode } = useTheme();
  const primaryColor = useThemeColor('primary');
  const primaryRgba = useThemeRgba('primary');

  return (
    <motion.section>
        <motion.div 
        id={id} 
        initial={{ opacity: 0, y: 24 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        className="relative py-20 text-white rounded-3xl overflow-hidden h-full justify-self-center inverted-footer"
        >
        {/* Background Image */}
        <motion.div 
            initial={{ scale: 1.1 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0"
        >
            <Image 
            src={content.backgroundImage || "/images/camera.jpg"} 
            alt="Call to Action Background" 
            fill 
            className="object-cover" 
            priority
            />
        </motion.div>
        
        {/* Enhanced Overlay with Multiple Gradients */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom right, 
              rgba(0,0,0,0.6), 
              rgba(0,0,0,0.4), 
              rgba(0,0,0,0.7)
            )`
          }} 
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, 
              rgba(0,0,0,0.8), 
              transparent, 
              rgba(0,0,0,0.6)
            )`
          }} 
        />
        
        {/* Floating Particles Effect */}
        <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full opacity-60"
                style={{
                  backgroundColor: primaryColor,
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                }}
                animate={{
                y: [0, -20, 0],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
                }}
                transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
                }}
            />
            ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
            {/* Enhanced Header Section */}
            <div className="text-center mb-16">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="inline-block mb-6"
            >
                <span 
                  className="px-6 py-3 rounded-full font-semibold text-sm backdrop-blur-sm shadow-lg"
                  style={{
                    background: `linear-gradient(to right, ${primaryRgba(0.2)}, ${primaryRgba(0.15)})`,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: primaryRgba(0.3),
                    color: primaryColor
                  }}
                >
                ✨ Ready to Get Started?
                </span>
            </motion.div>
            
            <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, #ffffff, ${primaryRgba(0.9)}, #ffffff)`
                }}
            >
                {content.title}
            </motion.h2>
            
            <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            >
                {content.description}
            </motion.p>
            </div>

            {/* Enhanced CTA Buttons */}
            <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex justify-center items-center mb-16"
            >
            <button
                onClick={openModal}
            >   
                <div 
                  className='flex justify-center items-center w-full py-3 px-6 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
                  style={{
                    backgroundColor: primaryColor,
                    color: isDarkMode ? '#000' : '#fff',
                    boxShadow: `0 4px 12px ${primaryRgba(0.5)}`
                  }}
                >
                {content.buttonText}
                </div>
            </button>
            </motion.div>

            {/* Enhanced Contact Section */}
            <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center"
            >
            </motion.div>
        </div>

        </motion.div>

        <motion.div className='relative bottom-12 left-10 justify-self-start items-center'>
            <div 
              className='w-[250px] px-8 py-4 rounded-xl border-2 font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:cursor-pointer'
              style={{
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-foreground)',
                borderColor: 'var(--color-foreground)'
              }}
            >
                <button 
                    onClick={openModal}
                    className='flex justify-center items-center w-full'
                >
                    Book Your Session
                </button>
            </div>
        </motion.div>
        
        <ContactFormModal isOpen={isModalOpen} onClose={closeModal} />
    </motion.section>
  );
}
