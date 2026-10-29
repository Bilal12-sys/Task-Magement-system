import { useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';

export default function DeleteModal({ isOpen, task, onClose, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !task) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(task._id);
      onClose();
    } catch {
      // Error handled in context toast
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(5, 7, 17, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        className="modal-window"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#0D1325',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '420px',
          padding: '28px 24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(244, 63, 94, 0.15)',
          textAlign: 'center',
        }}
      >
        {/* Warning Icon inside Shield Badge */}
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            backgroundColor: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            color: '#F43F5E',
            boxShadow: '0 0 20px rgba(244, 63, 94, 0.25)',
          }}
        >
          <AlertTriangle size={28} />
        </div>

        <h2
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#F8FAFC',
            margin: '0 0 8px 0',
          }}
        >
          Delete Task
        </h2>

        <p
          style={{
            fontSize: '0.875rem',
            color: '#94A3B8',
            margin: '0 0 24px 0',
            lineHeight: 1.5,
          }}
        >
          Are you sure you want to delete <b style={{ color: '#F8FAFC' }}>"{task.title}"</b>? This action cannot be undone.
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            style={{
              flex: 1,
              padding: '10px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#CBD5E1',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            style={{
              flex: 1,
              padding: '10px 16px',
              backgroundColor: '#E11D48',
              border: 'none',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: isDeleting ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 16px rgba(225, 29, 72, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            {isDeleting && <Loader2 size={16} className="spin" />}
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
