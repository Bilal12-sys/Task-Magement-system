import { useState } from 'react';
import { Search, Bell, Plus, Menu } from 'lucide-react';
import { useTasks } from '../../context/useTasks';

export default function Topbar({ onMenuClick }) {
  const { searchQuery, setSearchQuery, openCreateModal } = useTasks();

  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  });

  return (
    <header
      className="topbar"
      style={{
        height: '76px',
        backgroundColor: '#050711',
        borderBottom: '1px solid rgba(103, 132, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Left: Mobile menu toggle + Greeting */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Toggle navigation menu"
          className="desktop-hidden"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#CBD5E1',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Menu size={22} />
        </button>

        <div>
          <h1
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#F8FAFC',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {greeting}, Bilal! <span role="img" aria-label="wave">👋</span>
          </h1>
          <p
            className="topbar-greeting-sub"
            style={{
              fontSize: '0.8rem',
              color: '#94A3B8',
              margin: '2px 0 0 0',
            }}
          >
            Plan smarter. Execute faster.
          </p>
        </div>
      </div>

      {/* Right: Search, Notification, Avatar, Create Task Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Search input */}
        <div
          className="topbar-search"
          style={{
            position: 'relative',
            width: '240px',
          }}
        >
          <Search
            size={16}
            color="#64748B"
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            style={{
              width: '100%',
              padding: '8px 14px 8px 36px',
              backgroundColor: '#0D1325',
              border: '1px solid rgba(103, 132, 255, 0.16)',
              borderRadius: '10px',
              color: '#F8FAFC',
              fontSize: '0.85rem',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'all 0.2s ease',
            }}
          />
        </div>

        {/* Notification Bell */}
        <button
          type="button"
          aria-label="Notifications"
          style={{
            position: 'relative',
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: '#0D1325',
            border: '1px solid rgba(103, 132, 255, 0.14)',
            color: '#94A3B8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <Bell size={17} />
          {/* Notification dot */}
          <span
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#38BDF8',
              boxShadow: '0 0 6px #38BDF8',
            }}
          />
        </button>

        {/* User Avatar */}
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '0.9rem',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 0 12px rgba(139, 92, 246, 0.3)',
            flexShrink: 0,
          }}
        >
          B
        </div>

        {/* Create Task Button */}
        <button
          type="button"
          onClick={openCreateModal}
          className="create-task-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '9px 18px',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
            border: 'none',
            borderRadius: '10px',
            color: '#FFFFFF',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(139, 92, 246, 0.35)',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease',
          }}
        >
          <Plus size={16} strokeWidth={2.5} />
          <span className="topbar-create-label">Create Task</span>
        </button>
      </div>
    </header>
  );
}
