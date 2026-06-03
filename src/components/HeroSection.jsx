import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FrameAnimationPlayer from './FrameAnimationPlayer';
import { Calendar } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef(null);

  // Track scroll specifically inside the parent 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax translation for background decorations using scrollYProgress (0 to 1)
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Mobile Text Entrance:
  // Text remains hidden (opacity 0) at the start to "show animation first"
  // Fades up between 0.15 and 0.45, and stays visible until fading out past 0.85
  const mobileTextOpacity = useTransform(scrollYProgress, [0.15, 0.45, 0.85, 0.95], [0, 1, 1, 0]);
  const mobileTextY = useTransform(scrollYProgress, [0.15, 0.45], [40, 0]);

  // Function to download .ics (iCalendar) file
  const handleSaveTheDate = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Salini Vaisakh Wedding//Invitation//EN',
      'BEGIN:VEVENT',
      'UID:wedding-salini-vaisakh-2026',
      'DTSTAMP:20260524T000000Z',
      'DTSTART:20260627T050000Z', // 10:30 AM IST on June 27, 2026 (UTC+5:30 is 5:00 AM UTC)
      'DTEND:20260627T083000Z', // 2:00 PM IST (UTC+5:30 is 8:30 AM UTC)
      'SUMMARY:Salini & Vaisakh Wedding Ceremony',
      'DESCRIPTION:You are cordially invited to celebrate the marriage of Salini and Vaisakh. Muhurtham: 10:30 AM - 11:00 AM. Lunch to follow.',
      'LOCATION:Kairali Auditorium, Poozhikunnu, Tirur, Kerala, India',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Salini_Vaisakh_Wedding_SaveTheDate.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ── Staggered Entrance Animations ── */
  const containerAnim = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } }
  };

  return (
    /* Parent scroll track container to drive the animation scrubbing */
    <div ref={containerRef} className="relative h-[300vh] w-full bg-[#717b5a]">

      {/* Sticky viewport frame locks into place while scrolling */}
      <section
        id="home"
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#717b5a]"
      >

        {/* ══════════════════════════════════════════
            MOBILE VIEW (lg:hidden)
            Full-screen border-free backdrop animation
           ══════════════════════════════════════════ */}
        <div className="lg:hidden absolute inset-0 w-full h-full z-0 flex flex-col justify-end">

          {/* Full Screen backdrop animation */}
          <FrameAnimationPlayer fillMode={true} scrollProgress={scrollYProgress} />

          {/* Soft dark vignette gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-[#717b5a]/25 pointer-events-none z-10" />

          {/* Floating animated details container: "animation shows first, then text" */}
          <motion.div
            style={{ opacity: mobileTextOpacity, y: mobileTextY }}
            className="absolute inset-x-0 bottom-0 pb-20 px-6 flex flex-col items-center text-center space-y-5 z-20"
          >
            {/* Couple Names */}
            <div>
              <h1 className="text-5xl font-serif font-bold text-ivory leading-none tracking-tight">
                Salini
                <span className="font-cursive text-gold-accent text-4xl font-normal mx-3 inline-block">
                  &
                </span>
                Vaisakh
              </h1>
            </div>

            <div className="w-16 h-[1px] bg-gold-accent/40 mx-auto"></div>

            {/* Wedding Date and Details */}
            <div className="space-y-1">
              <h3 className="font-serif text-lg text-ivory font-medium tracking-wide">
                Saturday, June 27, 2026
              </h3>
              <p className="font-sans text-[10px] text-gold-accent tracking-widest uppercase font-bold">
                Muhurtham: 10:30 AM — 11:00 AM IST
              </p>
              <p className="font-serif italic text-ivory/75 text-xs">
                Kairali Auditorium, Poozhikunnu, Tirur, Kerala
              </p>
            </div>
          </motion.div>
        </div>


        {/* ══════════════════════════════════════════
            DESKTOP VIEW (hidden lg:flex)
            Side-by-side luxurious layout
           ══════════════════════════════════════════ */}
        <div className="hidden lg:flex max-w-7xl mx-auto px-10 grid grid-cols-12 gap-8 items-center relative z-10 w-full">

          {/* Left Side: Typography & Invites (Col Span 7) */}
          <motion.div
            variants={containerAnim}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="col-span-7 flex flex-col items-start text-left space-y-6"
          >

            {/* Couple Names */}
            <motion.div variants={fadeUp} className="space-y-1 py-1">
              <h1 className="text-7xl xl:text-8xl font-serif font-bold text-ivory leading-none tracking-tight">
                Salini
                <span className="font-cursive text-gold-accent text-6xl xl:text-7xl font-normal block my-2 lg:inline lg:mx-4">
                  &
                </span>
                Vaisakh
              </h1>
            </motion.div>

            <motion.div variants={fadeUp} className="w-24 h-[1px] bg-gold-accent/40 mx-auto lg:mx-0"></motion.div>

            {/* Wedding Date and Details */}
            <motion.div variants={fadeUp} className="space-y-2">
              <h3 className="font-serif text-2xl md:text-3xl text-ivory font-medium tracking-wide">
                Saturday, June 27, 2026
              </h3>
              <p className="font-sans text-xs md:text-sm text-gold-accent tracking-widest uppercase font-bold">
                Muhurtham: 10:30 AM — 11:00 AM IST
              </p>
              <p className="font-serif italic text-ivory/80 text-sm md:text-base">
                Kairali Auditorium, Poozhikunnu, Valanchery, Kerala
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side: Animated Image Canvas (Col Span 5) */}
          <motion.div
            style={{ y: yImage }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            className="col-span-5 w-full flex justify-center z-10"
          >
          </motion.div>
        </div>

        {/* Soft warm golden-glow highlights */}
        <motion.div
          style={{ y: yBg }}
          className="absolute top-[5%] left-[-15%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-gold-light/10 rounded-full blur-[90px] md:blur-[130px] pointer-events-none z-0"
        />
        <motion.div
          style={{ y: yBg }}
          className="absolute bottom-[10%] right-[-15%] w-[350px] md:w-[650px] h-[350px] md:h-[650px] bg-gold-accent/5 rounded-full blur-[90px] md:blur-[150px] pointer-events-none z-0"
        />

        {/* Floating jasmine blossom accents on screen edges (desktop only) */}
        <div className="absolute top-[20%] right-[5%] floating-element opacity-70 pointer-events-none hidden md:block">
          <span className="jasmine-flower"></span>
        </div>
        <div className="absolute bottom-[25%] left-[6%] floating-element opacity-75 pointer-events-none hidden md:block" style={{ animationDelay: '2.5s' }}>
          <span className="jasmine-flower"></span>
        </div>
      </section>
    </div>
  );
}
