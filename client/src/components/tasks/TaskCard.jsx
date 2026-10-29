import { Calendar, Edit3, Trash2, Check } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import { formatDate } from '../../utils/date';

export default function TaskCard({ task, onToggleStatus, onEdit, onDelete, onDetails }) {
  const isCompleted = task.status === 'completed';

  return (
    <div
      className="task-item-card"
      style={{
        background: 'linear-gradient(145deg, #0D1325 0%, #090E1D 100%)',
        border: '1px solid rgba(103, 132, 255, 0.14)',
        borderRadius: '14px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '10px',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
      }}
    >
      {/* Checkbox button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleStatus?.(task);
        }}
        aria-label={isCompleted ? 'Mark as pending' : 'Mark as completed'}
        style={{
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          border: isCompleted
            ? '2px solid #22C55E'
            : '2px solid rgba(148, 163, 184, 0.4)',
          backgroundColor: isCompleted ? '#22C55E' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: 0,
          flexShrink: 0,
          transition: 'all 0.2s ease',
          boxShadow: isCompleted ? '0 0 10px rgba(34, 197, 94, 0.4)' : 'none',
        }}
      >
        {isCompleted && <Check size={13} color="#FFFFFF" strokeWidth={3} />}
      </button>

      {/* Main Task Info (clickable to view details) */}
      <div
        onClick={() => onDetails?.(task)}
        style={{
          flex: 1,
          minWidth: 0,
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            fontSize: '0.98rem',
            fontWeight: 600,
            color: isCompleted ? '#94A3B8' : '#F8FAFC',
            textDecoration: isCompleted ? 'line-through' : 'none',
            marginBottom: '4px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {task.title}
        </div>

        {task.description && (
          <div
            style={{
              fontSize: '0.82rem',
              color: '#64748B',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {task.description}
          </div>
        )}
      </div>

      {/* Status Badge */}
      <div style={{ flexShrink: 0 }}>
        <StatusBadge status={task.status} />
      </div>

      {/* Due Date with Calendar Icon */}
      <div
        className="task-due-date-col"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.8rem',
          color: '#94A3B8',
          flexShrink: 0,
          minWidth: '100px',
        }}
      >
        <Calendar size={14} color="#64748B" />
        <span>{formatDate(task.dueDate)}</span>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(task);
          }}
          aria-label="Edit task"
          className="icon-action-btn"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94A3B8',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <Edit3 size={14} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(task);
          }}
          aria-label="Delete task"
          className="icon-action-btn delete"
          style={{
            background: 'rgba(244, 63, 94, 0.08)',
            border: '1px solid rgba(244, 63, 94, 0.18)',
            borderRadius: '8px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#F43F5E',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
