import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactFormModal from './ContactFormModal';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What photography services do you offer?",
    answer: "We specialize in wedding photography, engagement sessions, family portraits, corporate events, and special occasions. Our services include both photography and videography packages tailored to your specific needs."
  },
  {
    question: "How far in advance should I book my session?",
    answer: "For weddings, we recommend booking 6-12 months in advance, especially during peak season (spring and fall). For other sessions, 2-4 weeks notice is usually sufficient, but earlier booking ensures availability."
  },
  {
    question: "What is included in your photography packages?",
    answer: "Our packages include professional photography, edited high-resolution images, online gallery access, and print rights. Premium packages may include albums, engagement sessions, and additional coverage hours."
  },
  {
    question: "Do you travel for destination weddings?",
    answer: "Yes! We love destination weddings and frequently travel throughout the region. Travel fees apply for locations outside our standard service area, and we're happy to provide detailed pricing for your specific location."
  },
  {
    question: "How long does it take to receive my photos?",
    answer: "Wedding galleries are typically delivered within 4-6 weeks, while portrait sessions are delivered within 2-3 weeks. We always provide a few preview images within 48 hours of your session."
  },
  {
    question: "Can I customize a package to fit my budget?",
    answer: "Absolutely! We understand every event is unique, and we're happy to work with you to create a custom package that fits your vision and budget. Contact us to discuss your specific needs."
  },
  {
    question: "What happens if it rains on my wedding day?",
    answer: "We're experienced in shooting in all weather conditions and can create beautiful images rain or shine. We'll work with you to adjust the schedule and find creative indoor locations if needed."
  },
  {
    question: "Do you offer engagement sessions?",
    answer: "Yes! Engagement sessions are a great way to get comfortable with our photography style and build rapport before your big day. They're included in most wedding packages or can be booked separately."
  }
];

export default function FAQ({ id }: { id?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about our photography services and booking process
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden p-4"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                      <p className="text-gray-600 leading-relaxed">
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
          <p className="text-lg text-gray-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <button
            onClick={openModal}
          >
            <div className='flex justify-center items-center w-full bg-black text-white py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'>Contact Us</div>
          </button>
        </motion.div>
        
        {/* Contact Form Modal */}
        <ContactFormModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </motion.section>
  );
}
