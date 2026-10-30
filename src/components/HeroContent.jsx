import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroContent = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.25,
        }
      );
    }, titleRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="
        pointer-events-none
        absolute inset-x-0 bottom-1 sm:bottom-2 md:bottom-3
        z-20 flex w-full items-end justify-center px-2 sm:px-4 text-center overflow-hidden
      "
    >
      <h1
        ref={titleRef}
        style={{
          fontFamily:
            "'Motusera', 'Montserrat', 'Space Grotesk', 'Inter', system-ui, sans-serif",
          fontSize: 'clamp(2.85rem, 15.2vw, 17.5rem)',
          fontWeight: 800,
        }}
        className="
          w-full text-center text-white uppercase not-italic
          leading-[0.82] tracking-[0.04em]
          editorial-heading-shadow opacity-0 select-none
        "
      >
        ALPENRUH
      </h1>
    </div>
  );
};

export default HeroContent;
