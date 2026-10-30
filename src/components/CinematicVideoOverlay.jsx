import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

const PRIMARY_VIDEO_PATH = '/Farmhouse_camera_transition_video_979b0db5_1080p.mp4';
const FALLBACK_VIDEO_PATH = '/videos/farmhouse-entry.mp4';
const HERO_POSTER_PATH = '/images/image.png';

const CinematicVideoOverlay = ({ isOpen, onClose, heroImageAvailable }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const capturedFramesRef = useRef([]);
  const captureRafRef = useRef(null);
  const reverseRafRef = useRef(null);
  const lastCaptureTimeRef = useRef(0);

  const [videoStatus, setVideoStatus] = useState('ready');
  const [isReversing, setIsReversing] = useState(false);

  // Clean up captured ImageBitmaps
  const clearCapturedFrames = useCallback(() => {
    if (captureRafRef.current) {
      cancelAnimationFrame(captureRafRef.current);
      captureRafRef.current = null;
    }
    if (reverseRafRef.current) {
      cancelAnimationFrame(reverseRafRef.current);
      reverseRafRef.current = null;
    }
    capturedFramesRef.current.forEach((frame) => {
      if (frame && typeof frame.close === 'function') {
        try {
          frame.close();
        } catch {
          // ignore
        }
      }
    });
    capturedFramesRef.current = [];
    lastCaptureTimeRef.current = 0;
  }, []);

  // Capture frames at ~30fps while playing forward so reverse playback is 60fps butter-smooth
  const startFrameCapture = useCallback(() => {
    const captureLoop = (timestamp) => {
      const videoEl = videoRef.current;
      if (!videoEl || videoEl.paused || videoEl.ended) {
        return;
      }

      // Capture roughly every 32ms (~30fps)
      if (timestamp - lastCaptureTimeRef.current >= 32 && videoEl.readyState >= 2) {
        lastCaptureTimeRef.current = timestamp;
        if (typeof createImageBitmap === 'function') {
          createImageBitmap(videoEl)
            .then((bitmap) => {
              capturedFramesRef.current.push(bitmap);
            })
            .catch(() => {});
        }
      }

      captureRafRef.current = requestAnimationFrame(captureLoop);
    };

    captureRafRef.current = requestAnimationFrame(captureLoop);
  }, []);

  // Trigger reverse playback from the exact current frame back to frame 0 (the main hero image)
  const handleReverseAndClose = useCallback(() => {
    if (isReversing) return;

    const videoEl = videoRef.current;
    if (captureRafRef.current) {
      cancelAnimationFrame(captureRafRef.current);
      captureRafRef.current = null;
    }

    if (!videoEl || videoStatus === 'missing' || videoEl.currentTime <= 0.08) {
      clearCapturedFrames();
      setIsReversing(false);
      onClose();
      return;
    }

    videoEl.pause();
    setIsReversing(true);

    const frames = capturedFramesRef.current;
    const canvas = canvasRef.current;

    // Method 1: Smooth buffered frame-by-frame reverse playback via Canvas
    if (canvas && frames.length > 2) {
      const ctx = canvas.getContext('2d');
      canvas.width = videoEl.videoWidth || 1920;
      canvas.height = videoEl.videoHeight || 1080;

      let frameIndex = frames.length - 1;
      let lastStepTime = performance.now();
      // Play reverse at ~36fps for a responsive, cinematic rewind back to the exterior
      const frameInterval = 1000 / 36;

      // Draw initial paused frame immediately
      if (frames[frameIndex]) {
        ctx.drawImage(frames[frameIndex], 0, 0, canvas.width, canvas.height);
      }

      const renderReverseFrame = (now) => {
        const elapsed = now - lastStepTime;
        if (elapsed >= frameInterval) {
          const steps = Math.max(1, Math.floor(elapsed / frameInterval));
          frameIndex -= steps;
          lastStepTime = now;

          if (frameIndex <= 0) {
            if (frames[0]) {
              ctx.drawImage(frames[0], 0, 0, canvas.width, canvas.height);
            }
            clearCapturedFrames();
            setIsReversing(false);
            onClose();
            return;
          }

          const bitmap = frames[frameIndex];
          if (bitmap) {
            ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
          }
        }
        reverseRafRef.current = requestAnimationFrame(renderReverseFrame);
      };

      reverseRafRef.current = requestAnimationFrame(renderReverseFrame);
      return;
    }

    // Method 2: Fallback direct currentTime reverse scrubbing if no frames were buffered
    const startTime = videoEl.currentTime;
    const reverseDurationMs = Math.min(2200, Math.max(600, startTime * 650));
    const reverseStartWall = performance.now();

    const scrubBackward = (now) => {
      const progress = Math.min(1, (now - reverseStartWall) / reverseDurationMs);
      const nextTime = Math.max(0, startTime * (1 - progress));
      videoEl.currentTime = nextTime;

      if (progress < 1 && nextTime > 0.02) {
        reverseRafRef.current = requestAnimationFrame(scrubBackward);
      } else {
        videoEl.currentTime = 0;
        clearCapturedFrames();
        setIsReversing(false);
        onClose();
      }
    };

    reverseRafRef.current = requestAnimationFrame(scrubBackward);
  }, [isReversing, videoStatus, clearCapturedFrames, onClose]);

  // Close (with reverse transition) on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleReverseAndClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleReverseAndClose]);

  // Start muted forward playback when overlay opens
  useEffect(() => {
    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.defaultMuted = true;
      videoEl.muted = true;
    }

    if (!isOpen) {
      clearCapturedFrames();
      setIsReversing(false);
      if (videoEl) {
        videoEl.pause();
        videoEl.currentTime = 0;
      }
      return;
    }

    clearCapturedFrames();
    setIsReversing(false);
    setVideoStatus('ready');

    if (videoEl) {
      videoEl.defaultMuted = true;
      videoEl.muted = true;
      videoEl.currentTime = 0;

      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            startFrameCapture();
          })
          .catch(() => {
            setVideoStatus('missing');
          });
      }
    }

    return () => {
      clearCapturedFrames();
    };
  }, [isOpen, clearCapturedFrames, startFrameCapture]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cinematic-video-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Alpenruh Interior Transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute inset-0 z-40 flex items-center justify-center rounded-[20px] overflow-hidden bg-charcoal"
        >
          {/* Minimal Close (X) Control — triggers reverse playback back to the main hero image */}
          {!isReversing && (
            <div className="pointer-events-none absolute top-5 right-5 sm:top-7 sm:right-8 z-30">
              <button
                type="button"
                onClick={handleReverseAndClose}
                aria-label="Close video and reverse back to exterior"
                className="
                  pointer-events-auto
                  neu-glass-shell
                  group inline-flex h-11 w-11 items-center justify-center
                  rounded-full text-white
                  transition-all duration-300 hover:scale-105
                "
              >
                <X className="h-4 w-4 stroke-[1.75] transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>
          )}

          {/* Muted Full-Frame Transition Video + Reverse Playback Canvas inside the Rounded White Border */}
          {videoStatus === 'ready' && (
            <div className="relative h-full w-full overflow-hidden rounded-[20px]">
              <video
                ref={videoRef}
                poster={HERO_POSTER_PATH}
                preload="auto"
                autoPlay
                muted
                defaultMuted
                playsInline
                onPlay={startFrameCapture}
                onVolumeChange={(e) => {
                  if (!e.currentTarget.muted) {
                    e.currentTarget.muted = true;
                  }
                }}
                onError={() => setVideoStatus('missing')}
                className={`h-full w-full object-cover ${
                  isReversing ? ' invisible' : 'visible'
                }`}
              >
                <source src={PRIMARY_VIDEO_PATH} type="video/mp4" />
                <source src={FALLBACK_VIDEO_PATH} type="video/mp4" />
              </video>

              {/* Reverse Playback Canvas (active while rewinding back to the main hero image) */}
              <canvas
                ref={canvasRef}
                className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${
                  isReversing ? 'block z-20' : 'hidden'
                }`}
              />
            </div>
          )}

          {/* Graceful Fallback if video file is missing */}
          {videoStatus === 'missing' && (
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[20px] px-6">
              {heroImageAvailable && (
                <div
                  style={{
                    backgroundImage: `url('${HERO_POSTER_PATH}')`,
                  }}
                  className="absolute inset-0 bg-cover bg-center opacity-30 blur-[2px]"
                  aria-hidden="true"
                />
              )}
              <div
                className="absolute inset-0 bg-charcoal/85"
                aria-hidden="true"
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicVideoOverlay;
