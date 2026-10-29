import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Target, BookmarkPlus, Check, X, Loader2 } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';

export default function AiPlanModal({ isOpen, plan, onClose, onSaveAsTask, isSaved }) {
  const [completedSteps, setCompletedSteps] = useState({});
  const [saving, setSaving] = useState(false);
  const [createdDate] = useState(() =>
    new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  );

  if (!isOpen || !plan) return null;

  const dueDate = new Date(Date.now() + (plan.estimatedHours || 24) * 3600 * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const toggleStep = (index) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSave = async () => {
    if (isSaved || saving) return;
    setSaving(true);
    try {
      await onSaveAsTask();
    } finally {
      setSaving(false);
    }
  };

  const priorityColors = {
    high: { dot: '#F43F5E', label: 'High' },
    medium: { dot: '#F59E0B', label: 'Medium' },
    low: { dot: '#22C55E', label: 'Low' },
  };

  const currentPriority =
    priorityColors[(plan.priority || 'medium').toLowerCase()] || priorityColors.medium;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(5, 7, 17, 0.8)',
        backdropFilter: 'blur(10px)',
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
          borderRadius: '20px',
          width: '100%',
          maxWidth: '620px',
          padding: '28px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(139, 92, 246, 0.2)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
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
            gap: '14px',
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
            {plan.summary}
          </h2>

          <StatusBadge status="in-progress" />
        </div>

        {/* Subtitle preview matching Image 2 */}
        <div
          style={{
            fontSize: '0.86rem',
            color: '#94A3B8',
            marginBottom: '20px',
            lineHeight: 1.5,
          }}
        >
          {plan.summary}. Estimated execution time: {plan.estimatedHours} hours.
        </div>

        {/* 3-Column Metadata Row (Matching Image 2) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            padding: '16px',
            backgroundColor: '#090D1B',
            borderRadius: '14px',
            border: '1px solid rgba(103, 132, 255, 0.12)',
            marginBottom: '24px',
          }}
        >
          {/* Due Date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={18} color="#38BDF8" />
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>DUE DATE</div>
              <div style={{ fontSize: '0.86rem', color: '#CBD5E1', fontWeight: 600 }}>
                {dueDate}
              </div>
            </div>
          </div>

          {/* Created */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={18} color="#A78BFA" />
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>CREATED</div>
              <div style={{ fontSize: '0.86rem', color: '#CBD5E1', fontWeight: 600 }}>
                {createdDate}
              </div>
            </div>
          </div>

          {/* Priority */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Target size={18} color={currentPriority.dot} />
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
                    backgroundColor: currentPriority.dot,
                    boxShadow: `0 0 8px ${currentPriority.dot}`,
                  }}
                />
                {currentPriority.label}
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
              marginBottom: '16px',
            }}
          >
            This plan outlines structured execution milestones to achieve: {plan.summary}. Complete each step below to track your progress.
          </div>

          {/* Interactive Steps Checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {plan.steps?.map((step, idx) => {
              const done = completedSteps[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleStep(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    backgroundColor: '#090D1B',
                    borderRadius: '10px',
                    border: done
                      ? '1px solid rgba(34, 197, 94, 0.35)'
                      : '1px solid rgba(103, 132, 255, 0.12)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: done
                        ? '2px solid #22C55E'
                        : '2px solid rgba(148, 163, 184, 0.4)',
                      backgroundColor: done ? '#22C55E' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {done && <Check size={11} color="#FFFFFF" strokeWidth={3} />}
                  </div>

                  <span
                    style={{
                      fontSize: '0.86rem',
                      color: done ? '#64748B' : '#F8FAFC',
                      textDecoration: done ? 'line-through' : 'none',
                    }}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Action Buttons */}
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
            onClick={onClose}
            style={{
              padding: '9px 18px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '10px',
              color: '#CBD5E1',
              fontSize: '0.86rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || isSaved}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 22px',
              background: isSaved
                ? '#16A34A'
                : 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
              border: 'none',
              borderRadius: '10px',
              color: '#FFFFFF',
              fontSize: '0.86rem',
              fontWeight: 600,
              cursor: saving || isSaved ? 'default' : 'pointer',
              boxShadow: '0 4px 16px rgba(139, 92, 246, 0.4)',
            }}
          >
            {saving ? (
              <>
                <Loader2 size={15} className="spin" />
                <span>Saving...</span>
              </>
            ) : isSaved ? (
              <>
                <Check size={15} strokeWidth={2.5} />
                <span>Saved as Task!</span>
              </>
            ) : (
              <>
                <BookmarkPlus size={15} />
                <span>Save as Task</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
