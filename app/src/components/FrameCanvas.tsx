'use client';

import { useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 64;
const FRAME_PATH = (n: number) =>
  `/frames/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;

// Section definitions: [startProgress, endProgress, label, subtext]
const SECTIONS: [number, number, string, string][] = [
  [0,    0.14, 'DINAMITA',              'Fiery Lime and Chilli'],
  [0.14, 0.35, 'IGNITE YOUR SENSES',   'An explosion of flavor awaits'],
  [0.35, 0.55, 'FLAVOR EXPERIENCE',    'Every rolled chip packed with fire'],
  [0.55, 0.78, 'CRUNCH SHOWCASE',      'The crunch that echoes'],
  [0.78, 1.00, 'UNLEASH THE CRUNCH',   'Dare to feel the heat'],
];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
  type: 'ember' | 'lime' | 'dust';
}

export default function FrameCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const progressRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const scrollVelocityRef = useRef(0);
  const lastScrollRef = useRef(0);
  const labelOpacityRef = useRef(0);
  const currentSectionRef = useRef(-1);

  // Preload all frames
  useEffect(() => {
    framesRef.current = [];
    loadedRef.current = new Array(TOTAL_FRAMES).fill(false);

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedRef.current[i - 1] = true;
      };
      framesRef.current.push(img);
    }
  }, []);

  // Particle system
  const spawnParticles = useCallback((count: number, x: number, y: number, velocity: number) => {
    const types: Particle['type'][] = ['ember', 'lime', 'dust'];
    const colors = {
      ember: ['#FF4500', '#FF6B1A', '#FFD700', '#FF2D00'],
      lime:  ['#39FF14', '#00FF88', '#ADFF2F', '#7FFF00'],
      dust:  ['#FFD700', '#FFA500', '#E8C84A', '#F5DEB3'],
    };

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const colorArr = colors[type];
      const speed = 1.5 + Math.random() * 3 * Math.abs(velocity);

      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 200,
        y: y + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * speed * 2,
        vy: -(Math.random() * speed + 1),
        size: 1.5 + Math.random() * 4,
        life: 1,
        maxLife: 0.4 + Math.random() * 0.6,
        color: colorArr[Math.floor(Math.random() * colorArr.length)],
        type,
      });
    }
  }, []);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, dt: number) => {
    ctx.clearRect(0, 0, w, h);

    particlesRef.current = particlesRef.current.filter(p => p.life > 0);

    for (const p of particlesRef.current) {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.97;
      p.vy *= 0.97;
      p.life -= dt / p.maxLife * 0.016;

      const alpha = Math.max(0, p.life);
      ctx.save();
      ctx.globalAlpha = alpha;

      if (p.type === 'ember') {
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'lime') {
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha * 0.6;
        ctx.fillRect(p.x, p.y, p.size * 0.5, p.size * 0.5);
      }

      ctx.restore();
    }
  }, []);

  // Main render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const pCanvas = particleCanvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !pCanvas || !wrapper) return;

    const ctx = canvas.getContext('2d')!;
    const pCtx = pCanvas.getContext('2d')!;

    let lastTime = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      pCanvas.width = window.innerWidth;
      pCanvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Scroll handler
    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const totalScrollable = wrapper.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
      const velocity = p - progressRef.current;
      scrollVelocityRef.current = velocity;
      progressRef.current = p;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const drawFrame = (timestamp: number) => {
      const dt = timestamp - lastTime;
      lastTime = timestamp;

      const w = canvas.width;
      const h = canvas.height;
      const progress = progressRef.current;

      // Compute frame index
      const rawIndex = Math.floor(progress * (TOTAL_FRAMES - 1));
      const frameIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, rawIndex));

      // Draw image frame
      const img = framesRef.current[frameIndex];
      if (img && loadedRef.current[frameIndex]) {
        ctx.clearRect(0, 0, w, h);

        // Cover fit
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = w / h;
        let drawW: number, drawH: number, drawX: number, drawY: number;

        if (imgAspect > canvasAspect) {
          drawH = h;
          drawW = h * imgAspect;
          drawX = (w - drawW) / 2;
          drawY = 0;
        } else {
          drawW = w;
          drawH = w / imgAspect;
          drawX = 0;
          drawY = (h - drawH) / 2;
        }

        // Subtle parallax shift
        const parallaxX = (progress - 0.5) * 20;
        ctx.drawImage(img, drawX + parallaxX, drawY, drawW, drawH);

        // Vignette overlay
        const vignette = ctx.createRadialGradient(w/2, h/2, h * 0.25, w/2, h/2, h);
        vignette.addColorStop(0, 'rgba(0,0,0,0)');
        vignette.addColorStop(1, 'rgba(0,0,0,0.65)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, w, h);
      }

      // Spawn particles based on scroll velocity
      const velocity = Math.abs(scrollVelocityRef.current);
      if (velocity > 0.001) {
        const count = Math.floor(velocity * 400);
        spawnParticles(count, w / 2, h * 0.6, velocity);
      }

      // Always spawn ambient embers
      if (Math.random() < 0.3) {
        spawnParticles(1, w * Math.random(), h * 0.8, 0.3);
      }

      // Update section label opacity
      let newSection = -1;
      for (let s = 0; s < SECTIONS.length; s++) {
        const [start, end] = SECTIONS[s];
        if (progress >= start && progress < end) {
          newSection = s;
          break;
        }
      }
      if (newSection !== currentSectionRef.current) {
        labelOpacityRef.current = 0;
        currentSectionRef.current = newSection;
      }
      if (labelOpacityRef.current < 1) {
        labelOpacityRef.current = Math.min(1, labelOpacityRef.current + 0.04);
      }

      // Draw particles on top
      drawParticles(pCtx, w, h, dt);

      currentFrameRef.current = frameIndex;
      rafRef.current = requestAnimationFrame(drawFrame);
    };

    rafRef.current = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
    };
  }, [spawnParticles, drawParticles]);

  return (
    <div ref={wrapperRef} className="scroll-canvas-wrapper">
      <div className="canvas-sticky">
        {/* Main image canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 1 }}
        />

        {/* Particle canvas */}
        <canvas
          ref={particleCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 2 }}
        />

        {/* Section text overlays */}
        <SectionOverlays />

        {/* Progress bar */}
        <ProgressBar />

        {/* Scroll indicator */}
        <ScrollIndicator />

        {/* Scan line effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 5,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px)',
          }}
        />
      </div>
    </div>
  );
}

function SectionOverlays() {
  const progressRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      // find scroll progress from parent
      const wrapper = document.querySelector('.scroll-canvas-wrapper') as HTMLElement;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const totalScrollable = wrapper.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      progressRef.current = Math.max(0, Math.min(1, scrolled / totalScrollable));
      updateOverlays();
    };

    const updateOverlays = () => {
      const container = containerRef.current;
      if (!container) return;
      const p = progressRef.current;

      SECTIONS.forEach(([start, end, title, sub], i) => {
        const el = container.querySelector(`[data-section="${i}"]`) as HTMLElement;
        if (!el) return;
        const sectionDuration = end - start;
        const local = (p - start) / sectionDuration;

        let opacity = 0;
        let translateY = 0;

        if (local >= 0 && local <= 1) {
          // Fade in during first 20%, hold, fade out last 20%
          if (local < 0.2) {
            opacity = local / 0.2;
            translateY = 30 * (1 - opacity);
          } else if (local < 0.8) {
            opacity = 1;
            translateY = 0;
          } else {
            opacity = 1 - (local - 0.8) / 0.2;
            translateY = -20 * (1 - opacity);
          }
        }

        el.style.opacity = String(opacity);
        el.style.transform = `translateY(${translateY}px)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      {/* Hero section */}
      <div data-section="0" className="absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: 1 }}>
        <div className="text-center px-4 max-w-4xl">
          <div
            className="font-display text-white/60 text-sm tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.4em' }}
          >
            Doritos Presents
          </div>
          <h1
            className="text-[clamp(4rem,14vw,11rem)] leading-none font-black text-white mb-2"
            style={{ fontFamily: 'var(--font-display)', lineHeight: 0.9 }}
          >
            <span className="text-fire-gradient glow-fire" style={{
              background: 'linear-gradient(135deg, #FF6B1A 0%, #FF2D00 40%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(255,69,0,0.8))',
            }}>
              DINAMITA
            </span>
          </h1>
          <p
            className="text-[clamp(0.9rem,2.5vw,1.4rem)] text-white/70 tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}
          >
            Fiery Lime and Chilli
          </p>
        </div>
      </div>

      {/* Section 1: Ignite */}
      <div data-section="1" className="absolute inset-0 flex flex-col items-center justify-center animate-fade-in" style={{ opacity: 0 }}>
        <div className="text-center px-4 max-w-3xl">
          <div className="text-[clamp(0.7rem,1.5vw,1rem)] text-lime-400/80 tracking-[0.5em] uppercase mb-4"
               style={{ fontFamily: 'var(--font-heading)', color: '#39FF14' }}>
            Chapter 01
          </div>
          <h2 className="text-[clamp(3.5rem,9vw,7.5rem)] leading-none font-black text-white mb-4"
              style={{ fontFamily: 'var(--font-display)' }}>
            IGNITE<br />
            <span style={{
              background: 'linear-gradient(135deg, #39FF14, #00FF88)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              YOUR SENSES
            </span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-lg mx-auto"
             style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
            An explosion of flavor that sparks at first bite and burns brilliantly.
          </p>
        </div>
      </div>

      {/* Section 2: Flavor */}
      <div data-section="2" className="absolute inset-0 flex flex-col items-center justify-center animate-fade-in" style={{ opacity: 0 }}>
        <div className="text-center px-4 max-w-3xl">
          <div className="text-[clamp(0.7rem,1.5vw,1rem)] tracking-[0.5em] uppercase mb-4"
               style={{ fontFamily: 'var(--font-heading)', color: '#A855F7' }}>
            Chapter 02
          </div>
          <h2 className="text-[clamp(3.5rem,9vw,7.5rem)] leading-none font-black mb-4"
              style={{ fontFamily: 'var(--font-display)' }}>
            <span style={{
              background: 'linear-gradient(135deg, #A855F7, #E879F9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              FLAVOR
            </span>
            <br />
            <span className="text-white">EXPERIENCE</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-lg mx-auto"
             style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
            Lime zest meets chilli fire. Every rolled chip is an intense flavor journey.
          </p>
        </div>
      </div>

      {/* Section 3: Crunch */}
      <div data-section="3" className="absolute inset-0 flex flex-col items-center justify-center animate-fade-in" style={{ opacity: 0 }}>
        <div className="text-center px-4 max-w-3xl">
          <div className="text-[clamp(0.7rem,1.5vw,1rem)] tracking-[0.5em] uppercase mb-4"
               style={{ fontFamily: 'var(--font-heading)', color: '#FF6B1A' }}>
            Chapter 03
          </div>
          <h2 className="text-[clamp(3.5rem,10vw,8.5rem)] leading-none font-black text-white"
              style={{ fontFamily: 'var(--font-display)' }}>
            CRUNCH
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #FF6B1A, #FFD700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>SHOWCASE</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl mt-4 leading-relaxed max-w-lg mx-auto"
             style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
            The legendary crunch that echoes through the room with absolute authority.
          </p>
        </div>
      </div>

      {/* Section 4: Final CTA */}
      <div data-section="4" className="absolute inset-0 flex flex-col items-center justify-center animate-fade-in" style={{ opacity: 0 }}>
        <div className="text-center px-4 max-w-4xl">
          <h2 className="text-[clamp(3.5rem,12vw,10rem)] leading-none font-black text-white mb-6"
              style={{ fontFamily: 'var(--font-display)' }}>
            UNLEASH THE
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #FF2D00 0%, #FF6B1A 50%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 60px rgba(255,45,0,0.9))',
            }}>
              FIERY CRUNCH
            </span>
          </h2>
          <p className="text-white/60 text-xl mb-10 tracking-widest uppercase"
             style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
            Doritos Dinamita — Fiery Lime and Chilli
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#cta" className="btn-cta" style={{
              background: 'linear-gradient(135deg, #FF2D00, #FF6B1A)',
              color: '#fff',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.1rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '0.9rem 2.5rem',
              borderRadius: '4px',
              display: 'inline-block',
              textDecoration: 'none',
              boxShadow: '0 0 40px rgba(255,45,0,0.5)',
            }}>
              Find Your Pack
            </a>
            <a href="#cta" className="btn-secondary" style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.1rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '0.9rem 2.5rem',
              borderRadius: '4px',
              display: 'inline-block',
              textDecoration: 'none',
              border: '2px solid rgba(57, 255, 20, 0.6)',
              color: '#fff',
            }}>
              Watch the Ad
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const wrapper = document.querySelector('.scroll-canvas-wrapper') as HTMLElement;
      if (!wrapper || !barRef.current) return;
      const rect = wrapper.getBoundingClientRect();
      const totalScrollable = wrapper.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
      barRef.current.style.width = `${p * 100}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ zIndex: 20 }}>
      <div className="w-full h-full bg-white/10" />
      <div
        ref={barRef}
        className="absolute top-0 left-0 h-full transition-none"
        style={{
          background: 'linear-gradient(90deg, #FF2D00, #FF6B1A, #FFD700)',
          boxShadow: '0 0 12px rgba(255,107,26,0.8)',
          width: '0%',
        }}
      />
    </div>
  );
}

function ScrollIndicator() {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hidden = false;
    const onScroll = () => {
      if (!indicatorRef.current) return;
      const wrapper = document.querySelector('.scroll-canvas-wrapper') as HTMLElement;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const scrolled = -rect.top;
      if (scrolled > 100 && !hidden) {
        hidden = true;
        indicatorRef.current.style.opacity = '0';
      } else if (scrolled <= 100 && hidden) {
        hidden = false;
        indicatorRef.current.style.opacity = '1';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={indicatorRef}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500"
      style={{ zIndex: 20 }}
    >
      <span className="text-white/50 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-heading)' }}>
        Scroll to Experience
      </span>
      <div className="w-[1px] h-10 relative overflow-hidden bg-white/20">
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-orange-400 to-transparent"
          style={{
            height: '50%',
            animation: 'scan-line 1.5s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}
