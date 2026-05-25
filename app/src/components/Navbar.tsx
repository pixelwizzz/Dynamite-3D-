'use client';

import { useEffect, useRef } from 'react';

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = '' }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      const scrolled = window.scrollY;
      if (scrolled > 80) {
        navRef.current.style.background = 'rgba(5, 5, 8, 0.92)';
        navRef.current.style.backdropFilter = 'blur(20px)';
        navRef.current.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
      } else {
        navRef.current.style.background = 'transparent';
        navRef.current.style.backdropFilter = 'none';
        navRef.current.style.borderBottom = '1px solid transparent';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${className}`}
      style={{ borderBottom: '1px solid transparent' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span
              className="text-white font-black text-xl leading-none"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}
            >
              DORITOS
            </span>
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase"
              style={{
                fontFamily: 'var(--font-heading)',
                background: 'linear-gradient(90deg, #FF2D00, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Dinamita
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Experience', 'Flavors', 'Story'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/60 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wider uppercase"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.2em' }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#cta"
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded text-sm font-bold uppercase tracking-wider text-white transition-all duration-200 hover:scale-105"
          style={{
            fontFamily: 'var(--font-heading)',
            background: 'linear-gradient(135deg, #FF2D00, #FF6B1A)',
            boxShadow: '0 0 20px rgba(255,45,0,0.35)',
            letterSpacing: '0.15em',
          }}
        >
          <span>Get Yours</span>
          <span style={{ fontSize: '0.8em' }}>→</span>
        </a>
      </div>
    </nav>
  );
}
