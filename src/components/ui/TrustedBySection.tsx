import { motion } from 'framer-motion';
import Image from 'next/image';
import { TrustedByContent } from '@/lib/content';

interface TrustedBySectionProps {
  content: TrustedByContent;
}

export default function TrustedBySection({ content }: TrustedBySectionProps) {
  
  return (
    <section 
      className="py-20"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Section - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: 'var(--color-foreground)' }}
            >
              {content.title}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg leading-relaxed"
              style={{ color: 'var(--color-foregroundMuted)' }}
            >
              {content.description}
            </motion.p>
          </motion.div>

          {/* Right Section - Company Logos Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-3 gap-4"
          >
            {content.logos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="rounded-lg p-3 text-center min-h-[120px] flex flex-col justify-center transition-colors duration-300"
                style={{ 
                  backgroundColor: 'var(--color-background)', 
                  borderColor: 'var(--color-border)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  ['--hover-border-color' as string]: 'var(--color-foregroundMuted)'
                }}
                whileHover={{
                  borderColor: 'var(--color-foregroundMuted)'
                }}
              >
                <Image 
                  src={logo} 
                  alt="Company logo" 
                  width={100}
                  height={100}
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
