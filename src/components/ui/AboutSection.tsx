import { motion } from 'framer-motion';
import Image from 'next/image';
import { AboutContent } from '@/lib/content';
import { useTheme } from '@/components/ThemeProvider';
import { useThemeColorImmediate, useThemeRgba } from '@/lib/hooks/useThemeUtils';

interface AboutSectionProps {
  content: AboutContent;
}

export default function AboutSection({ content }: AboutSectionProps) {
  const { isDarkMode } = useTheme();
  const primaryColor = useThemeColorImmediate('primary');
  const primaryRgba = useThemeRgba('primary');
  
  return (
    <section 
      id="about" 
      className="py-20"
      // style={{ 
      //   background: isDarkMode 
      //     ? `linear-gradient(to bottom right, var(--color-backgroundAlt), var(--color-background))` 
      //     : `linear-gradient(to bottom right, #f9fafb, var(--color-background))`
      // }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span 
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{ 
                  backgroundColor: primaryRgba(0.15),
                  color: primaryColor
                }}
              >
                {content.tagline}
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: 'var(--color-foreground)' }}
            >
              {content.title.split(' ').map((word, i, arr) => 
                i === arr.length - 1 ? 
                  <span key={i} style={{ color: primaryColor }}> {word} </span> : 
                  <span key={i}>{word} </span>
              )}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl leading-relaxed"
              style={{ color: 'var(--color-foregroundMuted)' }}
            >
              {content.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-6 pt-6"
            >
              {content.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>{stat.value}</div>
                  <div style={{ color: 'var(--color-foregroundMuted)' }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden ">
              <Image
                src={content.image}
                alt="About us image"
                fill
                className="object-cover inverted"
              />
              
              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-6 right-6 backdrop-blur-sm rounded-xl p-4 shadow-lg"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.95)',
                  borderColor: 'var(--color-border)',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full animate-pulse" 
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div>
                    <div className="font-bold" style={{ color: 'var(--color-foreground)' }}>{content.floatingCard.title}</div>
                    <div className="text-sm" style={{ color: 'var(--color-foregroundMuted)' }}>{content.floatingCard.subtitle}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}