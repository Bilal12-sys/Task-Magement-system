import { NavLink } from 'react-router-dom';
import { Home, CheckSquare, Sparkles, CheckCircle2 } from 'lucide-react';

export default function MobileNav() {
  const items = [
    { to: '/', label: 'Home', icon: Home, end: true },
    { to: '/tasks', label: 'Tasks', icon: CheckSquare },
    { to: '/planner', label: 'AI Planner', icon: Sparkles },
    { to: '/completed', label: 'Completed', icon: CheckCircle2 },
  ];

  return (
    <nav
      className="mobile-bottom-nav desktop-hidden"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '62px',
        backgroundColor: '#080C19',
        borderTop: '1px solid rgba(103, 132, 255, 0.16)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 40,
        backdropFilter: 'blur(12px)',
        padding: '0 8px',
      }}
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            style={({ isActive }) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'none',
              color: isActive ? '#38BDF8' : '#64748B',
              fontSize: '0.72rem',
              fontWeight: 600,
              padding: '6px 12px',
              borderRadius: '8px',
              transition: 'all 0.15s ease',
            })}
          >
            {({ isActive }) => (
              <>
                <Icon size={19} color={isActive ? '#38BDF8' : '#64748B'} />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
