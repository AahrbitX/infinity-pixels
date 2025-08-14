import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import ContactFormModal from './ContactFormModal';

export default function CallToAction({ id }: { id?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <motion.section>
        <motion.div 
        id={id} 
        initial={{ opacity: 0, y: 24 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        className="relative py-20 text-white rounded-3xl overflow-hidden h-full justify-self-center inverted-footer"
        >
        {/* Background Image */}
        <motion.div 
            initial={{ scale: 1.1 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0"
        >
            <Image 
            src="/images/camera.jpg" 
            alt="Call to Action Background" 
            fill 
            className="object-cover" 
            priority
            />
        </motion.div>
        
        {/* Enhanced Overlay with Multiple Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
        
        {/* Floating Particles Effect */}
        <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-2 h-2 bg-orange-400 rounded-full opacity-60"
                style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                }}
                animate={{
                y: [0, -20, 0],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
                }}
                transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
                }}
            />
            ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
            {/* Enhanced Header Section */}
            <div className="text-center mb-16">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="inline-block mb-6"
            >
                <span className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-400/20 to-pink-400/20 border border-orange-400/30 text-orange-300 font-semibold text-sm backdrop-blur-sm shadow-lg">
                ✨ Ready to Capture Your Story?
                </span>
            </motion.div>
            
            <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent"
            >
                Let's Create
            </motion.h2>
            
            <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            >
                Let's create something beautiful together. Whether it's your wedding day, a special event, or professional portraits, we're here to turn your vision into stunning memories.
            </motion.p>
            </div>

            {/* Enhanced CTA Buttons - Only Get a Quote */}
            <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex justify-center items-center mb-16"
            >
            <button
                onClick={openModal}
                className="group px-10 py-5 rounded-2xl font-bold text-lg border-2 border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-white/20"
            >   <div className='flex justify-center items-center w-full bg-lime-400 text-white py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'>
                Call For Offer
                </div>
            </button>
            </motion.div>

            {/* Enhanced Contact Section */}
            <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center"
            >
            </motion.div>
        </div>

        </motion.div>

        <motion.div className='relative bottom-12 left-10 justify-self-start items-center'>
            <div className='bg-white w-[250px] text-black px-8 py-4 rounded-xl border-2 border-black font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:cursor-pointer'>
                <button 
                    onClick={openModal}
                    className='flex justify-center items-center w-full'
                >
                    Book Your Session
                </button>
            </div>
        </motion.div>
        
        {/* Contact Form Modal */}
        <ContactFormModal isOpen={isModalOpen} onClose={closeModal} />
    </motion.section>
  );
}
