'use client';

import { useState, useEffect, useRef } from 'react';

interface FlavorInfo {
  id: string;
  name: string;
  tag: string;
  desc: string;
  color: string;
  secondaryColor: string;
  stats: {
    heat: number;
    limeZest: number;
    crunchIndex: number;
    dustIntensity: number;
  };
  highlights: string[];
}

const FLAVORS: FlavorInfo[] = [
  {
    id: 'chilli',
    name: 'Fiery Chilli',
    tag: 'EXPLOSIVE HEAT',
    desc: 'Engineered for extreme heat seekers. A deep, robust, and lingering hot pepper flavor that starts with a bold kick and triggers a slow, intense volcanic burn in your mouth.',
    color: '#FF2D00',
    secondaryColor: '#FF6B1A',
    stats: { heat: 95, limeZest: 15, crunchIndex: 90, dustIntensity: 85 },
    highlights: ['Carolina Reaper Blend', 'Volcanic Afterburn', 'Infused Red Chilli Powder'],
  },
  {
    id: 'lime',
    name: 'Electric Lime',
    tag: 'CITRUS SHOCK',
    desc: 'An electric citrus surge. Fresh, concentrated lime zest that cuts sharp through the dense chilli spice, creating an incredibly refreshing and mouthwatering contrast.',
    color: '#39FF14',
    secondaryColor: '#00FF88',
    stats: { heat: 45, limeZest: 100, crunchIndex: 95, dustIntensity: 75 },
    highlights: ['Concentrated Lime Oils', 'Tangy Citrus Shock', 'Zesty Acidic Finish'],
  },
  {
    id: 'dust',
    name: 'Seasoning Dust',
    tag: 'BOLD COATING',
    desc: 'A dense, golden cloud of seasoning particles locked into the crevices of the rolled chip. Formulated with maximum flavor concentration for instant satisfaction.',
    color: '#FFD700',
    secondaryColor: '#FFA500',
    stats: { heat: 75, limeZest: 60, crunchIndex: 100, dustIntensity: 98 },
    highlights: ['Micro-milled Particles', 'Rolled Coating Lock', 'Salty Savory Punch'],
  },
];

// Glowing custom SVGs instead of cheap emojis
function ChilliIcon({ color }: { color: string }) {
  return (
    <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.8 8.1C18.2 7 17 6.3 15.7 6.4C14.7 6.5 13.9 7.1 13 7.8C12.1 8.5 11.1 9.2 10 9.4C7.7 9.8 5.4 8.7 4 6.8C3.8 6.5 3.3 6.6 3.2 7C2.4 10.7 3.8 14.5 6.8 16.9C9.8 19.3 14 19.8 17.5 18.2C21 16.6 22.9 12.7 22.1 9C22 8.6 21.5 8.4 21.2 8.7C20.4 9.5 19.5 9.4 18.8 8.1Z" fill={color} />
      <path d="M12.3 5.4C12.7 4.5 13.3 3.3 14.7 2.7C15.1 2.5 15.5 2.9 15.3 3.3C14.7 4.5 14.1 5.7 12.7 6.3C12.3 6.5 11.9 6.1 12.3 5.4Z" fill="#39FF14" />
    </svg>
  );
}

function LimeIcon({ color }: { color: string }) {
  return (
    <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
      <path d="M12 3V21M3 12H21M5.6 5.6L18.4 18.4M18.4 5.6L5.6 18.4" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <circle cx="12" cy="12" r="3" fill={color} opacity="0.3" />
    </svg>
  );
}

function DustIcon({ color }: { color: string }) {
  return (
    <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4L9 6L11 7L9 8L8 10L7 8L5 7L7 6L8 4Z" fill={color} />
      <path d="M16 12L17 14L19 15L17 16L16 18L15 16L13 15L15 14L16 12Z" fill={color} opacity="0.8" />
      <circle cx="6" cy="16" r="1.5" fill={color} opacity="0.6" />
      <circle cx="18" cy="6" r="2" fill={color} opacity="0.7" />
      <circle cx="12" cy="10" r="1" fill={color} opacity="0.5" />
    </svg>
  );
}

export default function FlavorSection() {
  const [activeTab, setActiveTab] = useState<string>('chilli');
  const sectionRef = useRef<HTMLElement>(null);

  const activeFlavor = FLAVORS.find((f) => f.id === activeTab) || FLAVORS[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="flavors"
      className="relative py-48 px-6 overflow-hidden transition-all duration-1000 opacity-0"
      style={{
        background: '#050508',
      }}
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 animate-pulse-fire"
        style={{
          background: `radial-gradient(circle 50vw at 50% 50%, ${activeFlavor.color}12 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        {/* Section Header */}
        <div className="mb-16">
          <div
            className="text-xs tracking-[0.6em] uppercase mb-4 transition-colors duration-500 font-bold"
            style={{ color: activeFlavor.color }}
          >
            The Flavor Architecture
          </div>
          <h2
            className="text-[clamp(3.5rem,8vw,6.5rem)] font-black leading-none uppercase"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
          >
            <span className="text-white">DYNAMIC </span>
            <span
              className="transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, ${activeFlavor.color}, ${activeFlavor.secondaryColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: `drop-shadow(0 0 35px ${activeFlavor.color}50)`,
              }}
            >
              EXPERIENCE
            </span>
          </h2>
          <p
            className="text-white/40 text-lg md:text-xl mt-6 max-w-xl mx-auto leading-relaxed font-light"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Choose a flavor note below to explore the reactor metrics.
          </p>
        </div>

        {/* CENTERED TABS SELECTOR */}
        <div className="flex justify-center gap-4 flex-wrap mb-12">
          {FLAVORS.map((flavor) => {
            const isActive = flavor.id === activeTab;
            return (
              <button
                key={flavor.id}
                onClick={() => setActiveTab(flavor.id)}
                className="px-6 py-3 rounded-full border transition-all duration-300 flex items-center gap-3 font-bold text-sm tracking-wider uppercase cursor-pointer"
                style={{
                  background: isActive ? `${flavor.color}15` : 'rgba(255,255,255,0.02)',
                  borderColor: isActive ? flavor.color : 'rgba(255,255,255,0.06)',
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
                  fontFamily: 'var(--font-heading)',
                  boxShadow: isActive ? `0 0 25px ${flavor.color}30` : 'none',
                }}
              >
                {flavor.id === 'chilli' && <ChilliIcon color={isActive ? flavor.color : 'rgba(255,255,255,0.4)'} />}
                {flavor.id === 'lime' && <LimeIcon color={isActive ? flavor.color : 'rgba(255,255,255,0.4)'} />}
                {flavor.id === 'dust' && <DustIcon color={isActive ? flavor.color : 'rgba(255,255,255,0.4)'} />}
                <span>{flavor.name}</span>
              </button>
            );
          })}
        </div>

        {/* CENTERED DETAILED CARD */}
        <div
          className="p-8 md:p-12 rounded-2xl border transition-all duration-700 relative overflow-hidden text-center"
          style={{
            background: 'rgba(255,255,255,0.01)',
            borderColor: `${activeFlavor.color}18`,
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Dynamic Ambient Reactor Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 transition-all duration-1000 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${activeFlavor.color}15 0%, transparent 70%)`,
            }}
          />

          <div className="relative z-10">
            {/* Badge & Icon */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span
                className="px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase transition-all"
                style={{
                  background: `${activeFlavor.color}20`,
                  color: activeFlavor.color,
                  border: `1px solid ${activeFlavor.color}30`,
                }}
              >
                {activeFlavor.tag}
              </span>
            </div>

            {/* Title & Description */}
            <h3
              className="text-3xl md:text-5xl font-black text-white mb-6 uppercase"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.02em' }}
            >
              {activeFlavor.name}
            </h3>
            <p
              className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-light"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {activeFlavor.desc}
            </p>

            {/* Parameters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5 text-left">
              
              {/* Progress Gauges */}
              <div className="space-y-4">
                <h4 className="text-white/40 text-xs tracking-widest uppercase font-bold text-center md:text-left">Reactor Metrics</h4>
                
                {/* Metric 1 */}
                <div>
                  <div className="flex justify-between text-xs mb-1 uppercase font-bold text-white/80">
                    <span>Heat Level</span>
                    <span style={{ color: activeFlavor.color }}>{activeFlavor.stats.heat}%</span>
                  </div>
                  <div className="h-[4px] w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${activeFlavor.stats.heat}%`,
                        background: activeFlavor.color,
                        boxShadow: `0 0 10px ${activeFlavor.color}`,
                      }}
                    />
                  </div>
                </div>

                {/* Metric 2 */}
                <div>
                  <div className="flex justify-between text-xs mb-1 uppercase font-bold text-white/80">
                    <span>Citrus Zest</span>
                    <span style={{ color: activeFlavor.color }}>{activeFlavor.stats.limeZest}%</span>
                  </div>
                  <div className="h-[4px] w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${activeFlavor.stats.limeZest}%`,
                        background: activeFlavor.color,
                        boxShadow: `0 0 10px ${activeFlavor.color}`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Highlights & Features */}
              <div className="flex flex-col justify-start text-center md:text-left">
                <h4 className="text-white/40 text-xs tracking-widest uppercase font-bold mb-4">Unique Components</h4>
                <ul className="space-y-2 inline-block md:block mx-auto md:mx-0">
                  {activeFlavor.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/70 text-sm justify-center md:justify-start">
                      <span
                        className="w-1.5 h-1.5 rounded-full transition-all"
                        style={{
                          background: activeFlavor.color,
                          boxShadow: `0 0 8px ${activeFlavor.color}`,
                        }}
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
