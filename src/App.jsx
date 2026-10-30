import React from 'react';
import HeroSection from './components/HeroSection';
import GuestExperiences from './components/GuestExperiences';
import AboutSection from './components/AboutSection';
import FifthSection from './components/FifthSection';
import PropertyFeatures from './components/PropertyFeatures';
import ExperiencesSection from './components/ExperiencesSection';
import Footer from './components/Footer';

function App() {
  return (
    <main className="w-full overflow-x-hidden bg-white">
      {/* Section 01: Full-Viewport Framed Hero Section */}
      <div className="h-[100dvh] min-h-[540px] w-full bg-white p-2 sm:p-3.5 md:p-4">
        <HeroSection />
      </div>

      {/* Section 02: Guest Experiences & Memories */}
      <GuestExperiences />

      {/* Section 03: About Us */}
      <AboutSection />

      {/* Single Image Background Section */}
      <FifthSection />

      {/* Interactive Property Features Section */}
      <PropertyFeatures />

      {/* Experiences at Alpenruh Section */}
      <ExperiencesSection />

      {/* Minimal Editorial Footer */}
      <Footer />
    </main>
  );
}

export default App;
