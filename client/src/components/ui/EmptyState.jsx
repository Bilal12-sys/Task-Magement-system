import { Sparkles } from 'lucide-react';

export default function EmptyState({
  title = 'No tasks found',
  description = 'Create a task or let AI build a plan for you.',
  actionLabel,
  onAction,
  icon: Icon = Sparkles,
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '50px 24px',
        background: 'rgba(13, 19, 37, 0.4)',
        border: '1px dashed rgba(103, 132, 255, 0.2)',
        borderRadius: '16px',
        margin: '12px 0',
      }}
    >
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '14px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(34, 211, 238, 0.1) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#A855F7',
          marginBottom: '16px',
        }}
      >
        <Icon size={26} />
      </div>

      <h3
        style={{
          fontSize: '1.15rem',
          fontWeight: 700,
          color: '#F8FAFC',
          margin: '0 0 6px 0',
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: '0.875rem',
          color: '#94A3B8',
          maxWidth: '380px',
          margin: '0 0 20px 0',
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="btn-primary"
          style={{
            background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
            border: 'none',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '0.875rem',
            padding: '10px 20px',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(139, 92, 246, 0.35)',
            transition: 'all 0.2s ease',
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
