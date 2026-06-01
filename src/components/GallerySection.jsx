import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      src: '/galleryimgs/img1.jpeg',
      title: 'A Walk of Love',
      description: 'Capturing the serene steps towards a shared lifetime, hand in hand.',
      aspect: 'aspect-[3/4]'
    },
    {
      src: '/galleryimgs/img2.jpeg',
      title: 'Enchanted Gazes',
      description: 'Moments filled with quiet laughter, promises, and the magic of togetherness.',
      aspect: 'aspect-[4/3]'
    },
    {
      src: '/galleryimgs/img3.jpeg',
      title: 'Golden Details',
      description: 'Admiring the beautiful gold jewelry and traditional Kerala silk (Kasavu).',
      aspect: 'aspect-square'
    },
    {
      src: '/galleryimgs/img4.jpeg',
      title: 'Traditional Splendor',
      description: 'Embracing heritage and love under the blessings of tradition and family.',
      aspect: 'aspect-[3/4]'
    },
    {
      src: '/galleryimgs/img5.jpeg',
      title: 'Joyful Beginnings',
      description: 'Their smiles mirroring the brightness of a beautiful new chapter together.',
      aspect: 'aspect-[4/3]'
    },
    {
      src: '/galleryimgs/img6.jpeg',
      title: 'Vows and Jasmine',
      description: 'Surrounded by the sweet fragrance of jasmine, sealing a bond forever.',
      aspect: 'aspect-square'
    }
  ];

  return (
    <section
      id="gallery"
      className="relative py-28 px-6 bg-ivory text-center overflow-hidden border-t border-gold-accent/10"
    >
      {/* Background blurs */}
      <div className="absolute top-[10%] left-[-5%] w-80 h-80 bg-pista-light/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-80 h-80 bg-sage/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
          className="space-y-3 mb-16"
        >
          <span className="font-sans text-xs tracking-[0.3em] text-gold-dark font-bold uppercase block">
            Visual Story
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-emerald-dark font-semibold tracking-wide">
            Wedding Gallery
          </h2>
          <div className="w-16 h-[1.5px] bg-gold-accent/40 mx-auto mt-2" />
        </motion.div>

        {/* Masonry columns – each image animates independently */}
        <div className="columns-1 sm:columns-2 gap-6 space-y-6">
          {images.map((img, idx) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease, delay: (idx % 2) * 0.12 }}
              onClick={() => setSelectedImage(img)}
              className={`break-inside-avoid relative w-full ${img.aspect} rounded-2xl overflow-hidden gold-border p-1 bg-white shadow-sm hover:shadow-xl hover:border-gold-accent/80 transition-all duration-300 group cursor-pointer`}
            >
              <div className="relative w-full h-full overflow-hidden rounded-xl bg-pastel-green">
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-emerald-dark/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-ivory border border-white/10 transition-colors cursor-pointer"
              aria-label="Close preview"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl gold-border p-1 bg-ivory shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[85vh] max-w-full object-contain rounded-xl block"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
