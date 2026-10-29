export default function StatCard({ title, value, icon: Icon, badge, color = 'purple', onClick }) {
  const colorThemes = {
    purple: {
      iconBg: 'rgba(139, 92, 246, 0.18)',
      iconColor: '#A78BFA',
      badgeBg: 'rgba(139, 92, 246, 0.12)',
      badgeColor: '#C4B5FD',
      borderGlow: 'rgba(139, 92, 246, 0.25)',
    },
    amber: {
      iconBg: 'rgba(245, 158, 11, 0.18)',
      iconColor: '#FBBF24',
      badgeBg: 'rgba(245, 158, 11, 0.12)',
      badgeColor: '#FDE68A',
      borderGlow: 'rgba(245, 158, 11, 0.25)',
    },
    blue: {
      iconBg: 'rgba(59, 130, 246, 0.18)',
      iconColor: '#60A5FA',
      badgeBg: 'rgba(59, 130, 246, 0.12)',
      badgeColor: '#93C5FD',
      borderGlow: 'rgba(59, 130, 246, 0.25)',
    },
    green: {
      iconBg: 'rgba(34, 197, 94, 0.18)',
      iconColor: '#4ADE80',
      badgeBg: 'rgba(34, 197, 94, 0.12)',
      badgeColor: '#86EFAC',
      borderGlow: 'rgba(34, 197, 94, 0.25)',
    },
  };

  const theme = colorThemes[color] || colorThemes.purple;

  return (
    <div
      onClick={onClick}
      className="stat-card"
      style={{
        background: 'linear-gradient(145deg, #0D1325 0%, #090E1D 100%)',
        border: '1px solid rgba(103, 132, 255, 0.14)',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: theme.iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.iconColor,
          }}
        >
          {Icon && <Icon size={20} />}
        </div>

        {badge && (
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: '9999px',
              backgroundColor: theme.badgeBg,
              color: theme.badgeColor,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            {badge}
          </span>
        )}
      </div>

      <div>
        <div
          style={{
            fontSize: '1.9rem',
            fontWeight: 800,
            color: '#F8FAFC',
            lineHeight: 1.1,
            marginBottom: '4px',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: '0.82rem',
            color: '#94A3B8',
            fontWeight: 500,
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
}
