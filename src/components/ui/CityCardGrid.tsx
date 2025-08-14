// Tailwind version with Framer Motion
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export type City = { name: string; body: string; image: string };

export default function CityCardGrid({ cities, id }: { cities: City[]; id?: string }) {
  const [hoveredIndex, setHoveredIndex] = useState(0); // First card expanded by default

  return (
    <motion.section 
      id={id} 
      initial={{ opacity: 0, y: 24 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      className="py-20 flex flex-col items-center justify-center"
    >
      <div className="flex gap-16 px-10 h-[450px] justify-center items-center">
        {cities.map((c, i) => {
          const isExpanded = hoveredIndex === i;
          const expandDirection = i === 1 ? "right" : "left"; // First and last expand left, middle expands right
          
          return (
            <motion.article
              key={c.name}
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
                  src={c.image} 
                  alt={`${c.name} city view`} 
                  fill 
                  className="object-cover transition-transform duration-800" 
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              {/* Content */}
              <div className="relative z-[1] h-full flex flex-col justify-end p-8 text-white">
                <motion.h4 
                  className="text-xl font-bold mb-4 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  {c.name}
                </motion.h4>
                
                <motion.p 
                  className="opacity-95 text-md leading-relaxed mb-6 max-w-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  {c.body}
                </motion.p>
                
                {/* Explore button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.4 }}
                  className="flex items-center gap-3 text-orange-400 font-semibold group-hover:text-orange-300 transition-colors"
                >
                  <span className="text-lg">Explore</span>
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
              <div className="absolute inset-0 border-2 border-transparent rounded-3xl group-hover:border-white/40 transition-colors duration-500" />
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}


