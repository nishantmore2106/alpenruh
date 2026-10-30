import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from './Navbar';
import HeroContent from './HeroContent';
import EntranceHotspot from './EntranceHotspot';
import CinematicVideoOverlay from './CinematicVideoOverlay';

const HERO_IMAGE_PATH = '/images/image.png';

const HeroSection = () => {
  const bgRef = useRef(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(1672 / 941);
  const [heroImageAvailable, setHeroImageAvailable] = useState(true);

  // Subtle initial fade-in animation for the background container
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
        }
      );
    }, bgRef);

    return () => ctx.revert();
  }, []);

  // Measure the supplied farmhouse photograph's natural aspect ratio
  // so EntranceHotspot stays precisely locked to the door across all screen sizes
  useEffect(() => {
    let isMounted = true;

    const loadHeroMetadata = () => {
      const img = new Image();
      img.onload = () => {
        if (!isMounted) return;
        if (img.naturalWidth && img.naturalHeight) {
          setImageAspectRatio(img.naturalWidth / img.naturalHeight);
        }
        setHeroImageAvailable(true);
      };
      img.onerror = () => {
        if (!isMounted) return;
        setHeroImageAvailable(false);
      };
      img.src = HERO_IMAGE_PATH;
    };

    loadHeroMetadata();
    window.addEventListener('focus', loadHeroMetadata);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', loadHeroMetadata);
    };
  }, []);

  const handleOpenVideo = () => {
    setIsVideoOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
  };

  return (
    <section
      id="hero-estate"
      aria-label="Alpenruh Hero"
      style={{
        border: '2px solid #FFFFFF',
        borderRadius: '22px',
        overflow: 'hidden',
      }}
      className="relative h-full w-full bg-white select-none shadow-[0_0_0_1px_rgba(255,255,255,1)]"
    >
      {/* 1. Floating Soft-Neumorphic Navigation Bar */}
      <Navbar />

      {/* 2. Original Full-Screen Farmhouse Photograph */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 h-full w-full overflow-hidden rounded-[20px] opacity-0"
      >
        <div
          style={{
            backgroundImage: `url('${HERO_IMAGE_PATH}')`,
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
            backgroundRepeat: 'no-repeat',
          }}
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Swiss farmhouse aerial photograph"
        />

        {/* Subtle localized bottom-left vignette solely behind the white editorial heading */}
        <div
          className="
            pointer-events-none absolute inset-x-0 bottom-0 h-1/3
            bg-gradient-to-t from-charcoal/40 via-charcoal/10 to-transparent
          "
          aria-hidden="true"
        />
      </div>

      {/* Interactive Farmhouse Main Entrance Hotspot */}
      <EntranceHotspot
        onEnter={handleOpenVideo}
        imageAspectRatio={imageAspectRatio}
        focalX={0.5}
        focalY={0.5}
        doorX={0.541}
        doorY={0.575}
        doorWidthRatio={0.11}
        doorHeightRatio={0.14}
      />

      {/* 3. Oversized White Editorial Heading Near the Bottom Edge */}
      <HeroContent />

      {/* Muted Full-Screen Cinematic Video Overlay */}
      <CinematicVideoOverlay
        isOpen={isVideoOpen}
        onClose={handleCloseVideo}
        heroImageAvailable={heroImageAvailable}
      />
    </section>
  );
};

export default HeroSection;
