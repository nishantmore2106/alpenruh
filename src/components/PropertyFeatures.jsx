import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PROPERTY_FEATURES = [
  {
    id: 'private-pool',
    number: '01',
    cardTitle: 'Private Pool',
    headingLine1: 'Private',
    headingLine2: 'Pool',
    description:
      'Relax in your own private pool with breathtaking views of the Swiss Alps. A perfect place to unwind, soak in the scenery and create unforgettable moments.',
    image: '/images/property-features/private-pool.webp',
  },
  {
    id: 'luxury-bedrooms',
    number: '02',
    cardTitle: 'Luxury Bedrooms',
    headingLine1: 'Luxury',
    headingLine2: 'Bedrooms',
    description:
      'Discover thoughtfully designed bedrooms with premium comfort, natural materials and peaceful mountain views. Every detail is created for a restful alpine escape.',
    image: '/images/property-features/luxury-bedroom.webp',
  },
  {
    id: 'gourmet-dining',
    number: '03',
    cardTitle: 'Gourmet Dining',
    headingLine1: 'Gourmet',
    headingLine2: 'Dining',
    description:
      'Share unforgettable meals with family and friends in beautiful dining spaces, surrounded by warm architecture and the spectacular Swiss alpine landscape.',
    image: '/images/property-features/gourmet-dining.webp',
  },
  {
    id: 'landscaped-gardens',
    number: '04',
    cardTitle: 'Landscaped Gardens',
    headingLine1: 'Landscaped',
    headingLine2: 'Gardens',
    description:
      'Enjoy beautifully landscaped outdoor spaces, peaceful garden corners and relaxing evenings surrounded by nature in the heart of the Swiss Alps.',
    image: '/images/property-features/landscaped-gardens.webp',
  },
];

// Smooth cubic-bezier curve equivalent to GSAP power3.inOut
const POWER3_IN_OUT = [0.65, 0, 0.35, 1];

/**
 * Minimal ALPENRUH Mountain Brand Mark SVG
 */
const AlpenruhBrandMark = () => (
  <div className="flex flex-col items-center select-none">
    <svg
      viewBox="0 0 64 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-11 sm:w-14 h-auto text-[#203C2A]"
      aria-hidden="true"
    >
      <path
        d="M4 19 L 18 7 L 25 13 L 34 3 L 45 14 L 51 8 L 60 19"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 3 L 31 12 L 36 16"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
    <span
      style={{ color: '#203C2A' }}
      className="mt-2 font-serif text-[10px] sm:text-xs tracking-[0.38em] uppercase font-normal"
    >
      ALPENRUH
    </span>
  </div>
);

const PropertyFeatures = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const activeFeature = PROPERTY_FEATURES[activeIndex];

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport, { passive: true });
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? PROPERTY_FEATURES.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === PROPERTY_FEATURES.length - 1 ? 0 : prev + 1
    );
  };

  const expandedHeight = isMobile ? 205 : 255;
  const compressedHeight = isMobile ? 124 : 162;

  return (
    <section
      id="property-features"
      aria-label="Interactive Property Features"
      style={{ backgroundColor: '#F7F5EF' }}
      className="relative min-h-screen w-full overflow-hidden select-none"
    >
      <div className="mx-auto flex min-h-screen max-w-[1680px] flex-col-reverse lg:flex-row">
        {/* LEFT COLUMN: Four Interactive Expandable Image Cards (~50% width) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 py-8 sm:px-8 sm:py-10 md:px-12 lg:pl-12 lg:pr-10 xl:pl-16 xl:pr-12 lg:py-10">
          <div className="flex flex-col gap-3 sm:gap-4 w-full lg:w-[94%]">
            {PROPERTY_FEATURES.map((feature, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={feature.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  animate={{
                    height: isActive ? expandedHeight : compressedHeight,
                  }}
                  transition={{
                    layout: { duration: 0.72, ease: POWER3_IN_OUT },
                    height: { duration: 0.72, ease: POWER3_IN_OUT },
                    opacity: { duration: 0.6, delay: index * 0.1 },
                    y: { duration: 0.6, delay: index * 0.1 },
                  }}
                  onClick={() => setActiveIndex(index)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`${feature.number} — ${feature.cardTitle}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveIndex(index);
                    }
                  }}
                  className={`
                    group relative w-full overflow-hidden rounded-[20px] sm:rounded-[24px] cursor-pointer
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#203C2A]
                    transition-shadow duration-700
                    ${
                      isActive
                        ? 'shadow-[0_20px_45px_-12px_rgba(32,60,42,0.28)]'
                        : 'shadow-[0_8px_24px_-8px_rgba(32,60,42,0.14)] opacity-90 hover:opacity-100'
                    }
                  `}
                >
                  {/* Feature Background Image with Smooth Scale Transition */}
                  <motion.img
                    src={feature.image}
                    alt={feature.cardTitle}
                    loading="lazy"
                    animate={{
                      scale: isActive ? 1.04 : 1,
                    }}
                    whileHover={{
                      scale: isActive ? 1.06 : 1.03,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: POWER3_IN_OUT,
                    }}
                    className="h-full w-full object-cover object-center"
                  />

                  {/* Dark Transparent Gradient Overlay for Text Readability */}
                  <div
                    className={`
                      pointer-events-none absolute inset-0
                      bg-gradient-to-r from-[#141E17]/75 via-[#141E17]/30 to-transparent
                      transition-opacity duration-700
                      ${isActive ? 'opacity-90' : 'opacity-80 group-hover:opacity-70'}
                    `}
                    aria-hidden="true"
                  />

                  {/* Card Bottom-Left Number & Serif Title */}
                  <div className="pointer-events-none absolute bottom-4 left-5 sm:bottom-6 sm:left-7 z-10 flex flex-col items-start">
                    <span className="font-serif text-xs sm:text-sm tracking-[0.14em] text-white/90">
                      {feature.number}
                    </span>

                    <h3
                      className={`
                        mt-0.5 sm:mt-1 font-serif text-white font-normal leading-[1.08] tracking-[-0.01em]
                        transition-all duration-700
                        ${
                          isActive
                            ? 'text-xl sm:text-[28px] lg:text-[31px]'
                            : 'text-lg sm:text-2xl'
                        }
                      `}
                    >
                      {feature.cardTitle.split(' ').map((word) => (
                        <span
                          key={word}
                          className={
                            feature.id === 'private-pool'
                              ? 'inline mr-1.5'
                              : 'block'
                          }
                        >
                          {word}
                        </span>
                      ))}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Dynamic Feature Content (~50% width) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between px-5 pt-10 pb-4 sm:px-10 sm:pt-12 sm:pb-8 md:px-14 lg:px-16 xl:px-20 lg:py-12">
          {/* Top Row: Minimal Brand Mark & Circular Image Counter */}
          <div className="relative flex items-center justify-between w-full">
            <div className="hidden sm:block w-16 sm:w-20" aria-hidden="true" />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <AlpenruhBrandMark />
            </motion.div>

            {/* Circular Active Image Counter (01 / 04) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              className="flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-[#687663]/35"
              aria-live="polite"
            >
              <div
                style={{ color: '#203C2A' }}
                className="flex items-center font-serif text-xs sm:text-sm tracking-[0.12em]"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeFeature.number}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: POWER3_IN_OUT }}
                    className="inline-block"
                  >
                    {activeFeature.number}
                  </motion.span>
                </AnimatePresence>
                <span className="mx-1 text-[#687663]/70">/</span>
                <span className="text-[#687663]">04</span>
              </div>
            </motion.div>
          </div>

          {/* Center Dynamic Editorial Heading & Description */}
          <div className="my-8 sm:my-10 lg:my-auto py-2 sm:py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.62, ease: POWER3_IN_OUT }}
              >
                {/* Large Two-Line Editorial Serif Heading */}
                <h2
                  style={{ color: '#203C2A' }}
                  className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[102px] leading-[0.95] tracking-[-0.02em] font-normal"
                >
                  <span className="block not-italic">
                    {activeFeature.headingLine1}
                  </span>
                  <span className="block italic font-normal mt-1">
                    {activeFeature.headingLine2}
                  </span>
                </h2>

                {/* Feature Description */}
                <p
                  style={{ color: '#687663' }}
                  className="mt-5 sm:mt-8 max-w-[540px] font-serif text-base sm:text-xl lg:text-[22px] leading-[1.55] font-normal"
                >
                  {activeFeature.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom-Right Circular Previous & Next Navigation Controls */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
            className="flex items-center justify-end space-x-3 sm:space-x-4 pt-2"
          >
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous property feature"
              className="group flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-[#687663]/40 bg-transparent text-[#203C2A] transition-all duration-300 hover:border-[#203C2A] hover:bg-[#203C2A] hover:text-[#F7F5EF] focus:outline-none"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 stroke-[1.35] transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next property feature"
              className="group flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-[#687663]/40 bg-transparent text-[#203C2A] transition-all duration-300 hover:border-[#203C2A] hover:bg-[#203C2A] hover:text-[#F7F5EF] focus:outline-none"
            >
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 stroke-[1.35] transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PropertyFeatures;
