import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

/**
 * EntranceHotspot
 *
 * Positions an invisible interactive hotspot precisely over the farmhouse's
 * main entrance door, anchored to the intrinsic coordinate space of the
 * `background-size: cover` hero photograph so it stays aligned across
 * ultrawide desktops, laptops, tablets, and mobile screens.
 */
const EntranceHotspot = ({
  onEnter,
  imageAspectRatio = 16 / 9,
  focalX = 0.5,
  focalY = 0.5,
  // Normalized coordinates (0..1) of the main entrance within the photograph
  doorX = 0.5,
  doorY = 0.55,
  doorWidthRatio = 0.11,
  doorHeightRatio = 0.14,
}) => {
  const wrapperRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageBox, setImageBox] = useState({
    left: 0,
    top: 0,
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
  });

  // Smooth spring-tracked cursor coordinates for the custom luxury entrance cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 380, damping: 32, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 380, damping: 32, mass: 0.4 });

  // Calculate exact rendered bounding box of the `background-size: cover` image
  const updateRenderedImageBox = useCallback(() => {
    const el = wrapperRef.current;
    const vpWidth = el ? el.clientWidth : window.innerWidth;
    const vpHeight = el ? el.clientHeight : window.innerHeight;

    if (!vpWidth || !vpHeight) return;

    const vpRatio = vpWidth / vpHeight;
    let renderedWidth;
    let renderedHeight;

    if (vpRatio > imageAspectRatio) {
      renderedWidth = vpWidth;
      renderedHeight = vpWidth / imageAspectRatio;
    } else {
      renderedHeight = vpHeight;
      renderedWidth = vpHeight * imageAspectRatio;
    }

    const left = (vpWidth - renderedWidth) * focalX;
    const top = (vpHeight - renderedHeight) * focalY;

    setImageBox({
      left,
      top,
      width: renderedWidth,
      height: renderedHeight,
    });
  }, [imageAspectRatio, focalX, focalY]);

  useEffect(() => {
    updateRenderedImageBox();

    const el = wrapperRef.current;
    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined' && el) {
      resizeObserver = new ResizeObserver(() => {
        updateRenderedImageBox();
      });
      resizeObserver.observe(el);
    }

    window.addEventListener('resize', updateRenderedImageBox);
    return () => {
      window.removeEventListener('resize', updateRenderedImageBox);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [updateRenderedImageBox]);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleMouseEnter = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Hotspot pixel dimensions and coordinates locked to the rendered image
  const hotspotWidth = Math.max(76, imageBox.width * doorWidthRatio);
  const hotspotHeight = Math.max(92, imageBox.height * doorHeightRatio);
  const hotspotLeft = imageBox.left + imageBox.width * doorX - hotspotWidth / 2;
  const hotspotTop = imageBox.top + imageBox.height * doorY - hotspotHeight / 2;

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
    >
      {/* Invisible clickable hotspot positioned over the farmhouse's main entrance door */}
      <button
        type="button"
        aria-label="Enter the Estate — Click the farmhouse main entrance to experience the interior transition"
        onClick={onEnter}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        style={{
          left: `${hotspotLeft}px`,
          top: `${hotspotTop}px`,
          width: `${hotspotWidth}px`,
          height: `${hotspotHeight}px`,
        }}
        className={`pointer-events-auto absolute bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-warm-ivory/60 ${
          isHovered ? 'cursor-none' : 'cursor-pointer'
        }`}
      />

      {/* Custom Cursor & Premium Tooltip ("ENTER THE ESTATE") shown only on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="entrance-cursor-follower"
            style={{
              left: springX,
              top: springY,
            }}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          >
            {/* Refined interactive cursor ring */}
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-warm-ivory/85 bg-forest-green/30 backdrop-blur-[3px] shadow-[0_0_30px_rgba(36,60,50,0.45)]">
              <motion.span
                animate={{ scale: [1, 1.35, 1], opacity: [0.85, 0.35, 0.85] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-1.5 rounded-full border border-warm-ivory/40"
              />
              <span className="h-1.5 w-1.5 rounded-full bg-warm-ivory" />
            </div>

            {/* Small Premium Tooltip: ENTER THE ESTATE */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.25, delay: 0.04 }}
              className="mt-3 whitespace-nowrap border border-warm-ivory/35 bg-charcoal/85 px-4 py-1.5 backdrop-blur-md shadow-xl"
            >
              <span className="block text-[10px] tracking-[0.28em] uppercase font-normal text-warm-ivory">
                ENTER THE ESTATE
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EntranceHotspot;

