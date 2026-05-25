'use client';

import { useEffect, useRef } from 'react';

const TESTIMONIALS = [
  { text: "The heat hits you instantly, the lime cuts through perfectly. This is my go-to snack.", handle: '@fierylimefan', rating: 5 },
  { text: "I've tried every Doritos flavor. Dinamita hits different — the crunch, the heat, the roll.", handle: '@snackreviewer', rating: 5 },
  { text: "Like holding a tiny firecracker in your mouth. Addictively good.", handle: '@heatseeker99', rating: 5 },
];

function GlowingStar() {
  return (
    <svg className="w-4 h-4 text-[#FFD700] filter drop-shadow-[0_0_4px_rgba(255,215,0,0.6)]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
    </svg>
  );
}

function FireIcon() {
  return (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.557 9.414c-.119-1.849-.993-3.91-2.454-5.414-.143-.146-.381-.077-.417.126-.372 2.115-1.637 3.659-3.003 5.309-1.34 1.617-2.68 3.235-2.68 5.753 0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5c0-2.316-.948-4.409-2.446-5.774zm-5.057 10.586c-1.38 0-2.5-1.12-2.5-2.5 0-1.637 1.363-2.618 2.5-4.5 1.137 1.882 2.5 2.863 2.5 4.5 0 1.38-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5V19L19 12L8 5Z" />
    </svg>
  );
}

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  // Background particle shower for CTA
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    interface P {
      x: number; y: number;
      vx: number; vy: number;
      size: number;
      color: string;
      alpha: number;
    }

    const particles: P[] = [];
    const colors = ['#FF2D00', '#FF6B1A', '#FFD700', '#39FF14', '#A855F7'];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(0.3 + Math.random() * 0.7),
        size: 1 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random(),
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.003;

        if (p.y < 0 || p.alpha <= 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
          p.alpha = 0.5 + Math.random() * 0.5;
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, 'transparent');
        ctx.globalAlpha = p.alpha * 0.7;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative overflow-hidden py-48 px-6"
      style={{
        background: 'linear-gradient(180deg, #050508 0%, #0A0210 40%, #050508 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.5 }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full pointer-events-none"
           style={{
             background: 'radial-gradient(circle, rgba(255,45,0,0.07) 0%, rgba(107,15,168,0.04) 50%, transparent 70%)',
             filter: 'blur(40px)',
           }} />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Testimonials - unified glass cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl border"
              style={{
                background: 'rgba(255,255,255,0.01)',
                borderColor: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="flex gap-1.5 mb-4 justify-center md:justify-start">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <GlowingStar key={j} />
                ))}
              </div>
              <p className="text-white/70 leading-relaxed mb-4 italic text-sm md:text-base font-light"
                 style={{ fontFamily: 'var(--font-body)' }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <span className="text-white/30 text-xs tracking-widest uppercase font-bold"
                    style={{ fontFamily: 'var(--font-heading)' }}>
                {t.handle}
              </span>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="text-center">
          {/* Product badge */}
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/[0.01] mb-8">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#39FF14]"
                 style={{ boxShadow: '0 0 8px #39FF14' }} />
            <span className="text-white/50 text-xs tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-heading)' }}>
              Now Available Everywhere
            </span>
          </div>

          <h2
            className="text-[clamp(4rem,12vw,10rem)] font-black leading-none mb-6 uppercase"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
          >
            <span className="text-white">GET </span>
            <span style={{
              background: 'linear-gradient(135deg, #FF2D00 0%, #FF6B1A 40%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 45px rgba(255,45,0,0.55))',
            }}>FIRED</span>
            <br />
            <span className="text-white">UP.</span>
          </h2>

          <p className="text-white/50 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed font-light"
             style={{ fontFamily: 'var(--font-body)' }}>
            Doritos Dinamita Fiery Lime and Chilli.<br />
            Because regular chips are for the fearless.
          </p>

          {/* CTA Buttons - perfectly matched sizing and styled with inline SVGs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <button
              className="btn-cta group flex items-center justify-center min-w-[220px]"
              style={{
                background: 'linear-gradient(135deg, #FF2D00, #FF6B1A)',
                color: '#fff',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '1rem 2.5rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 40px rgba(255,45,0,0.4)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 0 60px rgba(255,45,0,0.7), 0 20px 40px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(255,45,0,0.4)';
              }}
            >
              <FireIcon />
              <span>Find Your Pack</span>
            </button>
            
            <button
              className="btn-secondary flex items-center justify-center min-w-[220px]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '1rem 2.5rem',
                borderRadius: '9999px',
                background: 'transparent',
                border: '2px solid rgba(57,255,20,0.4)',
                color: '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(57,255,20,0.06)';
                e.currentTarget.style.borderColor = '#39FF14';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(57,255,20,0.25)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(57,255,20,0.4)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <PlayIcon />
              <span>Watch the Ad</span>
            </button>
          </div>

          {/* Brand footer line */}
          <div className="flex items-center justify-center gap-6 text-white/20">
            <span className="text-sm tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-heading)' }}>Doritos</span>
            <span className="w-px h-4 bg-white/20" />
            <span className="text-sm tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-heading)' }}>Dinamita</span>
            <span className="w-px h-4 bg-white/20" />
            <span className="text-sm tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-heading)' }}>Fiery Lime & Chilli</span>
          </div>
        </div>
      </div>
    </section>
  );
}
