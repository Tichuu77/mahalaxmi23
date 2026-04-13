'use client';
import React, { useState } from 'react';

const features = [
  {
    title: 'MASTER LAYOUT PLAN',
    description: 'A meticulously planned township with wide internal roads, numbered plots, a central amenity zone, and a lush green belt — all visible at a glance from above.',
    image: '/gallery_4.jpg',
  },
  {
    title: 'GARDEN SEATING LOUNGE',
    description: 'A landscaped outdoor lounge with a premium pergola, sculptural seating, and curated flower beds — the perfect spot to unwind within the gated community.',
    image: '/gallery_1.jpg',
  },
  {
    title: 'CENTRAL AMENITY PARK',
    description: 'An aerial view of the central recreational hub featuring a basketball court, children\'s play zone, walking trails, open lawns, and artistic sculptures.',
    image: '/gallery_2.jpg',
  },
  {
    title: 'LANDSCAPE & GREEN SPACES',
    description: 'Every plot is bordered by richly landscaped garden strips with seasonal flowers, manicured hedges, and palm-lined pathways creating a resort-like environment.',
    image: '/gallery_3.jpg',
  },
  {
    title: "CHILDREN'S PLAY AREA",
    description: 'A dedicated play zone with colorful slides, swings, and benches — set against a lush lawn and canopy of jacaranda trees for a safe, joyful outdoor experience.',
    image: '/gallery_5.jpg',
  },
];


export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative overflow-hidden" style={{ background: '#0d1a14' }}>
      {/* Full-bleed background images */}
      {features.map((f, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{
            backgroundImage: `url(${f.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === activeIndex ? 1 : 0,
            zIndex: i === activeIndex ? 1 : 0,
          }}
        />
      ))}

      {/* Dark gradient — heavier at bottom for the tab strip */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.15) 40%, rgba(8,24,16,0.92) 100%)',
        }}
      />

      {/* Content area — header */}
      <div className="relative z-20 flex flex-col justify-between min-h-screen">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-4 w-full">
          <span className="section-chip section-chip-white mb-4 block w-fit">Features</span>
          <h2
            className="text-white font-bold"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}
          >
            Life at Mahalaxmi Nagar 43
          </h2>
        </div>

        {/* Active feature content */}
        <div className="max-w-7xl mx-auto px-6 pb-6 w-full">
          <div
            key={activeIndex}
            className="mb-6"
            style={{ animation: 'fadeInUp 0.5s ease-out both' }}
          >
            <div
              className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ background: 'var(--secondary)', color: '#fff', fontFamily: 'var(--font-sans)' }}
            >
              {String(activeIndex + 1).padStart(2, '0')} / {String(features.length).padStart(2, '0')}
            </div>
            <h3
              className="font-bold mb-2 leading-tight"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--secondary)', fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}
            >
              {features[activeIndex].title}
            </h3>
            <p
              className="max-w-lg"
              style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.8)', fontSize: '0.98rem', lineHeight: 1.7 }}
            >
              {features[activeIndex].description}
            </p>
          </div>

          {/* Tab strip */}
          <div className="mobile-snap-scroll pb-0 lg:flex lg:flex-nowrap gap-2">
            {features.map((f, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="transition-all duration-300 rounded-xl px-5 py-3 text-left flex-shrink-0 w-52 lg:w-auto lg:flex-1"
                style={{
                  background: i === activeIndex
                    ? 'var(--secondary)'
                    : 'rgba(255,255,255,0.08)',
                  border: `1px solid ${i === activeIndex ? 'var(--secondary)' : 'rgba(255,255,255,0.15)'}`,
                  backdropFilter: 'blur(8px)',
                  transform: i === activeIndex ? 'translateY(-3px)' : 'none',
                  boxShadow: i === activeIndex ? '0 8px 24px rgba(201,134,43,0.3)' : 'none',
                }}
              >
                <p
                  className="font-bold text-xs uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-heading)', color: i === activeIndex ? '#fff' : 'rgba(255,255,255,0.6)' }}
                >
                  {f.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}