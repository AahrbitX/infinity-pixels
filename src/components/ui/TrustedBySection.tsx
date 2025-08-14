import { motion } from 'framer-motion';

export default function TrustedBySection() {
  const companies = [
   
    {
      name: "HUNTER'S",
      logo: "HUNTER'S",
      tagline: 'Dawson Club',
      subtitle: 'HUNTING SUPPLIES EST.1972',
      details: '72 • 23',
      icon: '🦌',
      number: ''
    },
    {
      name: 'BIKECO',
      logo: 'BIKECO',
      tagline: 'Genuine Handcrafted Steelworks',
      subtitle: 'AUTHENTIC LABEL MADE IN UNITED KINGDOM',
      details: 'ESTD 2004',
      icon: '🚲',
      number: ''
    },

    {
      name: 'Anchorhead',
      logo: 'Anchorhead',
      tagline: 'STREETWEAR',
      subtitle: 'EST 89 SNC',
      details: 'THE HEAVY WEIGHT 100% COTTON',
      icon: '⚓',
      number: '89'
    },
    {
      name: 'Michelles',
      logo: 'Michelles',
      tagline: 'Vintage',
      subtitle: 'AUTHENTIC -1954-',
      details: 'RETROBRAND',
      icon: '',
      number: ''
    },
    {
      name: 'EASTWOOD INC.',
      logo: 'EASTWOOD INC.',
      tagline: 'ESTD MMIX 2009',
      subtitle: 'AUTHENTIC LABEL Eastwood Incorporated',
      details: '',
      icon: '',
      number: 'MMIX'
    },
    {
      name: 'HAVANA',
      logo: 'HAVANA',
      tagline: 'Handcraft',
      subtitle: 'ORIGINAL LABEL MANUFACTURED IN NEW YORK',
      details: 'SERIES 02',
      icon: '',
      number: ''
    },

    {
      name: 'HAVANA',
      logo: 'HAVANA',
      tagline: 'Handcraft',
      subtitle: 'ORIGINAL LABEL MANUFACTURED IN NEW YORK',
      details: 'SERIES 02',
      icon: '',
      number: ''
    },
    {
      name: 'SOUTHBEACH',
      logo: 'SOUTHBEACH',
      tagline: 'Southside Authentic',
      subtitle: 'ORIGINAL NEW YORK',
      details: '',
      icon: '',
      number: ''
    },
    {
      name: 'NORD HAUS',
      logo: 'NORD HAUS',
      tagline: 'PREMIUM 1982',
      subtitle: 'ESTD',
      details: '',
      icon: '',
      number: ''
    },

  ];

  return (
    <section className="py-20 bg-white">
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
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            >
              Trusted by Top Companies
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg font-medium text-gray-600"
            >
              Simply Design & Creative
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4 text-gray-500 leading-relaxed"
            >
              <p>
                Cupcake ipsum dolor sit amet. Sweet chupa chups cheesecake sugar plum. Sesame snaps cotton
              </p>
              <p>
                candy pie pie lemon drops ice cream croissant cheesecake. Tootsie roll tiramisu candy
              </p>
            </motion.div>
          </motion.div>

          {/* Right Section - Company Logos Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-3 gap-4"
          >
            {companies.map((company, index) => (
              <motion.div
                key={`${company.name}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white rounded-lg p-3 text-center min-h-[120px] flex flex-col justify-center hover:border-gray-400 transition-colors duration-300"
              >
                {company.name === 'STATON' && (
                  <div className="text-xs leading-tight">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-left">
                        <div className="flex items-center gap-1">
                          <span className="text-lg">⚓</span>
                          <span className="font-bold">{company.number}</span>
                        </div>
                        <div className="text-[8px] uppercase">AUTHENTICS</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase">{company.tagline}</div>
                        <div className="text-lg font-bold">{company.logo}</div>
                      </div>
                    </div>
                    <div className="bg-black text-white text-[8px] px-1 py-0.5 mb-1">{company.subtitle}</div>
                    <div className="text-[6px] leading-tight">{company.details}</div>
                  </div>
                )}

                {company.name === "HUNTER'S" && (
                  <div className="text-xs leading-tight">
                    <div className="text-center mb-1">
                      <div className="text-lg">🦌</div>
                      <div className="font-bold text-lg">{company.logo}</div>
                      <div className="text-sm italic">{company.tagline}</div>
                    </div>
                    <div className="flex justify-center gap-2 text-[8px] mb-1">
                      <span className="bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center">{company.details.split(' • ')[0]}</span>
                      <span className="bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center">{company.details.split(' • ')[1]}</span>
                    </div>
                    <div className="text-[6px] uppercase">{company.subtitle}</div>
                  </div>
                )}

                {company.name === 'BIKECO' && (
                  <div className="text-xs leading-tight">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-left">
                        <div className="text-lg">🚲</div>
                        <div className="text-[8px]">{company.details}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{company.logo}</div>
                        <div className="text-[8px] italic">{company.tagline.split(' ')[0]}</div>
                        <div className="text-[6px]">{company.tagline.split(' ').slice(1).join(' ')}</div>
                      </div>
                    </div>
                    <div className="text-[6px] leading-tight">{company.subtitle}</div>
                  </div>
                )}

                {company.name === 'NORD HAUS' && (
                  <div className="text-xs leading-tight">
                    <div className="text-center">
                      <div className="text-[8px] uppercase mb-1">{company.subtitle}</div>
                      <div className="text-lg font-bold mb-1">{company.logo}</div>
                      <div className="text-[8px] uppercase">{company.tagline}</div>
                    </div>
                  </div>
                )}

                {company.name === 'Anchorhead' && (
                  <div className="text-xs leading-tight">
                    <div className="text-center">
                      <div className="text-lg italic mb-1">{company.logo}</div>
                      <div className="text-[8px] uppercase mb-1">{company.tagline}</div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="text-[8px]">{company.subtitle.split(' ')[0]}</span>
                        <span className="bg-gray-200 rounded-full w-3 h-3 flex items-center justify-center text-[6px]">{company.number}</span>
                        <span className="text-[8px]">{company.subtitle.split(' ').slice(2).join(' ')}</span>
                      </div>
                      <div className="text-[6px] uppercase">{company.details}</div>
                    </div>
                  </div>
                )}

                {company.name === 'Michelles' && (
                  <div className="text-xs leading-tight">
                    <div className="text-center">
                      <div className="text-[8px] uppercase mb-1">{company.subtitle}</div>
                      <div className="text-xl italic mb-1">{company.logo}</div>
                      <div className="text-sm italic mb-1">{company.tagline}</div>
                      <div className="text-[8px] uppercase">{company.details}</div>
                    </div>
                  </div>
                )}

                {company.name === 'EASTWOOD INC.' && (
                  <div className="text-xs leading-tight">
                    <div className="text-center">
                      <div className="text-lg font-bold mb-1">{company.logo}</div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="text-[8px]">{company.tagline.split(' ')[0]}</span>
                        <span className="bg-gray-200 rounded-full w-3 h-3 flex items-center justify-center text-[6px]">{company.number}</span>
                        <span className="text-[8px]">{company.tagline.split(' ').slice(2).join(' ')}</span>
                      </div>
                      <div className="text-[8px] italic">{company.subtitle}</div>
                    </div>
                  </div>
                )}

                {company.name === 'HAVANA' && (
                  <div className="text-xs leading-tight">
                    <div className="text-center">
                      <div className="text-lg font-bold mb-1">{company.logo}</div>
                      <div className="text-[8px] mb-1">{company.tagline}</div>
                      <div className="text-[6px] leading-tight mb-1">{company.subtitle}</div>
                      <div className="text-[8px]">{company.details}</div>
                    </div>
                  </div>
                )}

                {company.name === 'SOUTHBEACH' && (
                  <div className="text-xs leading-tight">
                    <div className="text-center">
                      <div className="text-[8px] italic mb-1">{company.subtitle}</div>
                      <div className="text-lg font-bold mb-1">{company.logo}</div>
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <div className="w-4 h-px bg-gray-400"></div>
                        <span className="text-[8px] uppercase">{company.tagline}</span>
                        <div className="w-4 h-px bg-gray-400"></div>
                      </div>
                      <div className="text-[6px] uppercase">{company.details}</div>
                    </div>
                  </div>
                )}

                {company.name === 'Company' && (
                  <div className="text-xs leading-tight">
                    <div className="text-center text-gray-300">
                      <div className="w-full h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                        <span className="text-[8px]">Logo</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
