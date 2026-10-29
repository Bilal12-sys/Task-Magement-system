export function VeltrixRibbonLogo({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="vGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="vGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Left folded wing */}
      <path
        d="M20 22 C22 18, 38 18, 48 34 L50 68 C45 60, 32 40, 20 22 Z"
        fill="url(#vGrad1)"
        filter="url(#glow)"
      />
      {/* Center ribbon fold */}
      <path
        d="M48 34 L50 82 L52 82 L78 28 C74 24, 60 24, 52 46 Z"
        fill="url(#vGrad1)"
        opacity="0.95"
      />
      {/* Right glowing sharp wing */}
      <path
        d="M52 46 L78 28 L82 30 L58 56 Z"
        fill="url(#vGrad2)"
        filter="url(#glow)"
      />
    </svg>
  );
}

export function AiRobotIllustration({ size = 180 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 24px rgba(139, 92, 246, 0.45))' }}
    >
      <defs>
        <linearGradient id="botGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
        <linearGradient id="eyeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <filter id="aura" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Aura background */}
      <circle cx="100" cy="105" r="68" fill="url(#botGrad)" opacity="0.18" filter="url(#aura)" />

      {/* Floating speech bubble matching Image 1 */}
      <g filter="url(#aura)">
        <rect x="142" y="22" width="36" height="26" rx="8" fill="#7C3AED" />
        <polygon points="144,48 140,54 150,48" fill="#7C3AED" />
        <path d="M149 35 C153 31, 161 31, 165 35" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Antenna */}
      <line x1="100" y1="46" x2="100" y2="28" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="24" r="7" fill="#22D3EE" filter="url(#aura)" />

      {/* Robot Head */}
      <rect x="52" y="46" width="96" height="74" rx="30" fill="#0F172A" stroke="url(#botGrad)" strokeWidth="3" />

      {/* Screen Face */}
      <rect x="62" y="56" width="76" height="54" rx="20" fill="#030712" />

      {/* Visor / Cyan Glowing Eyes */}
      <circle cx="82" cy="82" r="9" fill="url(#eyeGrad)" filter="url(#aura)" />
      <circle cx="85" cy="79" r="3" fill="#FFFFFF" />

      <circle cx="118" cy="82" r="9" fill="url(#eyeGrad)" filter="url(#aura)" />
      <circle cx="121" cy="79" r="3" fill="#FFFFFF" />

      {/* Robot Ears */}
      <rect x="44" y="69" width="8" height="26" rx="4" fill="#8B5CF6" />
      <rect x="148" y="69" width="8" height="26" rx="4" fill="#8B5CF6" />

      {/* Robot Body */}
      <rect x="68" y="128" width="64" height="46" rx="20" fill="#0F172A" stroke="url(#botGrad)" strokeWidth="2.5" />

      {/* Core light */}
      <circle cx="100" cy="150" r="10" fill="url(#eyeGrad)" filter="url(#aura)" />
      <polygon points="100,144 106,154 94,154" fill="#FFFFFF" />

      {/* Floating hands */}
      <circle cx="48" cy="144" r="11" fill="#1E293B" stroke="#8B5CF6" strokeWidth="2" />
      <circle cx="152" cy="144" r="11" fill="#1E293B" stroke="#8B5CF6" strokeWidth="2" />
    </svg>
  );
}

export function GlowingDocIllustration({ size = 140 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))' }}
    >
      <defs>
        <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>

      <rect x="40" y="24" width="80" height="112" rx="16" fill="#0F172A" stroke="url(#docGrad)" strokeWidth="2.5" />
      <line x1="56" y1="48" x2="104" y2="48" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
      <line x1="56" y1="66" x2="96" y2="66" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      <line x1="56" y1="82" x2="104" y2="82" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      <line x1="56" y1="98" x2="88" y2="98" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />

      {/* Sparkle badge */}
      <circle cx="118" cy="40" r="16" fill="url(#docGrad)" />
      <path d="M118 31 L120 37 L126 39 L120 41 L118 47 L116 41 L110 39 L116 37 Z" fill="#FFFFFF" />
    </svg>
  );
}
