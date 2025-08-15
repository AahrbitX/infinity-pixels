// Tailwind version with Framer Motion
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
// import { useTheme } from '@/components/ThemeProvider';
import { useThemeColorImmediate, useThemeRgba } from '@/lib/hooks/useThemeUtils';

export type Service = { name: string; body: string; image: string };

export default function ServiceSection({ 
  services, 
  id, 
  title = "Our Services",
  description = "Discover our comprehensive range of professional services designed to meet your needs"
}: { 
  services: Service[]; 
  id?: string;
  title?: string;
  description?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState(0); // First card expanded by default
  
  // const { isDarkMode } = useTheme();
  const primaryColor = useThemeColorImmediate('primary');
  const primaryRgba = useThemeRgba('primary');

  // Safety check to prevent map error
  if (!services || !Array.isArray(services)) {
    console.warn('ServiceSection: services prop is missing or not an array');
    return null; // or return a loading state/error message
  }

  return (
    <motion.section 
      id={id} 
      initial={{ opacity: 0, y: 24 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      className="py-20 flex flex-col items-center justify-center"
    >
      {/* Service Section Header */}
      <motion.div 
        className="text-center mb-16 px-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: 'var(--color-foreground)' }}
          >
            {title}
          </h2>
          <p 
            className="text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--color-foregroundMuted)' }}
          >
            {description}
          </p>

      </motion.div>

      {/* Service Cards Grid */}
      <div className="flex gap-16 px-10 h-[450px] justify-center items-center">
        {services.map((service, i) => {
          const isExpanded = hoveredIndex === i;
          // const expandDirection = i === 1 ? "right" : "left"; // First and last expand left, middle expands right
          
          return (
            <motion.article
              key={service.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              animate={{
                width: isExpanded ? "400px" : "300px",
                y: isExpanded ? -10 : 0,
                scale: isExpanded ? 1.05 : 1,
                x: 0 // No x movement to ensure equal margins
              }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(0)}
              className="relative h-[320px] rounded-3xl overflow-hidden group cursor-pointer flex-shrink-0 transition-all duration-800 ease-out"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image 
                  src={service.image} 
                  alt={`${service.name} service`} 
                  fill 
                  className="object-cover transition-transform duration-800" 
                />
              </div>
              
              {/* Overlay */}
              <div 
                className="absolute inset-0" 
                style={{
                  background: `linear-gradient(to top, 
                    rgba(0,0,0,0.9), 
                    rgba(0,0,0,0.5), 
                    transparent
                  )`
                }}
              />
              
              {/* Content */}
              <div className="relative z-[1] h-full flex flex-col justify-end p-8 text-white">
                <motion.h4 
                  className="text-xl font-bold mb-4 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  {service.name}
                </motion.h4>
                
                <motion.p 
                  className="opacity-95 text-md leading-relaxed mb-6 max-w-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  {service.body}
                </motion.p>
                
                {/* Learn More button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.4 }}
                  className="flex items-center gap-3 font-semibold transition-colors"
                  style={{ 
                    color: primaryColor
                  }}
                  whileHover={{
                    color: primaryRgba(0.8)
                  }}
                >
                  <span className="text-lg">Learn More</span>
                  <motion.span 
                    className="text-2xl"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </div>
              
              {/* Hover effect border */}
              <div 
                className="absolute inset-0 border-2 border-transparent rounded-3xl transition-colors duration-500" 
                style={{ 
                  ['--hover-border-color' as string]: primaryRgba(0.6)
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = primaryRgba(0.6); }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'transparent'; }}
              />
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}


