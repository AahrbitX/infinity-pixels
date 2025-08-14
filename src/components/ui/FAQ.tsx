import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactFormModal from './ContactFormModal';
import { FAQContent } from '@/lib/content';
import { useTheme } from '@/components/ThemeProvider';
import { useThemeRgba } from '@/lib/hooks/useThemeUtils';

interface FAQProps {
  id?: string;
  content: FAQContent;
}

export default function FAQ({ id, content }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { isDarkMode } = useTheme();
  const primaryRgba = useThemeRgba('primary');

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: 'var(--color-foreground)' }}
          >
            {content.title}
          </h2>
          <p 
            className="text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--color-foregroundMuted)' }}
          >
            {content.description}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {content.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-2xl shadow-lg overflow-hidden p-4"
              style={{ 
                backgroundColor: 'var(--color-background)', 
                borderColor: 'var(--color-border)',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between transition-colors duration-200"
                style={{ 
                  color: 'var(--color-foreground)',
                  ['--hover-bg' as string]: 'var(--color-backgroundAlt)'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-backgroundAlt)' }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '' }}
              >
                <h3 className="text-lg font-semibold pr-4" style={{ color: 'var(--color-foreground)' }}>
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: 'var(--color-foregroundMuted)' }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 py-4">
                      <p className="leading-relaxed" style={{ color: 'var(--color-foregroundMuted)' }}>
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg mb-6" style={{ color: 'var(--color-foregroundMuted)' }}>
            Still have questions? We&apos;re here to help!
          </p>
          <button
            onClick={openModal}
          >
            <div 
              className='flex justify-center items-center w-full py-3 px-6 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
              style={{
                backgroundColor: 'var(--color-primary)',
                color: isDarkMode ? '#000' : '#fff',
                boxShadow: `0 4px 12px ${primaryRgba(0.5)}`
              }}
            >Contact Us</div>
          </button>
        </motion.div>
        
        {/* Contact Form Modal */}
        <ContactFormModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </motion.section>
  );
}
