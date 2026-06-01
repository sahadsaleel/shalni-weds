import React from 'react';
import { motion } from 'framer-motion';

export default function GroomBrideSection() {
  const couple = {
    bride: {
      name: 'Salini',
      role: 'The Bride',
      image: '/bride-groom/bride.jpeg',
      parents: 'D/o Ramachandran (Late) & Vidya Lakshmi (Late)',
      grandparents: 'Granddaughter of Srambikkal Gopalan Nair (Late) & Kallada Janaki Amma, and Cheriyala Melethil Purushothaman Nair (Late) & Kumari (Late)',

    },
    groom: {
      name: 'Vaisakh',
      role: 'The Groom',
      image: '/bride-groom/groom.jpeg',
      parents: 'S/o Mr. Aravindan & Mrs. Anitha',
      residence: 'Madathil Palappatta (Sreepadham) House, Mundakkottukurussi, Shornur',
    }
  };

  const instagramIcon = (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );

  const facebookIcon = (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );

  const mailIcon = (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );

  const ease = [0.22, 1, 0.36, 1];

  const PersonCard = ({ person, direction = 0, isGroom = false }) => (
    <motion.div
      initial={{ opacity: 0, x: direction, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease }}
      className="flex flex-col items-center text-center p-8 bg-white/60 backdrop-blur-sm border border-gold-accent/20 rounded-3xl relative overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500"
    >
      {/* Inner border accent */}
      <div className="absolute inset-3 border border-gold-accent/10 rounded-2xl pointer-events-none" />

      {/* Portrait frame with scale-in */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease, delay: 0.15 }}
        className="relative w-60 h-60 md:w-72 md:h-72 mb-8 rounded-2xl overflow-hidden gold-border p-1 bg-ivory shadow-lg"
      >
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover rounded-xl transition-transform duration-700 hover:scale-105"
        />
        {/* Jasmine corner detail */}
        <div className={`absolute top-2 ${isGroom ? 'right-2 -rotate-12' : 'left-2 rotate-12'} flex gap-0.5 pointer-events-none`}>
          <span className="jasmine-flower scale-75" />
          <span className="jasmine-flower scale-75" />
        </div>
      </motion.div>

      {/* Role */}
      <span className="font-sans text-xs tracking-[0.3em] text-gold-dark font-bold uppercase block mb-1">
        {person.role}
      </span>

      {/* Name */}
      <h3 className="font-serif text-4xl text-emerald-dark font-bold mb-4">
        {person.name}
      </h3>

      {/* Lineage */}
      <div className="space-y-2 mb-6 px-4">
        <p className="text-xs font-semibold text-emerald-dark/80 tracking-wide font-sans">
          {person.parents}
        </p>
        {person.grandparents && (
          <p className="text-[10px] text-olive leading-relaxed font-sans max-w-sm mx-auto">
            {person.grandparents}
          </p>
        )}
        {person.residence && (
          <p className="text-[10px] text-olive leading-relaxed font-sans max-w-sm mx-auto">
            {person.residence}
          </p>
        )}
      </div>
    </motion.div>
  );

  return (
    <section
      id="couple"
      className="relative py-28 px-6 bg-gradient-to-br from-pastel-green/20 via-ivory to-olive/5 overflow-hidden border-t border-gold-accent/15"
    >
      <div className="absolute inset-0 opacity-[0.02] kerala-kasavu-pattern pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
          className="text-center space-y-3 mb-20"
        >
          <span className="font-sans text-xs tracking-[0.25em] text-gold-dark font-bold uppercase block">
            The Hearts
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-emerald-dark font-semibold tracking-wide">
            Groom &amp; Bride
          </h2>
          <div className="w-16 h-[1.5px] bg-gold-accent/40 mx-auto mt-2" />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 items-stretch">
          <PersonCard person={couple.bride} direction={-40} isGroom={false} />
          <PersonCard person={couple.groom} direction={40} isGroom={true} />
        </div>
      </div>
    </section>
  );
}
