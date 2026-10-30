import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const EXPLORE_COLUMN = [
  { label: 'The Estate', href: '#hero-estate' },
  { label: 'Experiences', href: '#experience' },
  { label: 'Accommodation', href: '#property-features' },
];

const DISCOVER_COLUMN = [
  { label: 'About Us', href: '#estate' },
  { label: 'Alpine Experiences', href: '#experiences-at-alpenruh' },
  { label: 'Reserve Your Stay', href: '#experiences-at-alpenruh' },
];

const CONTACT_COLUMN = [
  { label: 'Contact Us', href: '#estate' },
];

const Footer = () => {
  const handleSmoothScroll = (e, href) => {
    if (e) e.preventDefault();
    if (href === '#hero-estate') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer
      id="footer-reserve"
      aria-label="Site Footer"
      className="alpenruh-minimal-footer select-none"
    >
      {/* Extremely Subtle Topographic Alpine Contour Lines in Background */}
      <motion.svg
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        aria-hidden="true"
      >
        <path
          d="M95 -20 C 115 95, 255 60, 295 155 C 335 250, 240 480, 235 660"
          stroke="#687663"
          strokeOpacity="0.11"
          strokeWidth="1.2"
        />
        <path
          d="M540 -30 C 660 110, 860 280, 1020 460 C 920 550, 825 650, 740 760"
          stroke="#687663"
          strokeOpacity="0.10"
          strokeWidth="1.2"
        />
        <path
          d="M1010 -20 C 1030 140, 1340 160, 1385 330 C 1425 480, 1290 610, 1140 650"
          stroke="#687663"
          strokeOpacity="0.11"
          strokeWidth="1.2"
        />
      </motion.svg>

      {/* Soft Restrained Sage & Warm-Beige Bottom Atmospheric Gradient */}
      <div className="alpenruh-footer-bottom-glow" aria-hidden="true" />

      {/* ============================================================
          1. TOP THREE SMALL NAVIGATION COLUMNS
         ============================================================ */}
      <div className="relative z-10 w-full max-w-[980px]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-16 lg:gap-24">
          {/* COLUMN 01 — EXPLORE */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h2 className="alpenruh-footer-category">Explore</h2>
            <ul className="flex flex-col space-y-2.5">
              {EXPLORE_COLUMN.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="alpenruh-footer-nav-link"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 02 — DISCOVER */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.08, ease: 'easeOut' }}
          >
            <h2 className="alpenruh-footer-category">Discover</h2>
            <ul className="flex flex-col space-y-2.5">
              {DISCOVER_COLUMN.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="alpenruh-footer-nav-link"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 03 — CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.16, ease: 'easeOut' }}
          >
            <h2 className="alpenruh-footer-category">Contact</h2>
            <ul className="flex flex-col space-y-2.5">
              {CONTACT_COLUMN.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="alpenruh-footer-nav-link"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* ============================================================
          2. OVERSIZED GEOMETRIC MOUNTAIN SYMBOL + ALPENRUH WORDMARK
             & BOTTOM LEGAL BAR
         ============================================================ */}
      <div className="relative z-10 w-full mt-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="alpenruh-giant-signature"
        >
          {/* Oversized Geometric ALPENRUH Mountain Mark on the Left */}
          <svg
            viewBox="0 0 180 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[13vw] max-w-[175px] min-w-[44px] h-auto shrink-0 text-[#203C2A]"
            aria-hidden="true"
          >
            {/* Outer architectural mountain peak */}
            <path
              d="M14 132 L 74 26 L 106 82 L 132 42 L 168 132"
              stroke="currentColor"
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Inner alpine ridge accent */}
            <path
              d="M52 132 L 86 76 L 116 132"
              stroke="currentColor"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Enormous Edge-to-Edge ALPENRUH Wordmark */}
          <div className="alpenruh-giant-wordmark" aria-label="ALPENRUH">
            ALPENRUH
          </div>
        </motion.div>

        {/* Bottom Legal Bar */}
        <div className="alpenruh-footer-legal-bar">
          {/* Bottom-Left: Privacy Policy & Terms & Conditions */}
          <div className="flex items-center space-x-7">
            <a
              href="#privacy"
              onClick={(e) => handleSmoothScroll(e, '#hero-estate')}
              className="alpenruh-footer-bottom-link"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              onClick={(e) => handleSmoothScroll(e, '#hero-estate')}
              className="alpenruh-footer-bottom-link"
            >
              Terms &amp; Conditions
            </a>
          </div>

          {/* Bottom-Right: Copyright */}
          <p className="alpenruh-footer-copyright">© 2026 ALPENRUH</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
