// Tailwind version with Framer Motion
import { motion } from 'framer-motion';
import Image from 'next/image';

export type City = { name: string; body: string; image: string };

export default function CityCardGrid({ cities, id }: { cities: City[]; id?: string }) {
  return (
    <motion.section 
      id={id} 
      initial={{ opacity: 0, y: 24 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      className="py-12 scroll-mt-28"
    >
      <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1 max-lg:grid-cols-2">
        {cities.map((c, i) => (
          <motion.article
            key={c.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="relative h-[280px] rounded-2xl overflow-hidden group cursor-pointer"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image 
                src={c.image} 
                alt={`${c.name} city view`} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Content */}
            <div className="relative z-[1] h-full flex flex-col justify-end p-6 text-white">
              <motion.h4 
                className="text-2xl font-bold mb-3 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2 }}
              >
                {c.name}
              </motion.h4>
              
              <motion.p 
                className="opacity-90 text-lg leading-relaxed mb-4"
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
                className="flex items-center gap-2 text-orange-400 font-semibold group-hover:text-orange-300 transition-colors"
              >
                <span>Explore</span>
                <motion.span 
                  className="text-xl"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </motion.div>
            </div>
            
            {/* Hover effect border */}
            <div className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-white/30 transition-colors duration-300" />
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}


