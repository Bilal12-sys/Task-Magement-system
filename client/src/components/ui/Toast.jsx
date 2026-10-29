import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts = [], onDismiss }) {
  if (!toasts.length) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
        width: 'calc(100vw - 48px)',
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        const borderColor = isSuccess
          ? 'rgba(34, 197, 94, 0.4)'
          : isError
          ? 'rgba(244, 63, 94, 0.4)'
          : 'rgba(59, 130, 246, 0.4)';

        const glowColor = isSuccess
          ? 'rgba(34, 197, 94, 0.2)'
          : isError
          ? 'rgba(244, 63, 94, 0.2)'
          : 'rgba(59, 130, 246, 0.2)';

        return (
          <div
            key={toast.id}
            role="alert"
            style={{
              pointerEvents: 'auto',
              background: '#0D1325',
              border: `1px solid ${borderColor}`,
              boxShadow: `0 8px 30px ${glowColor}, 0 4px 12px rgba(0,0,0,0.5)`,
              borderRadius: '12px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#F8FAFC',
              fontSize: '0.875rem',
              fontWeight: 500,
              animation: 'toastIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            <div style={{ flexShrink: 0 }}>
              {isSuccess && <CheckCircle2 size={18} color="#22C55E" />}
              {isError && <AlertCircle size={18} color="#F43F5E" />}
              {!isSuccess && !isError && <Info size={18} color="#3B82F6" />}
            </div>

            <div style={{ flex: 1, wordBreak: 'break-word', lineHeight: 1.4 }}>
              {toast.message}
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '6px',
                transition: 'color 0.15s',
              }}
              aria-label="Dismiss notification"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
