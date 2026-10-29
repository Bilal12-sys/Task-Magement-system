import { useState, useMemo } from 'react';
import { Plus, ArrowUpDown, Filter } from 'lucide-react';
import TaskCard from '../components/tasks/TaskCard';
import { SkeletonList } from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import { useTasks } from '../context/useTasks';

export default function MyTasksPage() {
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

  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        const matchesFilter =
          activeFilter === 'all' ? true : t.status === activeFilter;
        const matchesSearch = searchQuery
          ? `${t.title} ${t.description || ''}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          : true;
        return matchesFilter && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'due') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        // Newest created first
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      });
  }, [tasks, activeFilter, searchQuery, sortBy]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Title & Controls */}
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
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: '#F8FAFC',
              margin: '0 0 4px 0',
            }}
          >
            My Tasks
          </h1>
          <p
            style={{
              fontSize: '0.85rem',
              color: '#94A3B8',
              margin: 0,
            }}
          >
            Manage your tasks and stay on track.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
            border: 'none',
            borderRadius: '10px',
            color: '#FFFFFF',
            fontSize: '0.88rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(139, 92, 246, 0.35)',
          }}
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Create Task</span>
        </button>
      </div>

      {/* Filter and Sort Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          padding: '14px 18px',
          backgroundColor: '#0D1325',
          border: '1px solid rgba(103, 132, 255, 0.12)',
          borderRadius: '14px',
        }}
      >
        {/* Status Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'pending', label: 'Pending' },
            { id: 'in-progress', label: 'In Progress' },
            { id: 'completed', label: 'Completed' },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  backgroundColor: isActive ? '#3B82F6' : 'rgba(255, 255, 255, 0.04)',
                  transition: 'all 0.15s ease',
                  boxShadow: isActive ? '0 0 12px rgba(59, 130, 246, 0.35)' : 'none',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowUpDown size={15} color="#94A3B8" />
          <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 500 }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#090D1B',
              border: '1px solid rgba(103, 132, 255, 0.2)',
              borderRadius: '8px',
              color: '#F8FAFC',
              fontSize: '0.82rem',
              fontWeight: 500,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="newest">Newest first</option>
            <option value="due">Due date</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      {loading ? (
        <SkeletonList count={5} />
      ) : filteredTasks.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filteredTasks.map((task) => (
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
          title={searchQuery ? 'No matching tasks' : 'No tasks to display'}
          description={
            searchQuery
              ? `No tasks found matching "${searchQuery}".`
              : activeFilter !== 'all'
              ? `You don't have any tasks marked as ${activeFilter}.`
              : 'Your task list is clear! Plan a new project or create a task.'
          }
          actionLabel="Create Task"
          onAction={openCreateModal}
          icon={Filter}
        />
      )}
    </div>
  );
}
