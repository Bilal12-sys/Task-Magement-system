import { Settings, Shield, Moon, Database } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div style={{ maxWidth: '780px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Settings size={20} color="#A855F7" />
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: '#F8FAFC',
              margin: 0,
            }}
          >
            Settings
          </h1>
        </div>
        <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: 0 }}>
          Application preferences and system configuration.
        </p>
      </div>

      <div
        style={{
          background: '#0D1325',
          border: '1px solid rgba(103, 132, 255, 0.16)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(103, 132, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#A855F7',
              }}
            >
              <Moon size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#F8FAFC' }}>
                Appearance
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                Veltrix Obsidian Theme (Default Dark)
              </div>
            </div>
          </div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(139, 92, 246, 0.2)',
              color: '#C084FC',
            }}
          >
            Active
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(103, 132, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38BDF8',
              }}
            >
              <Database size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#F8FAFC' }}>
                Backend Connectivity
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                Connected to Express & MongoDB Backend
              </div>
            </div>
          </div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(34, 197, 94, 0.2)',
              color: '#4ADE80',
            }}
          >
            Connected
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FBBF24',
              }}
            >
              <Shield size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#F8FAFC' }}>
                AI Engine
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                OpenRouter Gemini 2.5 Flash Integration
              </div>
            </div>
          </div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              color: '#60A5FA',
            }}
          >
            Ready
          </span>
        </div>
      </div>
    </div>
  );
}
