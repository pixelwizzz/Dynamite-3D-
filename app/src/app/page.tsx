'use client';

import dynamic from 'next/dynamic';
import { useLenis } from '@/hooks/useLenis';

// Dynamic imports to avoid SSR issues with canvas/WebGL
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const FrameCanvas = dynamic(() => import('@/components/FrameCanvas'), { ssr: false });
const FlavorSection = dynamic(() => import('@/components/FlavorSection'), { ssr: false });
const CrunchSection = dynamic(() => import('@/components/CrunchSection'), { ssr: false });
const CTASection = dynamic(() => import('@/components/CTASection'), { ssr: false });

export default function Home() {
  // Initialize Lenis smooth scroll globally
  useLenis();

  return (
    <main className="relative bg-[#050508]">
      {/* Navigation */}
      <Navbar />

      {/* ============================
          SCROLL-DRIVEN CINEMATIC SECTION
          64-frame canvas animation
      ============================ */}
      <FrameCanvas />

      {/* ============================
          FLAVOR EXPERIENCE SECTION
      ============================ */}
      <FlavorSection />

      {/* ============================
          CRUNCH SHOWCASE SECTION
      ============================ */}
      <CrunchSection />

      {/* ============================
          FINAL CTA SECTION
      ============================ */}
      <CTASection />

      {/* Footer */}
      <footer
        className="relative border-t py-10 px-6 text-center"
        style={{
          borderColor: 'rgba(255,255,255,0.05)',
          background: '#020204',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span
              className="text-2xl font-black text-white"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}
            >
              DORITOS DINAMITA
            </span>
          </div>
          <p className="text-white/20 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
            © 2024 Frito-Lay, Inc. All rights reserved. Scroll experience built for immersive product storytelling.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Contact'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/30 hover:text-white/60 transition-colors text-sm"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.15em' }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
