import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Countdown', href: '#countdown' },
    { name: 'Details', href: '#details' },
    { name: 'Couple', href: '#couple' },
    { name: 'Gallery', href: '#gallery' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-ivory/80 backdrop-blur-md border-b border-gold-accent/20 py-3 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo Brand */}
          <a href="#home" className="flex flex-col items-center">
            <span className="font-serif text-2xl font-semibold tracking-wider text-emerald-dark">
              V <span className="font-cursive text-gold-accent text-3xl font-normal">&</span> S
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-dark font-sans font-medium">
              Wedding Invitation
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-sans text-xs font-semibold uppercase tracking-wider text-emerald-dark/95 hover:text-gold-dark transition-colors duration-200 relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#details"
              className="bg-emerald-dark text-ivory hover:bg-olive transition-colors duration-300 font-sans text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full border border-gold-accent/30 shadow-md"
            >
              R S V P
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-emerald-dark hover:text-gold-dark focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ivory pt-24 px-8 pb-12 flex flex-col md:hidden justify-between border-b border-gold-accent/30 shadow-xl"
          >
            <div className="flex flex-col gap-6 items-center mt-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-serif text-2xl font-medium tracking-wide text-emerald-dark hover:text-gold-accent transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col items-center gap-6 mt-auto">
              <a
                href="#details"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-emerald-dark text-ivory hover:bg-olive font-sans text-xs font-semibold uppercase tracking-widest py-3.5 rounded-full border border-gold-accent/30 shadow-lg"
              >
                R S V P
              </a>
              <div className="flex items-center gap-1.5 justify-center">
                <span className="jasmine-flower"></span>
                <span className="jasmine-flower"></span>
                <span className="jasmine-flower"></span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
