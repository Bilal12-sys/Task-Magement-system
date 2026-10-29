import { useState, useRef } from 'react';
import {
  Sparkles,
  Clock,
  CheckCircle2,
  BookmarkPlus,
  RotateCcw,
  Eye,
  Check,
  Loader2,
} from 'lucide-react';
import aiService from '../api/aiService';
import { useTasks } from '../context/useTasks';
import { AiRobotIllustration } from '../components/icons/CustomBrandIcons';
import AiWavyLoader from '../components/ui/AiWavyLoader';
import AiPlanModal from '../components/planner/AiPlanModal';

export default function AiPlannerPage() {
  const { createTask, addToast } = useTasks();

  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [savedTaskId, setSavedTaskId] = useState(null);

  // Popup modal state matching Image 2
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const abortControllerRef = useRef(null);

  const samplePrompts = [
    'Build a portfolio website in 3 days',
    'Learn React in 2 weeks',
    'Create a study plan',
    'Plan a mobile app',
  ];

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please describe what you want to accomplish.');
      return;
    }

    setLoading(true);
    setError('');
    setPlan(null);
    setSavedTaskId(null);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const generatedPlan = await aiService.planTask(description, {
        signal: controller.signal,
      });
      setPlan(generatedPlan);
      addToast('AI Plan generated! Click on the task box to view full details.', 'success');
    } catch (err) {
      if (err.status === 499 || err.message?.includes('cancelled')) {
        addToast('Plan generation cancelled', 'info');
      } else {
        setError(err.message || 'Failed to generate plan. Please try again.');
        addToast(err.message || 'AI planning request failed', 'error');
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setLoading(false);
  };

  const handleSaveAsTask = async () => {
    if (!plan || isSaving || savedTaskId) return;

    setIsSaving(true);
    try {
      const stepsText = plan.steps.map((step, idx) => `${idx + 1}. ${step}`).join('\n');
      const taskDescription = `Priority: ${plan.priority.toUpperCase()} | Estimated: ${plan.estimatedHours}h\n\nAction Steps:\n${stepsText}`;

      const created = await createTask({
        title: plan.summary,
        description: taskDescription,
        status: 'pending',
      });

      setSavedTaskId(created._id);
      addToast('AI Plan saved directly into your tasks! 🚀', 'success');
    } catch (err) {
      addToast(err.message || 'Could not save AI plan as a task', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const getPriorityStyle = (priority) => {
    const p = (priority || 'medium').toLowerCase();
    if (p === 'high') {
      return {
        bg: 'rgba(244, 63, 94, 0.16)',
        border: 'rgba(244, 63, 94, 0.35)',
        color: '#FDA4AF',
        dot: '#F43F5E',
        label: 'High Priority',
      };
    }
    if (p === 'low') {
      return {
        bg: 'rgba(34, 197, 94, 0.16)',
        border: 'rgba(34, 197, 94, 0.35)',
        color: '#86EFAC',
        dot: '#22C55E',
        label: 'Low Priority',
      };
    }
    return {
      bg: 'rgba(245, 158, 11, 0.16)',
      border: 'rgba(245, 158, 11, 0.35)',
      color: '#FDE68A',
      dot: '#F59E0B',
      label: 'Medium Priority',
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      {/* Page Header (Matching Image 1) */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'rgba(139, 92, 246, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#C084FC',
              filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.5))',
            }}
          >
            <Sparkles size={18} />
          </div>
          <h1
            style={{
              fontSize: '1.55rem',
              fontWeight: 800,
              color: '#F8FAFC',
              margin: 0,
            }}
          >
            AI Task Planner
          </h1>
        </div>
        <p
          style={{
            fontSize: '0.86rem',
            color: '#94A3B8',
            margin: 0,
            paddingLeft: '42px',
          }}
        >
          Turn your ideas into actionable plans in seconds.
        </p>
      </div>

      {/* Main Dual-Column Layout (Matching Image 1) */}
      <div className="ai-planner-grid">
        {/* Left Column: Prompt Form */}
        <div
          style={{
            background: '#0D1325',
            border: '1px solid rgba(103, 132, 255, 0.18)',
            borderRadius: '20px',
            padding: '26px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
            position: 'relative',
          }}
        >
          {/* Prompt Textarea */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <textarea
              rows={5}
              maxLength={500}
              disabled={loading}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you want to accomplish. Include your goals, deadline, or any relevant details..."
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: '#090D1B',
                border: '1px solid rgba(103, 132, 255, 0.22)',
                borderRadius: '14px',
                color: '#F8FAFC',
                fontSize: '0.92rem',
                lineHeight: 1.6,
                outline: 'none',
                boxSizing: 'border-box',
                resize: 'none',
                transition: 'border-color 0.2s',
                opacity: loading ? 0.6 : 1,
              }}
            />
            <span
              style={{
                position: 'absolute',
                right: '14px',
                bottom: '12px',
                fontSize: '0.74rem',
                color: '#64748B',
              }}
            >
              {description.length}/500
            </span>
          </div>

          {/* Examples (Matching Image 1) */}
          <div style={{ marginBottom: '22px', opacity: loading ? 0.5 : 1 }}>
            <div
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#94A3B8',
                marginBottom: '10px',
              }}
            >
              Examples:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {samplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  disabled={loading}
                  onClick={() => setDescription(prompt)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(103, 132, 255, 0.18)',
                    borderRadius: '9999px',
                    color: '#CBD5E1',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.borderColor = 'rgba(103, 132, 255, 0.18)';
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div
              style={{
                background: 'rgba(244, 63, 94, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                borderRadius: '10px',
                padding: '12px 16px',
                color: '#FDA4AF',
                fontSize: '0.85rem',
                marginBottom: '16px',
              }}
            >
              {error}
            </div>
          )}

          {/* Generate Button (Disappears when clicked -> shows wavy animation) */}
          {loading ? (
            <AiWavyLoader onCancel={handleCancel} />
          ) : (
            <button
              type="button"
              onClick={handleGenerate}
              style={{
                width: '100%',
                padding: '14px 20px',
                background: 'linear-gradient(90deg, #8B5CF6 0%, #3B82F6 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 6px 24px rgba(139, 92, 246, 0.4)',
                transition: 'all 0.2s ease',
              }}
            >
              <Sparkles size={18} />
              <span>Generate AI Plan</span>
            </button>
          )}
        </div>

        {/* Right Column: AI Robot Card from Image 1 + Generated Plan Task Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Futuristic AI Robot Card (Always Present as in Image 1) */}
          <div
            style={{
              background: 'linear-gradient(180deg, #0D1325 0%, #080D1D 100%)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              borderRadius: '20px',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Robot Illustration with float animation */}
            <div className="float-bot" style={{ marginBottom: '14px' }}>
              <AiRobotIllustration size={155} />
            </div>

            {/* Translucent Checklist Card from Image 1 */}
            <div
              style={{
                width: '100%',
                backgroundColor: 'rgba(9, 13, 27, 0.85)',
                border: '1px solid rgba(103, 132, 255, 0.16)',
                borderRadius: '14px',
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                textAlign: 'left',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#CBD5E1', fontSize: '0.85rem', fontWeight: 500 }}>
                <CheckCircle2 size={16} color="#38BDF8" />
                <span>Smart Planning</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#CBD5E1', fontSize: '0.85rem', fontWeight: 500 }}>
                <CheckCircle2 size={16} color="#38BDF8" />
                <span>Actionable Steps</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#CBD5E1', fontSize: '0.85rem', fontWeight: 500 }}>
                <CheckCircle2 size={16} color="#38BDF8" />
                <span>Save as Task</span>
              </div>
            </div>
          </div>

          {/* When a plan is generated: Small box with task name inside right, hover scale-up, glow, and Eye Icon */}
          {plan && (
            <div
              className="ai-plan-box"
              onClick={() => setIsDetailsModalOpen(true)}
              title="Click to view full task details"
              style={{
                animation: 'stepSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Box Header Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#C084FC',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Sparkles size={13} color="#C084FC" />
                  GENERATED TASK PLAN
                </span>

                {(() => {
                  const pStyle = getPriorityStyle(plan.priority);
                  return (
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        backgroundColor: pStyle.bg,
                        border: `1px solid ${pStyle.border}`,
                        color: pStyle.color,
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      {pStyle.label}
                    </span>
                  );
                })()}
              </div>

              {/* Task Name inside box */}
              <h3
                style={{
                  fontSize: '1.18rem',
                  fontWeight: 800,
                  color: '#F8FAFC',
                  margin: '0 0 8px 0',
                  lineHeight: 1.3,
                }}
              >
                {plan.summary}
              </h3>

              {/* Meta Chips */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.8rem',
                  color: '#94A3B8',
                  marginBottom: '14px',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} color="#38BDF8" />
                  {plan.estimatedHours} hours
                </span>
                <span>•</span>
                <span>{plan.steps?.length || 0} actionable steps</span>
              </div>

              {/* View Eye Icon Option that appears on hover */}
              <div
                className="view-eye-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '9px 16px',
                  backgroundColor: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  borderRadius: '10px',
                  color: '#38BDF8',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  marginBottom: '12px',
                }}
              >
                <Eye size={16} />
                <span>View Plan Details</span>
              </div>

              {/* Quick Actions at bottom of box */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderTop: '1px solid rgba(103, 132, 255, 0.12)',
                  paddingTop: '12px',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={handleSaveAsTask}
                  disabled={isSaving || savedTaskId}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    background: savedTaskId
                      ? '#16A34A'
                      : 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: isSaving || savedTaskId ? 'default' : 'pointer',
                  }}
                >
                  {isSaving ? (
                    <Loader2 size={14} className="spin" />
                  ) : savedTaskId ? (
                    <Check size={14} />
                  ) : (
                    <BookmarkPlus size={14} />
                  )}
                  <span>{savedTaskId ? 'Saved to Tasks!' : 'Save as Task'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPlan(null);
                    setSavedTaskId(null);
                  }}
                  title="Clear plan"
                  style={{
                    padding: '8px 12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: '#CBD5E1',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Task Details Popup Modal (Matching Image 2) */}
      <AiPlanModal
        isOpen={isDetailsModalOpen}
        plan={plan}
        onClose={() => setIsDetailsModalOpen(false)}
        onSaveAsTask={handleSaveAsTask}
        isSaved={Boolean(savedTaskId)}
      />
    </div>
  );
}
