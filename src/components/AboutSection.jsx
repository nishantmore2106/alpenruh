import React from 'react';
import { motion } from 'framer-motion';

const ABOUT_IMAGE_PATH = '/images/alpenruh-about.jpg';

const AboutSection = () => {
  return (
    <section
      id="estate"
      aria-labelledby="about-heading"
      style={{ backgroundColor: '#F7F5EF' }}
      className="relative w-full pt-14 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32 select-none"
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 md:px-14 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-start">
          {/* LEFT COLUMN: ABOUT US Label (~23% width on desktop) */}
          <div className="mb-6 lg:mb-0 lg:w-[23%] lg:shrink-0 lg:pt-3">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
              style={{
                backgroundColor: '#DDE3B0',
                color: '#34472E',
                letterSpacing: '2px',
              }}
              className="inline-block rounded-full px-4 py-1.5 font-sans text-[11px] font-medium uppercase leading-none"
            >
              ABOUT US
            </motion.span>
          </div>

          {/* RIGHT COLUMN: Main Heading, Supporting Description & Panoramic Photograph */}
          <div className="w-full lg:w-[77%]">
            {/* Main Two-Line Editorial Heading */}
            <motion.h2
              id="about-heading"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              style={{ color: '#203C2A' }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[78px] xl:text-[84px] leading-[1.04] tracking-[-0.015em] font-normal text-left"
            >
              <span className="block not-italic">More than a stay,</span>
              <span className="block italic font-normal mt-0.5">
                a place to belong.
              </span>
            </motion.h2>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.95,
                delay: 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ color: '#687663' }}
              className="mt-6 sm:mt-7 lg:mt-8 max-w-[950px] font-serif text-lg sm:text-xl md:text-[22px] lg:text-[24px] leading-[1.52] font-normal text-left"
            >
              At Alpenruh, we believe a home is more than just a place to stay —
              it&apos;s where meaningful moments happen. Nestled in the heart of
              the Swiss Alps, our estate offers a rare blend of natural beauty,
              privacy and timeless comfort, designed for families, friends and
              travelers seeking a slower, more authentic way to experience the
              mountains.
            </motion.p>

            {/* Panoramic Farmhouse Image */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.15, delay: 0.24, ease: 'easeOut' }}
              className="mt-7 sm:mt-8 lg:mt-9 w-full overflow-hidden rounded-[18px]"
            >
              <img
                src={ABOUT_IMAGE_PATH}
                alt="Panoramic view of the Alpenruh luxury Swiss alpine farmhouse surrounded by green meadows and snow-covered mountain peaks at golden hour"
                loading="lazy"
                className="h-[220px] sm:h-[280px] md:h-[320px] lg:h-[365px] xl:h-[380px] w-full object-cover object-center rounded-[18px]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

