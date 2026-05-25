'use client';

import { useEffect, useRef } from 'react';

interface CrunchFact {
  number: string;
  title: string;
  body: string;
  id: string;
  stat: string;
}

const CRUNCH_FACTS: CrunchFact[] = [
  {
    number: '01',
    title: 'THE ROLL ARCHITECTURE',
    body: 'Each chip is rolled into an exact tight cylinder. This increases surface area, locking down dense chilli seasoning particles and lime crystals inside the rolled grooves, creating the signature explosive structural crunch.',
    id: 'roll',
    stat: '360° Rolled',
  },
  {
    number: '02',
    title: 'DEEP SPICE PENETRATION',
    body: 'Chilli spice penetrates deeply into every layer of the rolled corn tortilla. This layered engineering ensures the intense heat builds dynamically from the very first crunch to the last lingering bite.',
    id: 'heat',
    stat: '3x More Spice',
  },
  {
    number: '03',
    title: 'ACOUSTIC SHOCK SNAP',
    body: 'Acoustically tuned for maximum crispness. The structural rolled shell is baked and fried to produce an incredibly loud, sharp crunch that resonates beautifully at first snap.',
    id: 'acoustic',
    stat: '100dB Crispness',
  },
];

// Clean glowing SVG icons instead of emojis
function SpiralIcon() {
  return (
    <svg className="w-8 h-8 text-[#FF6B1A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PepperIcon() {
  return (
    <svg className="w-8 h-8 text-[#FF2D00]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.8 8.1C18.2 7 17 6.3 15.7 6.4C14.7 6.5 13.9 7.1 13 7.8C12.1 8.5 11.1 9.2 10 9.4C7.7 9.8 5.4 8.7 4 6.8C3.8 6.5 3.3 6.6 3.2 7C2.4 10.7 3.8 14.5 6.8 16.9C9.8 19.3 14 19.8 17.5 18.2C21 16.6 22.9 12.7 22.1 9C22 8.6 21.5 8.4 21.2 8.7C20.4 9.5 19.5 9.4 18.8 8.1Z" />
      <path d="M12.3 5.4C12.7 4.5 13.3 3.3 14.7 2.7C15.1 2.5 15.5 2.9 15.3 3.3C14.7 4.5 14.1 5.7 12.7 6.3C12.3 6.5 11.9 6.1 12.3 5.4Z" fill="#39FF14" />
    </svg>
  );
}

function AcousticsIcon() {
  return (
    <svg className="w-8 h-8 text-[#39FF14]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

export default function CrunchSection() {
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const waveRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-12');
          }
        });
      },
      { threshold: 0.15 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Animated sound wave visualization
  useEffect(() => {
    const canvas = waveRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      t += 0.04;

      const bars = 50;
      const barW = w / bars;

      for (let i = 0; i < bars; i++) {
        const x = i * barW;
        const freq1 = Math.sin(i * 0.25 + t) * 0.4;
        const freq2 = Math.cos(i * 0.12 - t * 0.8) * 0.3;
        const freq3 = Math.sin(i * 0.5 + t * 1.5) * 0.2;
        const noise = (Math.random() - 0.5) * 0.05;
        const height = Math.abs(freq1 + freq2 + freq3 + noise) * h * 0.8 + 4;

        const progress = i / bars;
        let color: string;
        if (progress < 0.4) {
          color = `rgba(255, 45, 0, ${0.5 + Math.abs(Math.sin(i + t)) * 0.5})`;
        } else if (progress < 0.7) {
          color = `rgba(255, 107, 26, ${0.5 + Math.abs(Math.sin(i + t)) * 0.5})`;
        } else {
          color = `rgba(57, 255, 20, ${0.5 + Math.abs(Math.sin(i + t)) * 0.5})`;
        }

        ctx.save();
        if (height > h * 0.5) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = progress < 0.7 ? '#FF4500' : '#39FF14';
        }
        ctx.fillStyle = color;
        ctx.fillRect(x + 1, (h - height) / 2, barW - 2, height);
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      id="experience"
      className="relative py-48 px-6 overflow-hidden"
      style={{ background: '#050508' }}
    >
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050508] to-transparent pointer-events-none" />

      {/* Atmospheric Glowing Neon Orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,26,0.03) 0%, rgba(57,255,20,0.01) 50%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center">

        {/* Studio Waveform Dashboard Panel - Perfectly Centered */}
        <div className="mb-20 p-8 rounded-2xl border border-white/5 bg-white/[0.005] backdrop-blur-md relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-repeating-linear-gradient"
               style={{
                 background: 'linear-gradient(rgba(255,255,255,0.005) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.005) 1px, transparent 1px)',
                 backgroundSize: '20px 20px',
               }} />

          <div className="relative z-10 flex flex-col items-center">
            
            {/* Header Content */}
            <div className="mb-8">
              <div className="text-xs tracking-[0.5em] text-[#FF6B1A] uppercase mb-4 font-bold">
                Acoustic Engineering
              </div>
              <h2
                className="text-[clamp(2.5rem,7vw,4.5rem)] font-black leading-none uppercase"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
              >
                THE SCIENCE
                <br />
                <span className="text-lime-gradient" style={{
                  background: 'linear-gradient(135deg, #39FF14, #00FF88)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  OF CRUNCH
                </span>
              </h2>
              <p className="text-white/40 text-sm md:text-base mt-4 leading-relaxed font-light max-w-xl mx-auto">
                Our acoustic laboratory measures exactly how Dinamita rolled chips shock your senses. Scroll to see the snapping frequency patterns react instantly.
              </p>
            </div>

            {/* Glowing Equalizer Screen */}
            <div className="w-full max-w-xl p-6 rounded-xl border border-white/5 bg-black/40 relative">
              <div className="absolute top-4 left-6 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[9px] text-red-500/70 uppercase tracking-widest font-mono">REC // FREQ_TEST</span>
              </div>
              <div className="mt-4 flex justify-center">
                <canvas
                  ref={waveRef}
                  className="w-full"
                  style={{ height: '70px' }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Timeline Layout list items centered - fully borderless, modern style */}
        <div className="flex flex-col gap-8 max-w-3xl mx-auto relative">
          
          {/* Vertical joining timeline connector strip */}
          <div className="absolute left-16 top-8 bottom-8 w-px bg-gradient-to-b from-[#FF6B1A]/20 via-[#FF2D00]/20 to-[#39FF14]/20 hidden sm:block pointer-events-none" />

          {CRUNCH_FACTS.map((fact, i) => (
            <div
              key={i}
              ref={(el) => { if (el) itemRefs.current[i] = el; }}
              className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl border border-white/[0.02] bg-white/[0.005] transition-all duration-500 opacity-0 translate-y-12 cursor-default group text-center sm:text-left relative z-10"
              style={{
                transitionDelay: `${i * 150}ms`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = 'rgba(255,255,255,0.01)';
                el.style.borderColor = 'rgba(255,255,255,0.06)';
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = 'rgba(255,255,255,0.005)';
                el.style.borderColor = 'rgba(255,255,255,0.02)';
                el.style.transform = 'none';
              }}
            >
              {/* Number and Icon Header */}
              <div className="flex items-center gap-4 flex-shrink-0 justify-center relative">
                <span
                  className="text-4xl md:text-5xl font-black opacity-20 group-hover:opacity-60 transition-opacity"
                  style={{ fontFamily: 'var(--font-display)', color: '#FF6B1A' }}
                >
                  {fact.number}
                </span>
                <div className="p-3 rounded-full bg-white/[0.02] border border-white/5 transition-all group-hover:border-white/10 group-hover:scale-105">
                  {fact.id === 'roll' && <SpiralIcon />}
                  {fact.id === 'heat' && <PepperIcon />}
                  {fact.id === 'acoustic' && <AcousticsIcon />}
                </div>
              </div>

              {/* Title and Detail Description */}
              <div className="flex-1">
                <h3
                  className="text-lg md:text-xl font-black text-white mb-2 uppercase tracking-wide"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {fact.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed font-light">
                  {fact.body}
                </p>
              </div>

              {/* Stats Badge */}
              <div className="flex-shrink-0 justify-center">
                <span className="px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.01] text-[10px] font-mono text-white/50 uppercase tracking-widest group-hover:border-[#39FF14]/30 group-hover:text-[#39FF14] transition-all">
                  {fact.stat}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
