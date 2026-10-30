import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, X, Compass } from 'lucide-react';

const HERO_BANNER_IMAGE = '/images/alpenruh-experiences-hero.webp';

const CURRENT_EXPERIENCES = [
  {
    id: 'alpine-hiking',
    titleLine1: 'Alpine',
    titleLine2: 'Hiking Trails',
    fullTitle: 'Alpine Hiking Trails',
    image: '/images/current-experiences/alpine-hiking.webp',
    season: 'May – October · Direct Estate Access',
    details:
      'Step directly from the Alpenruh grounds onto scenic high-altitude trails winding through wildflower meadows, pine forests, and panoramic ridge viewpoints overlooking the snow-covered Swiss Alps.',
  },
  {
    id: 'lake-escapes',
    titleLine1: 'Lake',
    titleLine2: 'Escapes',
    fullTitle: 'Lake Escapes',
    image: '/images/current-experiences/lake-escapes.webp',
    season: 'Year-Round · 15 Minutes from Estate',
    details:
      'Unwind beside crystal-clear turquoise glacial lakes framed by pine forests and mirrored mountain peaks, with private wooden boat charters and serene shoreline picnic spots.',
  },
  {
    id: 'winter-adventures',
    titleLine1: 'Winter',
    titleLine2: 'Adventures',
    fullTitle: 'Winter Adventures',
    image: '/images/current-experiences/winter-adventures.webp',
    season: 'November – April · World-Class Slopes',
    details:
      'Experience pristine powder slopes, private alpine ski guides, scenic snowshoe trails, and tranquil winter landscapes just moments from the warmth of the farmhouse.',
  },
  {
    id: 'swiss-villages',
    titleLine1: 'Nearby',
    titleLine2: 'Swiss Villages',
    fullTitle: 'Nearby Swiss Villages',
    image: '/images/current-experiences/swiss-villages.webp',
    season: 'Year-Round · Cultural & Culinary Heritage',
    details:
      'Stroll through timeless Swiss mountain villages featuring historic timber chalets, charming church steeples, artisan cheese cellars, and intimate alpine gastronomy.',
  },
];

/**
 * Minimal ALPENRUH Mountain Brand Mark (Positioned at top-center of the curved banner)
 */
const AlpenruhBannerMark = () => (
  <div className="flex flex-col items-center select-none">
    <svg
      viewBox="0 0 68 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 sm:w-14 h-auto text-[#203C2A] drop-shadow-[0_1px_8px_rgba(255,255,255,0.65)]"
      aria-hidden="true"
    >
      <path
        d="M4 20 L 19 7 L 26 14 L 35 3 L 46 15 L 53 8 L 64 20"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35 3 L 32 13 L 37 17"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span
      style={{ color: '#203C2A' }}
      className="mt-1 sm:mt-1.5 font-sans text-[10px] sm:text-xs tracking-[0.34em] uppercase font-normal drop-shadow-[0_1px_8px_rgba(255,255,255,0.75)]"
    >
      ALPENRUH
    </span>
  </div>
);

const ExperiencesSection = () => {
  const cardsGridRef = useRef(null);
  const [activeExperience, setActiveExperience] = useState(null);

  const handleViewAllClick = () => {
    if (cardsGridRef.current) {
      cardsGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (!activeExperience) {
      setActiveExperience(CURRENT_EXPERIENCES[0]);
    }
  };

  const handleCardClick = (experience) => {
    setActiveExperience((prev) =>
      prev?.id === experience.id ? null : experience
    );
  };

  return (
    <section
      id="experiences-at-alpenruh"
      aria-label="Experiences at Alpenruh"
      style={{ backgroundColor: '#F7F5EF' }}
      className="relative w-full overflow-hidden pb-16 sm:pb-24 lg:pb-28 select-none"
    >
      {/* ============================================================
          1. UPPER HERO IMAGE WITH LARGE SYMMETRICAL CURVED LOWER EDGE
         ============================================================ */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className="relative w-full h-[260px] sm:h-[360px] md:h-[430px] lg:h-[480px] overflow-hidden"
      >
        {/* Main Farmhouse Terrace & Swiss Alps Photograph */}
        <img
          src={HERO_BANNER_IMAGE}
          alt="Alpenruh luxury Swiss farmhouse outdoor terrace with dining table and snow-covered mountain peaks"
          className="h-full w-full object-cover object-center"
        />

        {/* Subtle localized center readability veil behind the white serif heading */}
        <div
          style={{
            background:
              'radial-gradient(ellipse 46% 42% at 50% 52%, rgba(20, 32, 24, 0.36) 0%, rgba(20, 32, 24, 0) 100%)',
          }}
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        />

        {/* Top-Center ALPENRUH Brand Mark */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.15, ease: 'easeOut' }}
          className="absolute top-4 sm:top-8 inset-x-0 z-10 flex justify-center"
        >
          <AlpenruhBannerMark />
        </motion.div>

        {/* Centered Two-Line Editorial Serif Heading: "Experiences at Alpenruh" */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4 pt-6">
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.95,
              delay: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-serif text-white text-center text-3xl sm:text-5xl md:text-6xl lg:text-[74px] xl:text-[82px] leading-[1.04] tracking-[-0.015em] font-normal drop-shadow-[0_4px_24px_rgba(15,24,18,0.45)]"
          >
            <span className="block">Experiences</span>
            <span className="block mt-0.5">at Alpenruh</span>
          </motion.h2>
        </div>

        {/* Symmetrical Downward-Bowed Arch Mask Transitioning into #F7F5EF */}
        <svg
          viewBox="0 0 1440 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 z-20 h-full w-full"
          aria-hidden="true"
        >
          <path
            d="M0 95 C 165 385, 455 478, 720 478 C 985 478, 1275 385, 1440 95 L 1440 480 L 0 480 Z"
            fill="#F7F5EF"
          />
        </svg>
      </motion.div>

      {/* ============================================================
          2. LOWER CONTENT CONTAINER
         ============================================================ */}
      <div className="relative z-20 mx-auto max-w-[1380px] px-5 sm:px-10 md:px-14 lg:px-16">
        {/* Introductory Row: Left Description + Right "View All Experiences" Pill */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 sm:mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-5 sm:gap-6"
        >
          {/* Left Two-Line Description */}
          <p
            style={{ color: '#3B4F3F' }}
            className="max-w-xl font-serif text-base sm:text-xl lg:text-[22px] leading-[1.42] font-normal text-left"
          >
            <span className="block">
              Discover curated experiences around our farmhouse,
            </span>
            <span className="block">
              designed to make your alpine stay even more memorable.
            </span>
          </p>

          {/* Right Minimal Sage-Green Pill Button */}
          <button
            type="button"
            onClick={handleViewAllClick}
            style={{
              backgroundColor: '#E5EAC7',
              color: '#203C2A',
            }}
            className="group self-start md:self-center inline-flex items-center space-x-4 rounded-full px-6 py-3 sm:px-7 sm:py-3.5 font-sans text-xs sm:text-[13px] tracking-[0.04em] font-normal transition-all duration-300 hover:bg-[#d8dfB2] focus:outline-none"
          >
            <span>View All Experiences</span>
            <ArrowUpRight className="h-4 w-4 stroke-[1.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>

        {/* Section Heading: "Current Experiences" */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ color: '#203C2A' }}
          className="mt-8 sm:mt-12 lg:mt-14 font-serif text-3xl sm:text-5xl lg:text-[58px] leading-[1.06] tracking-[-0.015em] font-normal text-left"
        >
          Current Experiences
        </motion.h3>

        {/* Four Responsive Experience Cards */}
        <div
          ref={cardsGridRef}
          className="mt-6 sm:mt-8 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
        >
          {CURRENT_EXPERIENCES.map((item, index) => {
            const isSelected = activeExperience?.id === item.id;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => handleCardClick(item)}
                role="button"
                tabIndex={0}
                aria-expanded={isSelected}
                aria-label={item.fullTitle}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(item);
                  }
                }}
                className={`
                  group relative w-full
                  h-[225px] sm:h-[250px] lg:h-[265px]
                  rounded-[16px] overflow-hidden cursor-pointer
                  transition-all duration-500 focus:outline-none
                  ${
                    isSelected
                      ? 'ring-2 ring-[#203C2A] shadow-[0_16px_36px_rgba(32,60,42,0.22)]'
                      : 'shadow-[0_8px_24px_rgba(32,60,42,0.10)]'
                  }
                `}
              >
                {/* Card Photograph */}
                <img
                  src={item.image}
                  alt={item.fullTitle}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle Bottom Dark Gradient Overlay for Text Readability */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121F16]/85 via-[#121F16]/25 to-transparent"
                  aria-hidden="true"
                />

                {/* Bottom Content: Title at Bottom-Left & Outlined Circle Arrow at Bottom-Right */}
                <div className="absolute inset-x-5 bottom-4 sm:bottom-5 z-10 flex items-end justify-between">
                  <h4 className="font-serif text-xl sm:text-[22px] lg:text-[24px] leading-[1.08] font-normal text-white text-left">
                    <span className="block">{item.titleLine1}</span>
                    <span className="block">{item.titleLine2}</span>
                  </h4>

                  <span
                    className="
                      flex h-9 w-9 shrink-0 items-center justify-center
                      rounded-full border border-white/70 text-white
                      transition-all duration-300
                      group-hover:border-white group-hover:bg-white group-hover:text-[#203C2A]
                    "
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-4 w-4 stroke-[1.5] transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Clean Expandable Experience Detail Panel on Card Click */}
        <AnimatePresence>
          {activeExperience && (
            <motion.div
              key={activeExperience.id}
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="relative rounded-[16px] border border-[#203C2A]/15 bg-white/75 backdrop-blur-sm p-5 sm:p-8 text-left">
                <button
                  type="button"
                  onClick={() => setActiveExperience(null)}
                  aria-label="Close experience detail"
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 flex h-8 w-8 items-center justify-center rounded-full border border-[#203C2A]/25 text-[#203C2A] hover:bg-[#203C2A] hover:text-white transition-colors"
                >
                  <X className="h-4 w-4 stroke-[1.5]" />
                </button>

                <div className="flex items-center space-x-2 pr-8 text-[11px] sm:text-xs tracking-[0.18em] uppercase text-[#52664D]">
                  <Compass className="h-3.5 w-3.5 shrink-0" />
                  <span>{activeExperience.season}</span>
                </div>

                <h4
                  style={{ color: '#203C2A' }}
                  className="mt-2 font-serif text-2xl sm:text-3xl font-normal"
                >
                  {activeExperience.fullTitle}
                </h4>

                <p
                  style={{ color: '#52664D' }}
                  className="mt-2.5 max-w-3xl font-serif text-base sm:text-lg leading-relaxed"
                >
                  {activeExperience.details}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ExperiencesSection;
