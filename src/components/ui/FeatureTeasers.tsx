import Image from 'next/image';
import { motion } from 'framer-motion';

export type Feature = {
  heading: string;
  body: string;
  media?: string;
  variant?: 'text' | 'media';
};

export default function FeatureTeasers({ features, id }: { features: Feature[]; id?: string }) {
  return (
    <motion.section 
      id={id} 
      initial={{ opacity: 0, y: 24 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      className="py-12 scroll-mt-28"
    >
      <div className="grid grid-cols-[1.1fr_1fr] gap-8 max-md:grid-cols-1">
        {features.map((f, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 12 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: i * 0.1 }} 
            whileHover={{ y: -4, scale: 1.02 }} 
            className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
          >
            {f.variant === 'media' && f.media ? (
              <div className="relative h-48 rounded-xl overflow-hidden mb-4 group">
                <Image 
                  src={f.media} 
                  alt={`${f.heading} feature image`} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.button 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.95 }}
                  className="absolute bottom-3 right-3 w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm font-bold text-black shadow-lg hover:bg-white transition-colors"
                  aria-label="Play feature video"
                >
                  ▶
                </motion.button>
              </div>
            ) : null}
            
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">{f.heading}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{f.body}</p>
              
              {/* Feature indicator */}
              <div className="flex items-center gap-2 pt-2">
                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                <span className="text-sm text-gray-500 font-medium">
                  {f.variant === 'media' ? 'Featured Content' : 'Key Feature'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}


