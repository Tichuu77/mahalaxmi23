'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Waypoints,
  Waves,
  Zap,
  Trees,
  Flower,
  Droplets,
  LayoutGrid,
  Factory,
  Fence,
  HeartHandshake,
} from 'lucide-react';

/* ── Image Showcase ────────────────────────────────────────── */
const showcaseImages = [
  { src: '/gallery_2.jpg', label: 'Central Amenity Park' },
  { src: '/gallery_5.jpg', label: "Children's Play Area" },
  { src: '/gallery_1.jpg', label: 'Garden Seating Lounge' },
  { src: '/gallery_3.jpg', label: 'Landscape & Green Spaces' },
  { src: '/gallery_4.jpg', label: 'Master Layout Plan' },
];

/* ── Updated Amenities (Lucide Icons) ─────────────── */
const amenities = [
  {
    title: 'Internal Cement Concrete Road',
    desc: 'A paved road within the premises connecting all major parts.',
    icon: Waypoints,
  },
  {
    title: 'Sewage Line',
    desc: 'Underground waste disposal system in layout.',
    icon: Waves,
  },
  {
    title: 'Electric Network With Transformer',
    desc: 'Electricity distribution infrastructure for plots and amenities.',
    icon: Zap,
  },
  {
    title: 'Kids Park',
    desc: 'A playground for children in layout.',
    icon: Trees,
  },
  {
    title: 'Garden',
    desc: 'Landscaped green space with plantation for better experience.',
    icon: Flower,
  },
  {
    title: 'Storm Water Drainage',
    desc: 'Efficient stormwater management system across the entire layout.',
    icon: Droplets,
  },
  {
    title: 'Open Space Public Utility',
    desc: 'An open-use area available to all the residents in the layout.',
    icon: LayoutGrid,
  },
  {
    title: 'Sewage Treatment Plant',
    desc: 'A dedicated sewage treatment plant for effective wastewater management.',
    icon: Factory,
  },
  {
    title: 'Open Space Compound Wall',
    desc: 'Fenced open area boundary to the space provided.',
    icon: Fence,
  },
  {
    title: 'Meditation Centre',
    desc: 'Dedicated space for contemplation and relaxation.',
    icon: HeartHandshake,
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
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
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

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 scroll-fade">
          <div>
            <span className="section-chip mb-3 block w-fit">World-Class Amenities</span>
            <h2
              className="leading-tight"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                color: 'var(--primary)',
              }}
            >
              Amenities that Enhance Your{' '}
              <span style={{ color: 'var(--secondary)', fontStyle: 'italic' }}>
                Lifestyle
              </span>
            </h2>
          </div>
        </div>

        {/* Showcase */}
        <div className="relative rounded-3xl overflow-hidden mb-14 scroll-fade" style={{ height: 'clamp(240px, 50vw, 480px)' }}>
          {showcaseImages.map((img, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                opacity: i === activeImg ? 1 : 0,
                zIndex: i === activeImg ? 1 : 0,
              }}
            >
              <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
            </div>
          ))}

          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, transparent 50%, rgba(8,24,16,0.75) 100%)',
            }}
          />

          {/* Label */}
          <div className="absolute bottom-5 left-6 z-10" key={activeImg}>
            <span
              className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{
                background: 'var(--secondary)',
                color: '#fff',
              }}
            >
              {showcaseImages[activeImg].label}
            </span>
          </div>

          {/* Dots */}
          <div className="absolute bottom-5 right-5 flex gap-2 z-10">
            {showcaseImages.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveImg(i);
                  resetTimer();
                }}
                className="rounded-full transition-all"
                style={{
                  width: i === activeImg ? '24px' : '8px',
                  height: '8px',
                  background: i === activeImg
                    ? 'var(--secondary)'
                    : 'rgba(255,255,255,0.5)',
                }}
              />
            ))}
          </div>

          {/* Arrows */}
          <button onClick={() => go('prev')} className="nav-btn left-4">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => go('next')} className="nav-btn right-4">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {amenities.map((amenity, index) => (
            <AmenityRow key={index} amenity={amenity} />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Row ───────────────────────────────────────────── */
function AmenityRow({
  amenity,
}: {
  amenity: { title: string; desc: string; icon: any };
}) {
  const Icon = amenity.icon;

  return (
    <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white border transition-all hover:shadow-lg hover:-translate-y-0.5">
      
      {/* Icon */}
      <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#30534A]/10">
        <Icon className="w-6 h-6 text-[#C9862b]" strokeWidth={2} />
      </div>

      {/* Content */}
      <div>
        <h3 className="font-bold text-sm text-[var(--primary)] mb-1">
          {amenity.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          {amenity.desc}
        </p>
      </div>
    </div>
  );
}