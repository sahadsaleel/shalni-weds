import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';

// fillMode = true → canvas covers parent element completely (used in mobile hero)
// fillMode = false (default) → traditional portrait card but with NO borders or lines
// scrollProgress → motion value from parent scroll pinning (0 to 1)
export default function FrameAnimationPlayer({ fillMode = false, scrollProgress }) {
  const canvasRef = useRef(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);
  const totalFrames = 250;
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);

  // Fallback to global scroll if scrollProgress is not passed
  const { scrollY } = useScroll();
  const globalScrollFrame = useTransform(scrollY, [0, 600], [0, 249]);
  
  // Map scroll progress from 0-1 (for pinned scrolling) or use fallback
  const scrollFrame = scrollProgress 
    ? useTransform(scrollProgress, [0, 1], [0, 249])
    : globalScrollFrame;

  const getFrameFileName = (index) => {
    const frameNum = String(index).padStart(3, '0');
    return `/animationimgs/ezgif-frame-${frameNum}.png`;
  };

  /* ─── Preloading ─── */
  useEffect(() => {
    let active = true;
    const images = [];

    const firstImg = new Image();
    firstImg.src = getFrameFileName(1);
    firstImg.onload = () => {
      if (!active) return;
      images[0] = firstImg;
      setLoadedCount((prev) => prev + 1);
    };

    for (let i = 2; i <= totalFrames; i++) {
      const img = new Image();
      img.src = getFrameFileName(i);
      img.onload = () => {
        if (!active) return;
        images[i - 1] = img;
        setLoadedCount((prev) => {
          const nextCount = prev + 1;
          if (nextCount >= 60) setIsReadyToPlay(true);
          return nextCount;
        });
      };
      img.onerror = () => {
        if (active) setLoadedCount((prev) => prev + 1);
      };
    }

    imagesRef.current = images;

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (loadedCount === totalFrames) setIsReadyToPlay(true);
  }, [loadedCount]);

  /* ─── drawFrame helper ─── */
  const drawFrame = (ctx, canvas, img) => {
    if (!img) return;
    const imgW = img.naturalWidth || img.width;
    const imgH = img.naturalHeight || img.height;
    if (!imgW || !imgH) return;

    const canvasAspect = canvas.width / canvas.height;
    const imgAspect = imgW / imgH;
    let dW = canvas.width;
    let dH = canvas.height;
    let oX = 0;
    let oY = 0;

    if (canvasAspect > imgAspect) {
      dH = canvas.width / imgAspect;
      oY = (canvas.height - dH) / 2;
    } else {
      dW = canvas.height * imgAspect;
      oX = (canvas.width - dW) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, oX, oY, dW, dH);
  };

  /* ─── Scroll-Bound Render ─── */
  useEffect(() => {
    if (!isReadyToPlay) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const unsubscribe = scrollFrame.onChange((latest) => {
      const targetFrame = Math.min(249, Math.max(0, Math.round(latest)));
      if (targetFrame === currentFrameRef.current) return;

      const img = imagesRef.current[targetFrame];
      if (img && img.complete) {
        currentFrameRef.current = targetFrame;
        drawFrame(ctx, canvas, img);
      }
    });

    // Draw initial frame
    const initialImg = imagesRef.current[currentFrameRef.current];
    if (initialImg && initialImg.complete) {
      drawFrame(ctx, canvas, initialImg);
    }

    return () => unsubscribe();
  }, [isReadyToPlay, scrollFrame]);

  /* ─── Resize handler ─── */
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const img = imagesRef.current[currentFrameRef.current];
      if (img && img.complete) {
        const ctx = canvas.getContext('2d');
        drawFrame(ctx, canvas, img);
      }
    };

    window.addEventListener('resize', handleResize);
    if (isReadyToPlay || loadedCount > 0) setTimeout(handleResize, 100);

    return () => window.removeEventListener('resize', handleResize);
  }, [isReadyToPlay, loadedCount]);

  const percentage = Math.round((loadedCount / totalFrames) * 100);

  /* ─── Fill-mode (mobile full-screen hero) ─── */
  if (fillMode) {
    return (
      <div className="absolute inset-0 w-full h-full bg-[#717b5a]">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ objectFit: 'cover' }}
        />
        {!isReadyToPlay && (
          <div className="absolute inset-0 bg-[#717b5a]/90 flex flex-col items-center justify-center z-10">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-ivory/20 rounded-full" />
              <div
                className="absolute inset-0 border-4 border-t-gold-accent border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"
                style={{ animationDuration: '1.5s' }}
              />
              <span className="font-serif text-base font-semibold text-ivory">{percentage}%</span>
            </div>
            <p className="mt-3 font-serif italic text-gold-accent text-xs tracking-widest uppercase">
              Loading Invitation
            </p>
          </div>
        )}
      </div>
    );
  }

  /* ─── Card-mode (desktop portrait frame with NO borders or decorations) ─── */
  return (
    <div className="relative w-full aspect-[4/5] max-w-[420px] mx-auto md:max-w-[460px] rounded-3xl overflow-hidden shadow-2xl bg-[#717b5a] backdrop-blur-sm">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
        style={{ contentVisibility: 'auto' }}
      />

      {/* Loading overlay */}
      {!isReadyToPlay && (
        <div className="absolute inset-0 bg-[#717b5a]/95 flex flex-col items-center justify-center p-6 z-10">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-white/20 rounded-full" />
            <div
              className="absolute inset-0 border-4 border-t-gold-accent border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"
              style={{ animationDuration: '1.5s' }}
            />
            <span className="font-serif text-lg font-semibold text-ivory">{percentage}%</span>
          </div>
          <p className="mt-4 font-serif text-gold-accent italic text-sm tracking-widest uppercase">
            Loading Invitation
          </p>
          <p className="mt-1 text-xs text-ivory/80 font-sans">Preparing traditional visuals</p>
        </div>
      )}
    </div>
  );
}
