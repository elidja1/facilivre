'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface AuthIllustrationProps {
  src: string;
  alt: string;
  slides: {
    title: string;
    sub: string;
    badge: string;
    badgeColor: string;
  }[];
  accentColor?: string;
}

export default function AuthIllustration({
  src,
  alt,
  slides,
  accentColor = '#0052FF',
}: AuthIllustrationProps) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  // Auto-rotate text every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setFading(false);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const slide = slides[current];

  return (
    <div className="hidden lg:flex lg:w-[48%] xl:w-[52%] flex-col justify-center items-center bg-[#020818] p-8 xl:p-12 relative overflow-hidden">

      {/* ── Subtle animated background blobs ────────────────────────── */}
      <div
        className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full opacity-20 blur-3xl animate-pulse"
        style={{ background: accentColor }}
      />
      <div
        className="absolute bottom-[-60px] right-[-60px] w-60 h-60 rounded-full opacity-15 blur-3xl animate-pulse"
        style={{ background: '#10B981', animationDelay: '1.5s' }}
      />

      {/* ── IMAGE BOX ───────────────────────────────────────────────── */}
      <div className="relative w-full max-w-[360px] xl:max-w-[400px]">

        {/* Animated spinning ring behind the box */}
        <div
          className="absolute inset-[-6px] rounded-2xl opacity-60 animate-spin-slow"
          style={{
            background: `conic-gradient(from 0deg, ${accentColor}, #10B981, #F59E0B, ${accentColor})`,
            borderRadius: '20px',
          }}
        />

        {/* Blurred halo glow */}
        <div
          className="absolute inset-0 rounded-2xl blur-xl opacity-40"
          style={{ background: accentColor }}
        />

        {/* The actual image rectangle */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl aspect-[3/4]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-center"
            priority
          />
          {/* Bottom gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Rotating text overlay at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            {/* Dot progress indicators */}
            <div className="flex gap-1.5 mb-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setFading(true); setTimeout(() => { setCurrent(i); setFading(false); }, 300); }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/30'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Text with fade transition */}
            <div
              className="transition-all duration-400"
              style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(6px)' : 'translateY(0)' }}
            >
              {/* Badge */}
              <span
                className="inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-2"
                style={{ background: slide.badgeColor + '33', color: slide.badgeColor, border: `1px solid ${slide.badgeColor}55` }}
              >
                {slide.badge}
              </span>

              <h2 className="text-xl xl:text-2xl font-black text-white leading-tight font-display">
                {slide.title}
              </h2>
              <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                {slide.sub}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating stat pills below box ───────────────────────────── */}
      <div className="flex flex-wrap justify-center gap-2 mt-5 max-w-[360px]">
        {[
          { emoji: '🎓', label: '12 000+ étudiants' },
          { emoji: '📚', label: '300+ cours' },
          { emoji: '⚡', label: '100% Gratuit' },
        ].map((p) => (
          <div
            key={p.label}
            className="flex items-center gap-1.5 bg-white/8 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1.5 text-white text-xs font-semibold"
          >
            <span>{p.emoji}</span>
            <span>{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
