export default function StatusBadge({ status }) {
  const normalized = (status || 'pending').toLowerCase();

  const configs = {
    pending: {
      label: 'Pending',
      bg: 'rgba(245, 158, 11, 0.14)',
      border: 'rgba(245, 158, 11, 0.35)',
      color: '#FBBF24',
      dot: '#F59E0B',
    },
    'in-progress': {
      label: 'In Progress',
      bg: 'rgba(59, 130, 246, 0.14)',
      border: 'rgba(59, 130, 246, 0.35)',
      color: '#60A5FA',
      dot: '#3B82F6',
    },
    completed: {
      label: 'Completed',
      bg: 'rgba(34, 197, 94, 0.14)',
      border: 'rgba(34, 197, 94, 0.35)',
      color: '#4ADE80',
      dot: '#22C55E',
    },
  };

  const current = configs[normalized] || configs.pending;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '3px 12px',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
        backgroundColor: current.bg,
        border: `1px solid ${current.border}`,
        color: current.color,
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: current.dot,
          boxShadow: `0 0 6px ${current.dot}`,
        }}
      />
      {current.label}
    </span>
  );
}
