import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: '32px 16px',
      }}
    >
      <div
        style={{
          width: '70px',
          height: '70px',
          borderRadius: '20px',
          backgroundColor: 'rgba(139, 92, 246, 0.15)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#A855F7',
          marginBottom: '20px',
        }}
      >
        <Compass size={36} />
      </div>

      <h1
        style={{
          fontSize: '3.5rem',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #A855F7 0%, #38BDF8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 8px 0',
        }}
      >
        404
      </h1>

      <h2
        style={{
          fontSize: '1.35rem',
          fontWeight: 700,
          color: '#F8FAFC',
          margin: '0 0 10px 0',
        }}
      >
        Page Not Found
      </h2>

      <p
        style={{
          fontSize: '0.9rem',
          color: '#94A3B8',
          maxWidth: '420px',
          lineHeight: 1.5,
          margin: '0 0 28px 0',
        }}
      >
        The coordinates you entered do not exist in the VELTRIX workspace.
      </p>

      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '11px 24px',
          background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
          borderRadius: '12px',
          color: '#FFFFFF',
          fontSize: '0.9rem',
          fontWeight: 600,
          textDecoration: 'none',
          boxShadow: '0 4px 18px rgba(139, 92, 246, 0.35)',
        }}
      >
        <Home size={17} />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  );
}
