import { useEffect, useState } from 'react';
import { XCircle, Sparkles } from 'lucide-react';

export default function AiWavyLoader({ onCancel }) {
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    'Analyzing your goals & objectives...',
    'Structuring intelligent milestones...',
    'Synthesizing actionable steps & priorities...',
    'Finalizing time estimates & execution roadmap...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [statuses.length]);

  // Generate 20 distinct wave bars with balanced height limits and rhythmic delays
  const bars = [
    { delay: '0.05s', min: '12px', max: '36px' },
    { delay: '0.15s', min: '16px', max: '48px' },
    { delay: '0.25s', min: '10px', max: '32px' },
    { delay: '0.35s', min: '20px', max: '56px' },
    { delay: '0.45s', min: '14px', max: '42px' },
    { delay: '0.55s', min: '22px', max: '60px' },
    { delay: '0.65s', min: '18px', max: '50px' },
    { delay: '0.75s', min: '12px', max: '38px' },
    { delay: '0.85s', min: '24px', max: '64px' },
    { delay: '0.95s', min: '16px', max: '46px' },
    { delay: '1.05s', min: '22px', max: '58px' },
    { delay: '1.15s', min: '14px', max: '40px' },
    { delay: '1.25s', min: '26px', max: '62px' },
    { delay: '1.35s', min: '18px', max: '48px' },
    { delay: '1.45s', min: '12px', max: '34px' },
    { delay: '1.55s', min: '20px', max: '54px' },
    { delay: '1.65s', min: '14px', max: '38px' },
    { delay: '1.75s', min: '16px', max: '44px' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '28px 20px',
        backgroundColor: '#090D1B',
        border: '1px solid rgba(139, 92, 246, 0.35)',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15), inset 0 0 24px rgba(34, 211, 238, 0.05)',
        animation: 'toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Background radial neural aura */}
      <div
        className="pulse-aura"
        style={{
          position: 'absolute',
          width: '280px',
          height: '140px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(34, 211, 238, 0.15) 50%, transparent 80%)',
          filter: 'blur(35px)',
          pointerEvents: 'none',
        }}
      />

      {/* Futuristic Header with Sparkle */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px',
        }}
      >
        <Sparkles size={16} color="#22D3EE" />
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#38BDF8',
            textTransform: 'uppercase',
          }}
        >
          VELTRIX AI ENGINE ACTIVE
        </span>
      </div>

      {/* Wavy Neural Equalizer Soundwave Bars */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          height: '70px',
          marginBottom: '22px',
          width: '100%',
        }}
      >
        {bars.map((bar, i) => (
          <div
            key={i}
            style={{
              width: '4px',
              borderRadius: '9999px',
              background: 'linear-gradient(180deg, #22D3EE 0%, #8B5CF6 50%, #A855F7 100%)',
              boxShadow: '0 0 8px rgba(34, 211, 238, 0.5), 0 0 16px rgba(139, 92, 246, 0.3)',
              animation: `wavyBar 1.2s ease-in-out infinite`,
              animationDelay: bar.delay,
            }}
          />
        ))}
      </div>

      {/* Animated Status Message */}
      <div
        style={{
          fontSize: '0.92rem',
          fontWeight: 600,
          color: '#F8FAFC',
          marginBottom: '20px',
          textAlign: 'center',
          minHeight: '24px',
          transition: 'all 0.3s ease',
        }}
      >
        {statuses[statusIndex]}
      </div>

      {/* Cancel Button */}
      <button
        type="button"
        onClick={onCancel}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 20px',
          backgroundColor: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.35)',
          borderRadius: '10px',
          color: '#FDA4AF',
          fontSize: '0.84rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.18s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(244, 63, 94, 0.2)';
          e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(244, 63, 94, 0.1)';
          e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.35)';
        }}
      >
        <XCircle size={15} />
        <span>Cancel Generation</span>
      </button>
    </div>
  );
}
