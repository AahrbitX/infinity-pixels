import { motion } from 'framer-motion';
import Image from 'next/image';

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  photo: string;
};

export default function Testimonials({ id }: { id?: string }) {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Bride",
      company: "Wedding Client",
      rating: 5,
      text: "Absolutely incredible work! Our wedding photos captured every magical moment perfectly. The attention to detail and artistic vision exceeded our expectations.",
      photo: "/images/wedding.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CEO",
      company: "TechCorp",
      rating: 5,
      text: "Professional, creative, and delivered exactly what we needed for our corporate event. The team was punctual and the results were outstanding.",
      photo: "/images/camera.jpg"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Model",
      company: "Fashion Industry",
      rating: 5,
      text: "Working with this photographer was a dream! The portrait session was so comfortable and the final images are absolutely stunning.",
      photo: "/images/weding.jpg"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Event Manager",
      company: "EventPro",
      rating: 5,
      text: "Exceptional service from start to finish. They captured our event beautifully and delivered the photos ahead of schedule.",
      photo: "/images/camera.jpg"
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Marketing Director",
      company: "BrandCo",
      rating: 5,
      text: "The product photography elevated our brand significantly. Professional, creative, and delivered exactly what we envisioned.",
      photo: "/images/wedding.jpg"
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Real Estate Agent",
      company: "PropertyMax",
      rating: 5,
      text: "Outstanding real estate photography that helps our properties sell faster. The quality and attention to detail is unmatched.",
      photo: "/images/weding.jpg"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
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
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Don't just take our word for it. Here's what our amazing clients have to say about their experience with us.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Rating */}
              {/* <div className="relative w-full h-[200px] rounded-lg overflow-hidden mr-4 mb-4">
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div> */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
                <span className="ml-2 text-sm text-gray-600">({testimonial.rating}.0)</span>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Client Info */}
              <div className="flex items-center">
              <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden mr-4 mb-4">
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
