import { ArrowLeft, Calendar, Clock, Target, Edit3, Trash2, X } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import { formatDate } from '../../utils/date';

export default function TaskDetailsModal({ isOpen, task, onClose, onEdit, onDelete }) {
  if (!isOpen || !task) return null;

  // Determine priority based on status or content or default
  const priorityInfo = task.description?.toLowerCase().includes('high')
    ? { dot: '#F43F5E', label: 'High' }
    : task.description?.toLowerCase().includes('low')
    ? { dot: '#22C55E', label: 'Low' }
    : { dot: '#F59E0B', label: 'Medium' };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(5, 7, 17, 0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'toastIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        className="modal-window"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#0D1325',
          border: '1px solid rgba(103, 132, 255, 0.25)',
          borderRadius: '18px',
          width: '100%',
          maxWidth: '600px',
          padding: '28px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(139, 92, 246, 0.15)',
          position: 'relative',
        }}
      >
        {/* Navigation back and close */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '18px',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#38BDF8',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: 0,
            }}
          >
            <ArrowLeft size={16} />
            <span>Task Details</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
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
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Task Title & Status Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '6px',
          }}
        >
          <h2
            style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              color: '#F8FAFC',
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {task.title}
          </h2>

          <StatusBadge status={task.status} />
        </div>

        {/* Subtitle preview if available */}
        {task.description && (
          <div
            style={{
              fontSize: '0.85rem',
              color: '#94A3B8',
              marginBottom: '18px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {task.description.split('\n')[0]}
          </div>
        )}

        {/* 3-Column Metadata Row (Matching Screenshot 2) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            padding: '16px',
            backgroundColor: '#090D1B',
            borderRadius: '14px',
            border: '1px solid rgba(103, 132, 255, 0.12)',
            marginBottom: '22px',
          }}
        >
          {/* Due Date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} color="#38BDF8" />
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>DUE DATE</div>
              <div style={{ fontSize: '0.86rem', color: '#CBD5E1', fontWeight: 600 }}>
                {formatDate(task.dueDate)}
              </div>
            </div>
          </div>

          {/* Created */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} color="#A78BFA" />
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>CREATED</div>
              <div style={{ fontSize: '0.86rem', color: '#CBD5E1', fontWeight: 600 }}>
                {formatDate(task.createdAt)}
              </div>
            </div>
          </div>

          {/* Priority */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={18} color={priorityInfo.dot} />
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>PRIORITY</div>
              <div
                style={{
                  fontSize: '0.86rem',
                  color: '#F8FAFC',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: priorityInfo.dot,
                    boxShadow: `0 0 8px ${priorityInfo.dot}`,
                  }}
                />
                {priorityInfo.label}
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div style={{ marginBottom: '28px' }}>
          <h3
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: '#94A3B8',
              textTransform: 'uppercase',
              margin: '0 0 10px 0',
            }}
          >
            Description
          </h3>
          <div
            style={{
              fontSize: '0.92rem',
              lineHeight: 1.6,
              color: '#CBD5E1',
              backgroundColor: '#090D1B',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid rgba(103, 132, 255, 0.08)',
              whiteSpace: 'pre-line',
              minHeight: '75px',
              maxHeight: '220px',
              overflowY: 'auto',
            }}
          >
            {task.description || 'No description provided for this task.'}
          </div>
        </div>

        {/* Actions (Matching Screenshot 2) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
            borderTop: '1px solid rgba(103, 132, 255, 0.12)',
            paddingTop: '18px',
          }}
        >
          <button
            type="button"
            onClick={() => {
              onClose();
              onEdit(task);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 18px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '10px',
              color: '#F8FAFC',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <Edit3 size={15} />
            <span>Edit</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onDelete(task);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 18px',
              backgroundColor: 'rgba(244, 63, 94, 0.12)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: '10px',
              color: '#FDA4AF',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <Trash2 size={15} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
