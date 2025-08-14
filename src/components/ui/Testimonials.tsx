import { motion } from 'framer-motion';
import Image from 'next/image';
import { TestimonialContent } from '@/lib/content';
import { useTheme } from '@/components/ThemeProvider';
import { useThemeColor, useThemeRgba } from '@/lib/hooks/useThemeUtils';

interface TestimonialsProps {
  id?: string;
  content: TestimonialContent;
}

export default function Testimonials({ id, content }: TestimonialsProps) {
  const { isDarkMode } = useTheme();
  const primaryColor = useThemeColor('primary');
  const primaryRgba = useThemeRgba('primary');
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className="w-5 h-5"
        style={{ 
          color: i < rating ? primaryColor : 'var(--color-border)' 
        }}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <motion.section 
      id={id} 
      initial={{ opacity: 0, y: 24 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      className="py-20"
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ 
                backgroundColor: 'var(--color-background)',
                borderColor: 'var(--color-border)',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
                <span 
                  className="ml-2 text-sm"
                  style={{ color: 'var(--color-foregroundMuted)' }}
                >
                  ({testimonial.rating}.0)
                </span>
              </div>

              {/* Testimonial Text */}
              <p 
                className="mb-6 leading-relaxed"
                style={{ color: 'var(--color-foreground)' }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Client Info */}
              <div className="flex items-center">
                <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden mr-4 mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 
                    className="font-semibold" 
                    style={{ color: 'var(--color-foreground)' }}
                  >
                    {testimonial.name}
                  </h4>
                  <p 
                    className="text-sm" 
                    style={{ color: 'var(--color-foregroundMuted)' }}
                  >
                    {testimonial.position}
                  </p>
                  <p 
                    className="text-xs" 
                    style={{ color: 'var(--color-foregroundMuted)', opacity: 0.8 }}
                  >
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
