import { NavLink } from 'react-router-dom';
import { Home, CheckSquare, Sparkles, CheckCircle2, Settings, Menu } from 'lucide-react';
import logoAsset from '../../assets/Logo.png';

export default function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }) {
  const navItems = [
    { to: '/', label: 'Home', icon: Home, end: true },
    { to: '/tasks', label: 'My Tasks', icon: CheckSquare },
    { to: '/planner', label: 'AI Planner', icon: Sparkles },
    { to: '/completed', label: 'Completed', icon: CheckCircle2 },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            backgroundColor: 'rgba(5, 7, 17, 0.75)',
            backdropFilter: 'blur(4px)',
          }}
          className="desktop-hidden"
        />
      )}

      <aside
        className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}
        style={{
          boxSizing: 'border-box',
        }}
      >
        {/* Brand Header */}
        <div
          className="sidebar-brand-wrapper"
          style={{
            padding: isCollapsed ? '20px 0' : '22px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'space-between',
            borderBottom: '1px solid rgba(103, 132, 255, 0.08)',
            minHeight: '72px',
          }}
        >
          {/* Logo + Name: hidden entirely when collapsed */}
          {!isCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.45))',
                  flexShrink: 0,
                }}
              >
                <img
                  src={logoAsset}
                  alt="VELTRIX"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
              <div
                className="sidebar-text"
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  color: '#FFFFFF',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                VELTRIX
              </div>
            </div>
          )}

          {/* Hamburger — only toggle button visible when collapsed */}
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Toggle sidebar width"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.18s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#38BDF8';
              e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94A3B8';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Menu size={19} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          style={{
            flex: 1,
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                title={isCollapsed ? item.label : undefined}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: isCollapsed ? '12px' : '11px 16px',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  borderRadius: '12px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  background: isActive
                    ? 'linear-gradient(90deg, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.15) 100%)'
                    : 'transparent',
                  border: isActive
                    ? '1px solid rgba(139, 92, 246, 0.4)'
                    : '1px solid transparent',
                  boxShadow: isActive ? '0 0 20px rgba(139, 92, 246, 0.2)' : 'none',
                  transition: 'all 0.18s ease',
                })}
              >
                {({ isActive }) => (
                  <>
                    <Icon size={18} color={isActive ? '#A855F7' : '#94A3B8'} />
                    {!isCollapsed && <span className="sidebar-text">{item.label}</span>}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(103, 132, 255, 0.08)' }}>
          <NavLink
            to="/settings"
            onClick={onClose}
            title={isCollapsed ? 'Settings' : undefined}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: isCollapsed ? '12px' : '10px 16px',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              borderRadius: '12px',
              fontSize: '0.88rem',
              fontWeight: 500,
              textDecoration: 'none',
              color: isActive ? '#FFFFFF' : '#94A3B8',
              marginBottom: isCollapsed ? '0' : '16px',
            })}
          >
            <Settings size={18} />
            {!isCollapsed && <span className="sidebar-text">Settings</span>}
          </NavLink>

          {/* Promo Card: "Smarter Planning Bigger Goals" */}
          {!isCollapsed && (
            <div
              className="sidebar-promo"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.16) 0%, rgba(59, 130, 246, 0.08) 100%)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                borderRadius: '14px',
                padding: '14px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '6px',
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(168, 85, 247, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#C084FC',
                  }}
                >
                  <Sparkles size={13} />
                </div>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#C084FC',
                    textTransform: 'uppercase',
                  }}
                >
                  SMARTER PLANNING
                </span>
              </div>
              <div
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#F8FAFC',
                }}
              >
                Bigger Goals
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
