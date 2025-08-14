import { motion } from 'framer-motion';
import { useState } from 'react';
import { PackageContent } from '@/lib/content';
import { useTheme } from '@/components/ThemeProvider';
import { useThemeColor, useThemeRgba } from '@/lib/hooks/useThemeUtils';
// import ContactFormModal from './ContactFormModal';
// import { CheckIcon } from '@heroicons/react/24/outline';

interface PackagesProps {
  id?: string;
  content: PackageContent;
}

export default function Packages({ id, content }: PackagesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const { isDarkMode } = useTheme();
  const primaryColor = useThemeColor('primary');
  const primaryRgba = useThemeRgba('primary');

  return (
    <motion.section 
      id={id} 
      initial={{ opacity: 0, y: 24 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      className="py-20"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: 'var(--color-foreground)' }}
          >
            {content.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--color-foregroundMuted)' }}
          >
            {content.description}
          </motion.p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.items.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 flex flex-col"
              style={{
                backgroundColor: 'var(--color-background)',
                borderColor: pkg.popular ? primaryColor : 'var(--color-border)',
                boxShadow: pkg.popular ? `0 4px 20px ${primaryRgba(0.15)}` : undefined
              }}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span 
                    className="px-4 py-2 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: primaryColor,
                      color: isDarkMode ? '#000' : '#fff'
                    }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              {/* Package Header */}
              <div className="text-center mb-8">
                <h3 
                  className="text-2xl font-bold mb-2"
                  style={{ color: 'var(--color-foreground)' }}
                >
                  {pkg.title}
                </h3>
                <div className="mb-4">
                  <span 
                    className="text-4xl font-bold"
                    style={{ color: primaryColor }}
                  >
                    {pkg.price}
                  </span>
                  <span 
                    className="text-lg ml-2"
                    style={{ color: 'var(--color-foregroundMuted)' }}
                  >
                    /{pkg.duration}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                    className="flex items-center"
                  >
                    {/* <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> */}
                    <span style={{ color: 'var(--color-foregroundMuted)' }}>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href={pkg.ctaHref}
                className="w-full py-3 px-6 rounded-xl font-semibold transition-colors duration-300 mt-auto text-center"
                style={{
                  backgroundColor: pkg.popular ? primaryColor : 'var(--color-backgroundAlt)',
                  color: pkg.popular ? (isDarkMode ? '#000' : '#fff') : 'var(--color-foreground)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = pkg.popular 
                    ? primaryRgba(0.8)
                    : isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = pkg.popular 
                    ? primaryColor 
                    : 'var(--color-backgroundAlt)';
                }}
              >
                {pkg.ctaText}
              </a>
            </motion.div>
          ))}
        </div>
        
        {/* Contact Form Modal */}
        {/* <ContactFormModal isOpen={isModalOpen} onClose={closeModal} /> */}
      </div>
    </motion.section>
  );
}
