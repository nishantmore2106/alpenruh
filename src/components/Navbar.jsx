import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'The Estate', href: '#hero-estate' },
  { label: 'Experiences', href: '#experience' },
  { label: 'Accommodation', href: '#property-features' },
  { label: 'About Us', href: '#estate' },
];

const Navbar = () => {
  const [activeHref, setActiveHref] = useState('#hero-estate');
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    if (e) e.preventDefault();
    setActiveHref(href);
    setMenuOpen(false);

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
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="alpenruh-navbar-wrapper"
    >
      <nav
        aria-label="Primary Navigation"
        className={`alpenruh-navbar-bar ${isScrolled ? 'is-scrolled' : ''}`}
      >
        {/* LEFT: Brand Name */}
        <a
          href="#hero-estate"
          onClick={(e) => scrollToSection(e, '#hero-estate')}
          className="alpenruh-navbar-brand"
          aria-label="Alpenruh Home"
        >
          Alpenruh
        </a>

        {/* CENTER: Navigation Links */}
        <ul className="hidden md:flex items-center space-x-8 lg:space-x-11">
          {NAV_LINKS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`alpenruh-nav-link ${
                  activeHref === item.href ? 'is-active' : ''
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* RIGHT: Tactile 3D Forest-Green Pill CTA Button with Circular Arrow Badge */}
        <div className="flex items-center space-x-2">
          <a
            href="#footer-reserve"
            onClick={(e) => scrollToSection(e, '#footer-reserve')}
            className="hidden sm:inline-flex alpenruh-green-pill-cta"
          >
            <span>Reserve a Stay</span>
            <span className="alpenruh-green-pill-icon" aria-hidden="true">
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.2]" />
            </span>
          </a>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden alpenruh-mobile-toggle"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="h-4 w-4 stroke-[1.8]" />
            ) : (
              <Menu className="h-4 w-4 stroke-[1.8]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="navbar-mobile-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="alpenruh-menu-overlay md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="border-b border-[#203C2A]/10 pb-3 font-sans text-base font-medium text-[#16231a] hover:text-[#203C2A]"
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-2">
                <a
                  href="#footer-reserve"
                  onClick={(e) => scrollToSection(e, '#footer-reserve')}
                  className="alpenruh-green-pill-cta w-full justify-between"
                >
                  <span>Reserve a Stay</span>
                  <span className="alpenruh-green-pill-icon" aria-hidden="true">
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.2]" />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
