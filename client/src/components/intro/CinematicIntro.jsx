import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import logoAsset from '../../assets/Logo.png';

export default function CinematicIntro({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const cursorRef = useRef(null);
  const taglineRef = useRef(null);
  const labelRef = useRef(null);
  const leftLineRef = useRef(null);
  const rightLineRef = useRef(null);

  const [typedText, setTypedText] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'VELTRIX'
      : ''
  );
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 300);
      return () => clearTimeout(timer);
    }

    const fullWord = 'VELTRIX';
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.65,
            ease: 'power2.inOut',
            onComplete: () => {
              if (onComplete) onComplete();
            },
          });
        },
      });

      // Initial state: Pure Darkness, everything hidden
      gsap.set(logoRef.current, { opacity: 0, scale: 0.84 });
      gsap.set(taglineRef.current, { opacity: 0, y: 16 });
      gsap.set(labelRef.current, { opacity: 0, y: 10 });
      gsap.set([leftLineRef.current, rightLineRef.current], { scaleX: 0 });

      // 1. One by one: The V logo appears smoothly (NO box shadow!)
      tl.to(
        logoRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.85,
          ease: 'power2.out',
        },
        0.25
      );

      // 2. Fast smooth VELTRIX typing animation
      tl.call(() => setShowCursor(true), null, 1.15);

      for (let i = 1; i <= fullWord.length; i++) {
        tl.call(() => setTypedText(fullWord.slice(0, i)), null, 1.15 + (i - 1) * 0.08);
      }

      // Cursor blink
      tl.to(
        cursorRef.current,
        {
          opacity: 0,
          repeat: 2,
          yoyo: true,
          duration: 0.12,
        },
        1.7
      );

      // 3. Tagline reveal: "Plan Smarter. Execute Faster."
      tl.to(
        taglineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        1.8
      );

      // 4. "AI TASK MANAGER" with expanding neon lines
      tl.to(
        labelRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
        },
        2.25
      );

      tl.to(
        [leftLineRef.current, rightLineRef.current],
        {
          scaleX: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        2.35
      );

      // 5. Brief hold for final composition balance (2.8s) before smooth transition
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#050711',
        overflow: 'hidden',
        width: '100vw',
        height: '100vh',
      }}
      aria-label="Veltrix Startup Intro"
    >
      {/* Soft atmospheric ambient glow (no sharp box edges) */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(34, 211, 238, 0.05) 50%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '24px',
          maxWidth: '540px',
          width: '100%',
        }}
      >
        {/* V Logo - Pure transparent asset, no square box-shadow! */}
        <div
          ref={logoRef}
          style={{
            width: '110px',
            height: '110px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '28px',
            filter: 'drop-shadow(0 0 16px rgba(168, 85, 247, 0.45)) drop-shadow(0 0 30px rgba(34, 211, 238, 0.25))',
          }}
        >
          <img
            src={logoAsset}
            alt="VELTRIX"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        {/* Wordmark with smooth character typing */}
        <div
          style={{
            fontSize: 'clamp(2.4rem, 6.5vw, 3.8rem)',
            fontWeight: 800,
            letterSpacing: '0.22em',
            color: '#FFFFFF',
            lineHeight: 1.1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <span>
            {typedText.split('').map((char, index) => {
              if (index === 6) {
                // Gradient accented X
                return (
                  <span
                    key={index}
                    style={{
                      background: 'linear-gradient(135deg, #A855F7 0%, #22D3EE 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {char}
                  </span>
                );
              }
              return <span key={index}>{char}</span>;
            })}
          </span>
          {showCursor && (
            <span
              ref={cursorRef}
              style={{
                display: 'inline-block',
                width: '3px',
                height: '0.82em',
                backgroundColor: '#22D3EE',
                marginLeft: '6px',
                borderRadius: '1px',
                boxShadow: '0 0 8px #22D3EE',
              }}
            />
          )}
        </div>

        {/* Tagline Reveal */}
        <p
          ref={taglineRef}
          style={{
            margin: '0 0 24px 0',
            fontSize: 'clamp(1rem, 2.6vw, 1.25rem)',
            fontWeight: 500,
            letterSpacing: '0.04em',
            background: 'linear-gradient(90deg, #C084FC 0%, #60A5FA 50%, #22D3EE 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Plan Smarter. Execute Faster.
        </p>

        {/* AI TASK MANAGER Reveal with animated neon lines */}
        <div
          ref={labelRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            width: '100%',
          }}
        >
          <div
            ref={leftLineRef}
            style={{
              height: '1px',
              flex: 1,
              maxWidth: '85px',
              background: 'linear-gradient(90deg, transparent, #8B5CF6 60%, #22D3EE 100%)',
              transformOrigin: 'right center',
              boxShadow: '0 0 6px rgba(34, 211, 238, 0.4)',
            }}
          />

          <span
            style={{
              fontSize: '0.76rem',
              fontWeight: 700,
              letterSpacing: '0.32em',
              color: '#CBD5E1',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            AI TASK MANAGER
          </span>

          <div
            ref={rightLineRef}
            style={{
              height: '1px',
              flex: 1,
              maxWidth: '85px',
              background: 'linear-gradient(90deg, #22D3EE 0%, #8B5CF6 40%, transparent 100%)',
              transformOrigin: 'left center',
              boxShadow: '0 0 6px rgba(34, 211, 238, 0.4)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
