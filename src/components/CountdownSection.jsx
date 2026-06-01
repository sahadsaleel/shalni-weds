import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CountdownSection() {
  const targetDate = new Date('2026-06-27T10:30:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isCompleted: false });
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section
      id="countdown"
      className="relative py-24 px-6 w-full text-center overflow-hidden bg-gradient-to-br from-olive/10 via-pastel-green/40 to-pista/20 border-y border-gold-accent/15"
    >
      {/* Background floral overlays */}
      <div className="absolute inset-0 opacity-[0.03] kerala-kasavu-pattern pointer-events-none"></div>

      {/* Subtle organic gradient shapes */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-pista/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-sage/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Jasmine Flower Accent */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <span className="w-8 h-[1px] bg-gold-accent/40"></span>
          <div className="flex gap-1">
            <span className="jasmine-flower"></span>
            <span className="jasmine-flower"></span>
            <span className="jasmine-flower"></span>
          </div>
          <span className="w-8 h-[1px] bg-gold-accent/40"></span>
        </div>

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="space-y-3 mb-12"
        >
          <span className="font-sans text-xs tracking-[0.25em] text-gold-dark font-bold uppercase block">
            The Countdown
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-emerald-dark font-medium tracking-wide">
            Our Forever Begins In
          </h2>
          <p className="text-xs text-olive/80 font-sans tracking-wide max-w-md mx-auto">
            Join us as we step into this beautiful journey of companionship, values, and traditions.
          </p>
        </motion.div>

        {/* Countdown Grid Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="glass-card p-6 md:p-12 rounded-3xl max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 border border-gold-accent/35 relative overflow-hidden bg-pista-light/60 backdrop-blur-md"
        >
          {/* Inner Golden border detail */}
          <div className="absolute inset-2 border border-gold-accent/15 rounded-2xl pointer-events-none"></div>

          {timeLeft.isCompleted ? (
            <div className="col-span-4 py-6">
              <p className="font-serif text-3xl font-semibold text-gold-dark tracking-wide">
                The Celebration Has Begun!
              </p>
            </div>
          ) : (
            timeUnits.map((unit, idx) => (
              <div
                key={unit.label}
                className="relative py-4 px-2 flex flex-col items-center justify-center bg-white/40 rounded-2xl border border-gold-accent/10 shadow-sm"
              >
                {/* Number with elegant serif sizing */}
                <span className="text-4xl md:text-5xl font-serif font-bold text-emerald-dark tracking-tight leading-none mb-1">
                  {String(unit.value).padStart(2, '0')}
                </span>
                
                {/* Label */}
                <span className="text-[10px] md:text-xs font-sans font-bold uppercase tracking-widest text-olive-dark">
                  {unit.label}
                </span>

                {/* Vertical Divider for columns (Desktop only) */}
                {idx < 3 && (
                  <div className="hidden md:block absolute right-[-12px] top-1/4 bottom-1/4 w-[1px] bg-gold-accent/20"></div>
                )}
              </div>
            ))
          )}
        </motion.div>

        {/* Wedding Muhurtham Reminder */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 font-serif italic text-gold-dark text-base tracking-wide"
        >
          Auspicious Muhurtham: Between 10:30 AM & 11:00 AM (Midhunam 13)
        </motion.p>
      </div>
    </section>
  );
}
