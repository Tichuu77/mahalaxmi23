'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ── Image Showcase ────────────────────────────────────────── */
const showcaseImages = [
  { src: '/gallery_2.jpg', label: 'Central Amenity Park' },
  { src: '/gallery_5.jpg', label: "Children's Play Area" },
  { src: '/gallery_1.jpg', label: 'Garden Seating Lounge' },
  { src: '/gallery_3.jpg', label: 'Landscape & Green Spaces' },
  { src: '/gallery_4.jpg', label: 'Master Layout Plan' },
];

/* ── Amenity list (matches screenshot exactly) ─────────────── */
const amenities = [
  {
    title: 'Internal Cement Concrete Road',
    desc: 'A paved road within the premises connecting all major parts.',
    svg: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#30534A"/><path d="M12 44h40M16 36h32M32 20v24" stroke="#C9862b" stroke-width="2.5" stroke-linecap="round"/><path d="M20 44v-8M44 44v-8" stroke="#C9862b" stroke-width="2.5" stroke-linecap="round"/><rect x="18" y="18" width="28" height="14" rx="3" stroke="#C9862b" stroke-width="2.5" fill="none"/></svg>`,
  },
  {
    title: 'Sewage Line',
    desc: 'Underground waste disposal system in layout.',
    svg: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#30534A"/><path d="M16 32 Q24 20 32 32 Q40 44 48 32" stroke="#C9862b" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="16" cy="32" r="3" fill="#C9862b"/><circle cx="48" cy="32" r="3" fill="#C9862b"/><path d="M32 24v-6M32 46v-6" stroke="#C9862b" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    title: 'Electric Network With Transformer',
    desc: 'Electricity distribution infrastructure for plots and amenities.',
    svg: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#30534A"/><path d="M32 14l-8 16h16L32 50" stroke="#C9862b" stroke-width="2.5" stroke-linejoin="round" fill="none"/><path d="M20 30h24" stroke="#C9862b" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    title: 'Kids Park',
    desc: 'A playground for children in layout.',
    svg: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#30534A"/><path d="M20 46v-20M20 26l10-10 10 10M44 46v-20" stroke="#C9862b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 46h10M36 46h10" stroke="#C9862b" stroke-width="2.5" stroke-linecap="round"/><circle cx="32" cy="34" r="4" stroke="#C9862b" stroke-width="2.5" fill="none"/></svg>`,
  },
  {
    title: 'Garden',
    desc: 'Landscaped green space with plantation for better experience.',
    svg: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#30534A"/><path d="M32 46V28" stroke="#C9862b" stroke-width="2.5" stroke-linecap="round"/><path d="M32 28 Q22 20 18 10 Q28 14 32 28" stroke="#C9862b" stroke-width="2" fill="none"/><path d="M32 34 Q42 26 46 16 Q36 20 32 34" stroke="#C9862b" stroke-width="2" fill="none"/><path d="M22 46h20" stroke="#C9862b" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  },
  {
    title: 'Storm Water Drainage',
    desc: 'Efficient stormwater management system across the entire layout.',
    svg: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#30534A"/><path d="M24 16 Q26 22 24 28 Q22 34 26 40" stroke="#C9862b" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M32 12 Q34 20 32 28 Q30 36 34 44" stroke="#C9862b" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M40 16 Q42 22 40 28 Q38 34 42 40" stroke="#C9862b" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`,
  },
  {
    title: 'Open Space Public Utility',
    desc: 'An open-use area available to all the residents in the layout.',
    svg: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#30534A"/><rect x="14" y="22" width="36" height="24" rx="3" stroke="#C9862b" stroke-width="2.5" fill="none"/><path d="M14 30h36" stroke="#C9862b" stroke-width="2" stroke-linecap="round"/><circle cx="22" cy="26" r="2" fill="#C9862b"/><circle cx="30" cy="26" r="2" fill="#C9862b"/></svg>`,
  },
  {
    title: 'Sewage Treatment Plant',
    desc: 'A dedicated sewage treatment plant for effective wastewater management.',
    svg: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#30534A"/><ellipse cx="32" cy="36" rx="16" ry="8" stroke="#C9862b" stroke-width="2.5" fill="none"/><path d="M16 36V28a16 8 0 0132 0v8" stroke="#C9862b" stroke-width="2.5" fill="none"/><path d="M26 20v-6M38 20v-6" stroke="#C9862b" stroke-width="2" stroke-linecap="round"/><path d="M24 44h16" stroke="#C9862b" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  },
  {
    title: 'Open Space Compound Wall',
    desc: 'Fenced open area boundary to the space provided.',
    svg: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#30534A"/><rect x="12" y="26" width="8" height="20" rx="1" stroke="#C9862b" stroke-width="2.5" fill="none"/><rect x="44" y="26" width="8" height="20" rx="1" stroke="#C9862b" stroke-width="2.5" fill="none"/><path d="M20 36h24M20 42h24" stroke="#C9862b" stroke-width="2" stroke-linecap="round"/><path d="M18 20h28" stroke="#C9862b" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  },
  {
    title: 'Meditation Centre',
    desc: 'Dedicated space for contemplation and relaxation.',
    svg: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#30534A"/><circle cx="32" cy="20" r="4" fill="#C9862b"/><path d="M20 44c2-8 24-8 24 0" stroke="#C9862b" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M24 34l8 4 8-4" stroke="#C9862b" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M32 28v6" stroke="#C9862b" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  },
];

/* ── Component ─────────────────────────────────────────────── */
export default function LuxuryAmenities() {
  const [activeImg, setActiveImg] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveImg((p) => (p + 1) % showcaseImages.length);
    }, 4000);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const go = (dir: 'prev' | 'next') => {
    setActiveImg((p) =>
      dir === 'prev'
        ? (p === 0 ? showcaseImages.length - 1 : p - 1)
        : (p + 1) % showcaseImages.length
    );
    resetTimer();
  };

  return (
    <section
      id="amenities"
      className="py-20 md:py-28"
      style={{ background: '#f9f7f4' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 scroll-fade">
          <div>
            <span className="section-chip mb-3 block w-fit">World-Class Amenities</span>
            <h2
              className="leading-tight"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--primary)' }}
            >
              Amenities that Enhance Your{' '}
              <span style={{ color: 'var(--secondary)', fontStyle: 'italic' }}>Lifestyle</span>
            </h2>
          </div>
        </div>

        {/* ── Image Showcase ── */}
        <div className="relative rounded-3xl overflow-hidden mb-14 scroll-fade" style={{ height: 'clamp(240px, 50vw, 480px)' }}>
          {/* Images */}
          {showcaseImages.map((img, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === activeImg ? 1 : 0, zIndex: i === activeImg ? 1 : 0 }}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent 50%, rgba(8,24,16,0.75) 100%)',
              zIndex: 2,
            }}
          />

          {/* Active label */}
          <div
            className="absolute bottom-5 left-6 z-10"
            style={{ zIndex: 3, animation: 'fadeInUp 0.4s ease-out both' }}
            key={activeImg}
          >
            <span
              className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: 'var(--secondary)', color: '#fff', fontFamily: 'var(--font-heading)' }}
            >
              {showcaseImages[activeImg].label}
            </span>
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-5 right-5 flex gap-2" style={{ zIndex: 3 }}>
            {showcaseImages.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActiveImg(i); resetTimer(); }}
                aria-label={`Go to image ${i + 1}`}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === activeImg ? '24px' : '8px',
                  height: '8px',
                  background: i === activeImg ? 'var(--secondary)' : 'rgba(255,255,255,0.5)',
                }}
              />
            ))}
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={() => go('prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: '#fff', zIndex: 3 }}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => go('next')}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: '#fff', zIndex: 3 }}
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* ── Amenities Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {amenities.map((amenity, index) => (
            <AmenityRow key={index} amenity={amenity} />
          ))}
        </div>

      </div>
    </section>
  );
}

function AmenityRow({ amenity }: { amenity: { title: string; desc: string; svg: string } }) {
  return (
    <div
      className="group flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 scroll-fade"
      style={{
        background: '#fff',
        border: '1px solid rgba(48,83,74,0.09)',
      }}
    >
      {/* Gold accent left bar on hover */}
      <div
        className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
        dangerouslySetInnerHTML={{ __html: amenity.svg }}
        style={{ minWidth: '3.5rem' }}
      />
      <div>
        <h3
          className="font-bold mb-1 leading-snug"
          style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'var(--primary)' }}
        >
          {amenity.title}
        </h3>
        <p
          className="leading-relaxed"
          style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: '#6b7280' }}
        >
          {amenity.desc}
        </p>
      </div>
    </div>
  );
}
