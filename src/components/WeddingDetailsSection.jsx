import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
};

export default function WeddingDetailsSection() {
  const ceremonies = [
    {
      title: 'Wedding Ceremony',
      malayalamTitle: 'മംഗല്യം',
      date: 'Saturday, June 27, 2026',
      time: '10:30 AM — 11:00 AM IST',
      venue: 'Kairali Auditorium, Poozhikunnu',
      mapUrl: 'https://maps.google.com/?q=Kairali+Auditorium+Poozhikunnu+Kerala',
      icon: (
        <svg viewBox="0 0 100 120" className="w-16 h-16 text-gold-accent" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 25 C30 35 70 35 90 25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="35" cy="30" r="3.5" fill="#FAF9F5" stroke="currentColor" strokeWidth="1" />
          <circle cx="65" cy="30" r="3.5" fill="#FAF9F5" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="32" r="5" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <path d="M50 37 C42 45 32 55 35 72 C37 84 46 95 50 97 C54 95 63 84 65 72 C68 55 58 45 50 37 Z" fill="currentColor" />
          <path d="M50 48 V85" stroke="#996515" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <path d="M43 62 C43 62 46 68 50 68 C54 68 57 62 57 62" stroke="#996515" strokeWidth="1" opacity="0.4" />
          <circle cx="50" cy="104" r="3" fill="currentColor" />
          <circle cx="37" cy="85" r="2" fill="currentColor" />
          <circle cx="63" cy="85" r="2" fill="currentColor" />
        </svg>
      )
    },
    {
      title: 'Wedding Banquet',
      malayalamTitle: 'കല്യാണ സദ്യ',
      date: 'Saturday, June 27, 2026',
      time: '11:30 AM Onwards IST',
      venue: 'Kairali Auditorium, Poozhikunnu',
      mapUrl: 'https://maps.app.goo.gl/D7VCnXLaPFmhXTXy9',
      icon: (
        <svg viewBox="0 0 100 120" className="w-16 h-16 text-gold-accent" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 15 C50 15 49 65 45 105" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M48 18 C35 25 22 38 25 58 L35 55 C30 63 23 72 26 85 L37 83 C31 92 34 100 45 102 L46 18 Z" fill="currentColor" opacity="0.85" />
          <path d="M52 18 C65 25 78 38 75 58 L65 55 C70 63 77 72 74 85 L63 83 C69 92 66 100 55 102 L54 18 Z" fill="currentColor" opacity="0.85" />
          <path d="M35 38 L45 42" stroke="#faf8f5" strokeWidth="1" opacity="0.3" />
          <path d="M32 54 L44 57" stroke="#faf8f5" strokeWidth="1" opacity="0.3" />
          <path d="M32 72 L44 73" stroke="#faf8f5" strokeWidth="1" opacity="0.3" />
          <path d="M36 89 L43 89" stroke="#faf8f5" strokeWidth="1" opacity="0.3" />
          <path d="M65 38 L55 42" stroke="#faf8f5" strokeWidth="1" opacity="0.3" />
          <path d="M68 54 L56 57" stroke="#faf8f5" strokeWidth="1" opacity="0.3" />
          <path d="M68 72 L56 73" stroke="#faf8f5" strokeWidth="1" opacity="0.3" />
          <path d="M64 89 L57 89" stroke="#faf8f5" strokeWidth="1" opacity="0.3" />
        </svg>
      )
    }
  ];

  return (
    <section
      id="details"
      className="relative py-28 px-6 bg-ivory text-center overflow-hidden"
    >
      {/* Background visual effects */}
      <div className="absolute top-[15%] right-[-10%] w-[300px] h-[300px] bg-pista-light/25 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] bg-sage/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Jasmine accent */}
        <div className="flex justify-center items-center gap-1.5 mb-5">
          <span className="jasmine-flower" />
          <span className="jasmine-flower" />
          <span className="jasmine-flower" />
        </div>

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3 mb-16"
        >
          <span className="font-sans text-xs tracking-[0.3em] text-gold-dark font-bold uppercase block">
            The Auspicious Days
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-emerald-dark font-semibold tracking-wide">
            Wedding Ceremonies
          </h2>
          <div className="w-16 h-[1.5px] bg-gold-accent/40 mx-auto mt-2" />
        </motion.div>

        {/* Cards — each animates independently on scroll */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          {ceremonies.map((ceremony, idx) => (
            <motion.div
              key={ceremony.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.18 }}
              className="group flex flex-col justify-between bg-white border border-gold-accent/25 hover:border-gold-accent rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden text-center"
            >
              {/* Gold corners on hover */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-gold-accent/0 group-hover:border-gold-accent/40 transition-colors duration-300" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-gold-accent/0 group-hover:border-gold-accent/40 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-gold-accent/0 group-hover:border-gold-accent/40 transition-colors duration-300" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-gold-accent/0 group-hover:border-gold-accent/40 transition-colors duration-300" />

              {/* Icon + Title */}
              <div className="flex flex-col items-center space-y-4 mb-8">
                <div className="w-24 h-24 rounded-full bg-pastel-green flex items-center justify-center border border-gold-accent/15 group-hover:bg-gold-light/20 transition-colors duration-300">
                  {ceremony.icon}
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-emerald-dark font-bold group-hover:text-gold-dark transition-colors duration-300">
                    {ceremony.title}
                  </h3>
                  <span className="font-serif italic text-sm text-gold-dark/80 tracking-widest font-semibold block mt-0.5">
                    {ceremony.malayalamTitle}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 text-emerald-dark/95">
                <div className="flex items-center gap-3 px-4 py-2.5 bg-pastel-green/40 rounded-xl border border-gold-accent/5">
                  <Calendar size={16} className="text-gold-accent shrink-0" />
                  <span className="font-sans text-xs font-semibold text-left leading-normal">{ceremony.date}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2.5 bg-pastel-green/40 rounded-xl border border-gold-accent/5">
                  <Clock size={16} className="text-gold-accent shrink-0" />
                  <span className="font-sans text-xs font-semibold text-left leading-normal">{ceremony.time}</span>
                </div>
                <div className="flex items-start gap-3 px-4 py-2.5 bg-pastel-green/40 rounded-xl border border-gold-accent/5 min-h-[72px]">
                  <MapPin size={16} className="text-gold-accent shrink-0 mt-0.5" />
                  <span className="font-sans text-xs font-semibold text-left leading-relaxed">{ceremony.venue}</span>
                </div>
              </div>

              {/* Maps link */}
              <div className="mt-8 pt-4">
                <a
                  href={ceremony.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-xs font-bold tracking-widest text-gold-dark hover:text-emerald-dark transition-colors duration-200 uppercase"
                >
                  Locate Venue
                  <span className="text-base leading-none">&rarr;</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
