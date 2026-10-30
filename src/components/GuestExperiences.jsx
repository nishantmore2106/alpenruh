import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EXPERIENCES = [
  {
    id: 'morning',
    src: '/images/guest-experiences/guest-morning.jpg',
    alt: 'Woman relaxing on the wooden outdoor terrace of Alpenruh with morning coffee overlooking the snow-covered Swiss Alps',
    rotation: -5.5,
    translateY: 18,
    widthClass: 'w-full sm:w-[270px] md:w-[255px] lg:w-[295px] xl:w-[325px]',
    heightClass: 'h-[260px] sm:h-[285px] md:h-[265px] lg:h-[305px] xl:h-[330px]',
    overlapClass: 'lg:mr-[-22px] xl:mr-[-26px]',
    zIndex: 10,
  },
  {
    id: 'dining',
    src: '/images/guest-experiences/guest-dining.jpg',
    alt: 'Friends enjoying an outdoor alpine dining experience on the Alpenruh farmhouse terrace',
    rotation: 3.4,
    translateY: -14,
    widthClass: 'w-full sm:w-[280px] md:w-[265px] lg:w-[310px] xl:w-[340px]',
    heightClass: 'h-[265px] sm:h-[295px] md:h-[275px] lg:h-[320px] xl:h-[345px]',
    overlapClass: 'lg:mx-[-18px] xl:mx-[-22px]',
    zIndex: 20,
  },
  {
    id: 'pool',
    src: '/images/guest-experiences/guest-pool.jpg',
    alt: 'Private crystal-clear swimming pool at Alpenruh during golden-hour sunset overlooking the Swiss Alps',
    rotation: -3.6,
    translateY: -8,
    widthClass: 'w-full sm:w-[275px] md:w-[260px] lg:w-[305px] xl:w-[335px]',
    heightClass: 'h-[260px] sm:h-[290px] md:h-[270px] lg:h-[312px] xl:h-[338px]',
    overlapClass: 'lg:mx-[-18px] xl:mx-[-22px]',
    zIndex: 30,
  },
  {
    id: 'alpine-moment',
    src: '/images/guest-experiences/guest-alpine-moment.jpg',
    alt: 'Couple sitting together on a lush green alpine meadow overlooking snow-capped Swiss mountain peaks',
    rotation: 5.2,
    translateY: 16,
    widthClass: 'w-full sm:w-[270px] md:w-[255px] lg:w-[295px] xl:w-[325px]',
    heightClass: 'h-[260px] sm:h-[285px] md:h-[265px] lg:h-[305px] xl:h-[330px]',
    overlapClass: 'lg:ml-[-22px] xl:ml-[-26px]',
    zIndex: 25,
  },
];

/**
 * Hand-drawn delicate botanical branch illustration (Left edge)
 */
const BotanicalLeftSVG = () => (
  <svg
    viewBox="0 0 220 340"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-36 sm:w-44 lg:w-56 h-auto text-[#84947B] opacity-55"
    aria-hidden="true"
  >
    {/* Main curving stem */}
    <path
      d="M-10 310 C 35 250, 75 180, 120 95 C 142 55, 165 28, 190 8"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinecap="round"
    />
    {/* Secondary lower stem */}
    <path
      d="M-5 245 C 28 210, 58 160, 72 105"
      stroke="currentColor"
      strokeWidth="0.95"
      strokeLinecap="round"
    />
    {/* Delicate leaves along primary stem */}
    <path
      d="M120 95 C 112 78, 118 64, 130 68 C 128 80, 124 89, 120 95 Z"
      stroke="currentColor"
      strokeWidth="0.95"
    />
    <path
      d="M136 69 C 152 62, 164 67, 160 77 C 150 78, 142 74, 136 69 Z"
      stroke="currentColor"
      strokeWidth="0.95"
    />
    <path
      d="M95 142 C 84 124, 90 108, 102 114 C 101 126, 98 135, 95 142 Z"
      stroke="currentColor"
      strokeWidth="0.95"
    />
    <path
      d="M106 120 C 124 114, 136 120, 130 130 C 120 130, 112 125, 106 120 Z"
      stroke="currentColor"
      strokeWidth="0.95"
    />
    <path
      d="M158 38 C 152 24, 158 14, 168 18 C 166 28, 162 34, 158 38 Z"
      stroke="currentColor"
      strokeWidth="0.9"
    />
    <path
      d="M168 28 C 182 24, 192 28, 187 36 C 179 36, 173 32, 168 28 Z"
      stroke="currentColor"
      strokeWidth="0.9"
    />
    {/* Small buds on secondary stem */}
    <path
      d="M48 168 C 38 152, 43 138, 54 143 C 54 154, 51 162, 48 168 Z"
      stroke="currentColor"
      strokeWidth="0.9"
    />
    <path
      d="M62 135 C 74 126, 84 130, 80 140 C 72 141, 66 138, 62 135 Z"
      stroke="currentColor"
      strokeWidth="0.9"
    />
    <circle cx="192" cy="7" r="2" fill="currentColor" />
    <circle cx="73" cy="102" r="1.8" fill="currentColor" />
  </svg>
);

/**
 * Hand-drawn delicate botanical branch illustration (Right edge)
 */
const BotanicalRightSVG = () => (
  <svg
    viewBox="0 0 200 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-32 sm:w-40 lg:w-48 h-auto text-[#84947B] opacity-55"
    aria-hidden="true"
  >
    <path
      d="M210 270 C 165 215, 125 148, 82 65 C 68 38, 54 18, 42 6"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
    <path
      d="M150 185 C 162 145, 158 105, 142 68"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
    />
    {/* Leaves */}
    <path
      d="M82 65 C 92 48, 86 35, 74 40 C 75 51, 79 59, 82 65 Z"
      stroke="currentColor"
      strokeWidth="0.95"
    />
    <path
      d="M70 46 C 54 40, 44 46, 49 55 C 57 55, 64 50, 70 46 Z"
      stroke="currentColor"
      strokeWidth="0.95"
    />
    <path
      d="M108 112 C 118 95, 112 81, 100 86 C 101 97, 105 106, 108 112 Z"
      stroke="currentColor"
      strokeWidth="0.95"
    />
    <path
      d="M96 92 C 80 86, 68 92, 74 102 C 83 102, 90 97, 96 92 Z"
      stroke="currentColor"
      strokeWidth="0.95"
    />
    <path
      d="M148 96 C 160 82, 156 68, 144 73 C 144 83, 146 90, 148 96 Z"
      stroke="currentColor"
      strokeWidth="0.9"
    />
    <circle cx="40" cy="5" r="2" fill="currentColor" />
    <circle cx="141" cy="65" r="1.8" fill="currentColor" />
  </svg>
);

/**
 * Small botanical sprig near bottom-right above the wave divider
 */
const BotanicalBottomRightSVG = () => (
  <svg
    viewBox="0 0 180 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-28 sm:w-36 lg:w-44 h-auto text-[#84947B] opacity-50"
    aria-hidden="true"
  >
    <path
      d="M175 215 C 140 165, 98 115, 42 52 C 28 36, 16 24, 6 15"
      stroke="currentColor"
      strokeWidth="1.05"
      strokeLinecap="round"
    />
    <path
      d="M118 140 C 128 102, 122 68, 106 38"
      stroke="currentColor"
      strokeWidth="0.85"
      strokeLinecap="round"
    />
    <path
      d="M65 78 C 75 62, 70 48, 58 53 C 59 64, 62 72, 65 78 Z"
      stroke="currentColor"
      strokeWidth="0.9"
    />
    <path
      d="M52 62 C 36 56, 26 62, 31 71 C 39 71, 46 66, 52 62 Z"
      stroke="currentColor"
      strokeWidth="0.9"
    />
    <path
      d="M94 110 C 104 94, 98 80, 86 85 C 87 96, 91 104, 94 110 Z"
      stroke="currentColor"
      strokeWidth="0.9"
    />
    <path
      d="M82 95 C 66 89, 55 95, 60 104 C 69 104, 76 99, 82 95 Z"
      stroke="currentColor"
      strokeWidth="0.9"
    />
    <circle cx="5" cy="14" r="1.8" fill="currentColor" />
    <circle cx="105" cy="36" r="1.6" fill="currentColor" />
  </svg>
);

/**
 * Custom Curved Flowing Divider with Hand-Drawn Swiss Mountain Illustration at Center
 */
const MountainDividerSVG = () => (
  <svg
    viewBox="0 0 1440 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto overflow-visible"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    {/* Left Flowing Curved Line */}
    <path
      d="M0 46 C 160 12, 330 22, 485 52 C 565 68, 625 66, 654 55"
      stroke="#263E2B"
      strokeWidth="1.35"
      strokeLinecap="round"
    />

    {/* Center Hand-Drawn Swiss Alps Mountain Peaks */}
    <g stroke="#263E2B" strokeLinecap="round" strokeLinejoin="round">
      {/* Main Outer Mountain Silhouette */}
      <path
        d="M662 56 L 684 32 L 696 43 L 720 14 L 744 42 L 757 29 L 778 56"
        strokeWidth="1.4"
      />
      {/* Central Peak Inner Ridge & Facet Shading Lines */}
      <path d="M720 14 L 714 36 L 724 46 L 720 56" strokeWidth="1.05" />
      <path d="M714 36 L 703 49" strokeWidth="0.9" />
      <path d="M720 14 L 731 35 L 724 46" strokeWidth="0.9" />
      {/* Left Peak Inner Ridge */}
      <path d="M684 32 L 680 46 L 687 54" strokeWidth="0.95" />
      {/* Right Peak Inner Ridge */}
      <path d="M757 29 L 761 44 L 753 53" strokeWidth="0.95" />
      {/* Subtle Foothill Accent Strokes */}
      <path d="M671 53 L 678 46" strokeWidth="0.8" opacity="0.7" />
      <path d="M765 47 L 772 54" strokeWidth="0.8" opacity="0.7" />
    </g>

    {/* Right Flowing Curved Line */}
    <path
      d="M786 55 C 815 66, 875 68, 955 52 C 1110 22, 1280 12, 1440 46"
      stroke="#263E2B"
      strokeWidth="1.35"
      strokeLinecap="round"
    />
  </svg>
);

const GuestExperiences = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section
      id="experience"
      aria-labelledby="guest-experiences-heading"
      style={{ backgroundColor: '#F7F5EF' }}
      className="relative w-full overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-14 lg:pt-28 lg:pb-16 select-none"
    >
      {/* Decorative Botanical Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="pointer-events-none absolute left-0 top-24 sm:top-28 lg:top-32 z-0"
      >
        <BotanicalLeftSVG />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.4, delay: 0.2, ease: 'easeOut' }}
        className="pointer-events-none absolute right-0 top-36 sm:top-44 lg:top-48 z-0"
      >
        <BotanicalRightSVG />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.4, delay: 0.35, ease: 'easeOut' }}
        className="pointer-events-none absolute right-0 bottom-14 sm:bottom-16 lg:bottom-20 z-0"
      >
        <BotanicalBottomRightSVG />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 lg:px-16">
        {/* 1. Centered Two-Line Editorial Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2
            id="guest-experiences-heading"
            style={{ color: '#263E2B' }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[74px] leading-[1.08] tracking-[-0.015em] font-normal"
          >
            <span className="block not-italic">Stories from our Guests,</span>
            <span className="block italic font-normal mt-0.5">
              Moments that Last a Lifetime.
            </span>
          </h2>
        </motion.div>

        {/* 2. Four Image Overlapping Tilted Collage */}
        <div
          className="
            relative mx-auto mt-12 sm:mt-16 lg:mt-20
            grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row lg:items-center lg:justify-center
            gap-7 sm:gap-6 lg:gap-0
            max-w-[640px] lg:max-w-none
            py-4 lg:py-8
          "
        >
          {EXPERIENCES.map((item, index) => {
            const isHovered = hoveredId === item.id;

            return (
              <motion.figure
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 48,
                  rotate: item.rotation * 0.5,
                }}
                whileInView={{
                  opacity: 1,
                  y: item.translateY,
                  rotate: item.rotation,
                }}
                whileHover={{
                  scale: 1.04,
                  rotate: item.rotation * 0.2,
                  y: item.translateY - 6,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.95,
                  delay: index * 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  zIndex: isHovered ? 50 : item.zIndex,
                }}
                className={`
                  relative mx-auto lg:mx-0
                  ${item.widthClass} ${item.heightClass} ${item.overlapClass}
                  rounded-[20px] border-[6px] border-white bg-white
                  overflow-hidden cursor-pointer
                   transition-shadow duration-500
                  ${
                    isHovered
                      ? 'shadow-[0_26px_55px_-12px_rgba(38,62,43,0.28),_0_8px_20px_rgba(0,0,0,0.1)]'
                      : 'shadow-[0_18px_40px_-10px_rgba(38,62,43,0.18),_0_4px_12px_rgba(0,0,0,0.06)]'
                  }
                `}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover rounded-[14px] transition-transform duration-700 ease-out"
                />
              </motion.figure>
            );
          })}
        </div>

        {/* 3. Centered Three-Line Supporting Editorial Copy Below Images */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.95, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 sm:mt-16 lg:mt-20 max-w-3xl text-center"
        >
          <p
            style={{ color: '#263E2B' }}
            className="font-serif text-lg sm:text-xl md:text-2xl lg:text-[26px] leading-[1.48] tracking-[-0.005em] font-normal"
          >
            <span className="block">
              From peaceful mornings to unforgettable evenings,
            </span>
            <span className="block">
              our guests can create beautiful memories at Alpenruh.
            </span>
            <span className="block">
              A place to reconnect, relax and experience the Swiss Alps.
            </span>
          </p>
        </motion.div>
      </div>

      {/* 4. Bottom Flowing Curved Mountain Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        className="relative z-10 mt-10 sm:mt-12 lg:mt-14 w-full"
      >
        <MountainDividerSVG />
      </motion.div>
    </section>
  );
};

export default GuestExperiences;

