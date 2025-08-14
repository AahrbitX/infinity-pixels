import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
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
              <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                Our Story
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            >
              Crafting the Perfect
              <span className="text-orange-500"> Experience </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 leading-relaxed"
            >
              We believe that exceptional coffee is more than just a beverage—it's an art form, 
              a ritual, and a moment of pure enjoyment. Every cup tells a story of passion, 
              precision, and the pursuit of perfection.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-6 pt-6"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">15+</div>
                <div className="text-gray-600">Years of Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
                <div className="text-gray-600">Unique Blends</div>
              </div>
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
                src="/images/camera.jpg"
                alt="Coffee brewing process"
                fill
                className="object-cover inverted"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" /> */}
              
              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
                  <div>
                    <div className="font-bold text-gray-900">Fresh Daily</div>
                    <div className="text-sm text-gray-600">Roasted to order</div>
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
