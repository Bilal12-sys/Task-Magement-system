import { useMemo } from 'react';
import { CheckCircle2 } from 'lucide-react';
import TaskCard from '../components/tasks/TaskCard';
import { SkeletonList } from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import { useTasks } from '../context/useTasks';

export default function CompletedTasksPage() {
  const {
    tasks,
    loading,
    searchQuery,
    toggleTaskStatus,
    openEditModal,
    openDeleteModal,
    openDetailsModal,
    openCreateModal,
  } = useTasks();

  const completedTasks = useMemo(() => {
    return tasks.filter((t) => {
      const isCompleted = t.status === 'completed';
      const matchesSearch = searchQuery
        ? `${t.title} ${t.description || ''}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        : true;
      return isCompleted && matchesSearch;
    });
  }, [tasks, searchQuery]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <CheckCircle2 size={20} color="#22C55E" />
            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#F8FAFC',
                margin: 0,
              }}
            >
              Completed Tasks
            </h1>
          </div>
          <p
            style={{
              fontSize: '0.85rem',
              color: '#94A3B8',
              margin: 0,
            }}
          >
            Review what you've accomplished and stay motivated.
          </p>
        </div>

        {/* Milestone Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'rgba(34, 197, 94, 0.12)',
            border: '1px solid rgba(34, 197, 94, 0.28)',
            padding: '8px 16px',
            borderRadius: '12px',
          }}
        >
          <div
            style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#4ADE80',
            }}
          >
            {completedTasks.length}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#86EFAC', fontWeight: 600 }}>
            Tasks Completed
          </div>
        </div>
      </div>

      {/* Task List */}
      {loading ? (
        <SkeletonList count={4} />
      ) : completedTasks.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {completedTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggleStatus={toggleTaskStatus}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
              onDetails={openDetailsModal}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={searchQuery ? 'No matching completed tasks' : 'No completed tasks yet'}
          description={
            searchQuery
              ? `No completed tasks match "${searchQuery}".`
              : 'Complete your active tasks to see them celebrated here.'
          }
          actionLabel="Go to My Tasks"
          onAction={openCreateModal}
          icon={CheckCircle2}
        />
      )}
    </div>
  );
}
