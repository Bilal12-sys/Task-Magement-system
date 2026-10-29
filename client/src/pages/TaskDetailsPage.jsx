import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Target, Edit3, Trash2, Loader2 } from 'lucide-react';
import taskService from '../api/taskService';
import StatusBadge from '../components/ui/StatusBadge';
import { formatDate } from '../utils/date';
import { useTasks } from '../context/useTasks';

export default function TaskDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openEditModal, openDeleteModal } = useTasks();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await taskService.getTaskById(id);
        if (isMounted) setTask(data);
      } catch (err) {
        if (isMounted) setError(err.message || 'Task not found');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px',
          color: '#94A3B8',
          gap: '10px',
        }}
      >
        <Loader2 size={24} className="spin" color="#38BDF8" />
        <span>Loading task details...</span>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div
        style={{
          background: '#0D1325',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: '16px',
          padding: '40px 24px',
          textAlign: 'center',
          maxWidth: '500px',
          margin: '40px auto',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', color: '#F8FAFC', marginBottom: '8px' }}>
          Could not find task
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '20px' }}>
          {error || 'This task does not exist or was deleted.'}
        </p>
        <Link
          to="/tasks"
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
            borderRadius: '10px',
            color: '#FFFFFF',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '0.88rem',
          }}
        >
          Return to My Tasks
        </Link>
      </div>
    );
  }

  const priorityInfo = task.description?.toLowerCase().includes('high')
    ? { dot: '#F43F5E', label: 'High' }
    : task.description?.toLowerCase().includes('low')
    ? { dot: '#22C55E', label: 'Low' }
    : { dot: '#F59E0B', label: 'Medium' };

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'transparent',
          border: 'none',
          color: '#38BDF8',
          fontSize: '0.9rem',
          fontWeight: 600,
          cursor: 'pointer',
          padding: 0,
          width: 'fit-content',
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to My Tasks</span>
      </button>

      <div
        style={{
          background: '#0D1325',
          border: '1px solid rgba(103, 132, 255, 0.2)',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Title & Status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '8px',
          }}
        >
          <h1
            style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              color: '#F8FAFC',
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {task.title}
          </h1>
          <StatusBadge status={task.status} />
        </div>

        {/* Subtitle preview */}
        {task.description && (
          <div
            style={{
              fontSize: '0.88rem',
              color: '#94A3B8',
              marginBottom: '20px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {task.description.split('\n')[0]}
          </div>
        )}

        {/* 3-Column Metadata row (Matching Screenshot 2) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            padding: '16px 20px',
            backgroundColor: '#090D1B',
            borderRadius: '14px',
            border: '1px solid rgba(103, 132, 255, 0.12)',
            marginBottom: '28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} color="#38BDF8" />
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>DUE DATE</div>
              <div style={{ fontSize: '0.88rem', color: '#CBD5E1', fontWeight: 600 }}>
                {formatDate(task.dueDate)}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} color="#A78BFA" />
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>CREATED</div>
              <div style={{ fontSize: '0.88rem', color: '#CBD5E1', fontWeight: 600 }}>
                {formatDate(task.createdAt)}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={18} color={priorityInfo.dot} />
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>PRIORITY</div>
              <div
                style={{
                  fontSize: '0.88rem',
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

        {/* Description section */}
        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '0.85rem',
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
              fontSize: '0.95rem',
              lineHeight: 1.7,
              color: '#CBD5E1',
              backgroundColor: '#090D1B',
              padding: '18px 20px',
              borderRadius: '12px',
              border: '1px solid rgba(103, 132, 255, 0.08)',
              whiteSpace: 'pre-line',
              minHeight: '80px',
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
            paddingTop: '20px',
          }}
        >
          <button
            type="button"
            onClick={() => openEditModal(task)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '10px',
              color: '#F8FAFC',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Edit3 size={15} />
            <span>Edit</span>
          </button>

          <button
            type="button"
            onClick={() => {
              openDeleteModal(task);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              backgroundColor: 'rgba(244, 63, 94, 0.12)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: '10px',
              color: '#FDA4AF',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
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
