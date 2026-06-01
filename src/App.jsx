import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CountdownSection from './components/CountdownSection';
import WeddingDetailsSection from './components/WeddingDetailsSection';
import GroomBrideSection from './components/GroomBrideSection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between selection:bg-gold-light selection:text-emerald-dark">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Main Page Layout */}
      <main className="flex-grow">
        {/* Section 1: Hero Section */}
        <HeroSection />

        {/* Section 2: Auto Live Time Clock */}
        <CountdownSection />

        {/* Section 3: Wedding Details */}
        <WeddingDetailsSection />

        {/* Section 4: Groom & Bride */}
        <GroomBrideSection />

        {/* Section 5: Image Gallery */}
        <GallerySection />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;
