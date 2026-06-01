import React from 'react';

export default function Footer() {
  const hostDetails = {
    parents: 'Mr. Sethumadhavan & Mrs. Radha Sethumadhavan',
    house: 'Kallada House',
    location: 'Kavanchery, Mangalam',
    phones: ['9048887484', '7736984351'],
    compliments: 'Best Compliments from: Dear & Near'
  };

  return (
    <footer className="relative bg-emerald-dark text-ivory py-16 px-6 border-t-2 border-gold-accent text-center overflow-hidden">
      {/* Kasavu background details */}
      <div className="absolute inset-0 opacity-[0.03] kerala-kasavu-pattern pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        
        {/* Jasmine Flower Garland details */}
        <div className="flex justify-center items-center gap-1">
          <span className="jasmine-flower opacity-80"></span>
          <span className="jasmine-flower opacity-80"></span>
          <span className="jasmine-flower opacity-80"></span>
        </div>

        {/* Initials */}
        <div className="flex flex-col items-center">
          <span className="font-serif text-3xl font-bold tracking-widest text-gold-accent">
            V <span className="font-cursive text-white text-4xl font-normal">&</span> S
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold-light/60 font-sans mt-1">
            June 27, 2026
          </span>
        </div>

        <div className="w-16 h-[1px] bg-gold-accent/40 mx-auto"></div>

        {/* Host Details / RSVP Contact */}
        <div className="space-y-4">
          <p className="font-sans text-xs uppercase tracking-widest text-gold-light/80 font-bold">
            Family & Host Contacts
          </p>
          <div className="space-y-1.5 font-serif text-base text-ivory/90">
            <p className="font-semibold">{hostDetails.parents}</p>
            <p>{hostDetails.house}, {hostDetails.location}</p>
            <p className="text-sm font-sans tracking-wide text-gold-light">
              Mob: {hostDetails.phones.join(' / ')}
            </p>
          </div>
        </div>

        {/* Best Compliments */}
        <div className="pt-4">
          <p className="font-serif italic text-gold-accent text-lg">
            {hostDetails.compliments}
          </p>
        </div>

        <div className="w-24 h-[1px] bg-gold-accent/30 mx-auto pt-2"></div>

        {/* Closing details */}
        <div className="text-[10px] font-sans tracking-widest text-ivory/50 uppercase">
          <p>&copy; {new Date().getFullYear()} Salini & Vaisakh Wedding. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}
