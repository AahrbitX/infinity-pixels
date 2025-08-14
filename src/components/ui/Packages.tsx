import { motion } from 'framer-motion';
import { useState } from 'react';
// import ContactFormModal from './ContactFormModal';
// import { CheckIcon } from '@heroicons/react/24/outline';

export type Package = {
  id: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
};

export default function Packages({ id }: { id?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const packages: Package[] = [
    {
      id: 1,
      name: "Starter",
      price: "$299",
      description: "Perfect for small events and basic photography needs",
      features: [
        "2 hours of coverage",
        "50 edited photos",
        "Online gallery",
        "Basic editing",
        "Delivery within 5 days"
      ],
      cta: "Choose Starter"
    },
    {
      id: 2,
      name: "Professional",
      price: "$599",
      description: "Our most popular package for weddings and events",
      features: [
        "6 hours of coverage",
        "200 edited photos",
        "Online gallery",
        "Advanced editing",
        "Print rights",
        "Delivery within 3 days",
        "Engagement session"
      ],
      popular: true,
      cta: "Choose Professional"
    },
    {
      id: 3,
      name: "Premium",
      price: "$999",
      description: "Comprehensive coverage for special occasions",
      features: [
        "Full day coverage (10 hours)",
        "400 edited photos",
        "Online gallery",
        "Premium editing",
        "Print rights",
        "Same day delivery",
        "Engagement session",
        "Wedding album",
        "Video highlights"
      ],
      cta: "Choose Premium"
    }
  ];

  return (
    <motion.section 
      id={id} 
      initial={{ opacity: 0, y: 24 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Choose Your Package
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            We offer flexible packages to suit every need and budget. Choose the perfect option for your special day.
          </motion.p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 flex flex-col ${
                pkg.popular 
                  ? 'border-blue-500 shadow-blue-100' 
                  : 'border-gray-200'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Package Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-blue-600">{pkg.price}</span>
                </div>
                <p className="text-gray-600">{pkg.description}</p>
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
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                // onClick={openModal}
                // whileHover={{ scale: 1.05 }}
                // whileTap={{ scale: 0.95 }}
                // className={}
              >
                <div className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors duration-300 mt-auto ${
                  pkg.popular
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}>{pkg.cta}</div>
              </button>
            </motion.div>
          ))}
        </div>
        
        {/* Contact Form Modal */}
        {/* <ContactFormModal isOpen={isModalOpen} onClose={closeModal} /> */}
      </div>
    </motion.section>
  );
}
