import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

const ScrollIndicator = () => {
  const indicatorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        indicatorRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          delay: 1.4,
        }
      );
    }, indicatorRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={indicatorRef}
      className="pointer-events-none absolute bottom-6 sm:bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center opacity-0"
      aria-hidden="true"
    >
      <span className="mb-2.5 text-[9px] tracking-[0.34em] uppercase font-light text-warm-ivory/80 text-shadow-crisp">
        Scroll
      </span>
      <div className="relative h-10 w-[1px] overflow-hidden bg-warm-ivory/25">
        <motion.span
          animate={{ y: ['-100%', '100%'] }}
          transition={{
            duration: 2.1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-x-0 top-0 h-1/2 w-full bg-warm-ivory/90"
        />
      </div>
    </div>
  );
};

export default ScrollIndicator;

