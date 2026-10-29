import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Folder, Clock, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import TaskCard from '../components/tasks/TaskCard';
import { SkeletonList } from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import { useTasks } from '../context/useTasks';
import logoAsset from '../assets/Logo.png';

export default function DashboardPage() {
  const navigate = useNavigate();
  const {
    tasks,
    loading,
    stats,
    searchQuery,
    toggleTaskStatus,
    openEditModal,
    openDeleteModal,
    openDetailsModal,
    openCreateModal,
  } = useTasks();

  const [activeFilter, setActiveFilter] = useState('all');

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
      .slice(0, 6);
  }, [tasks, activeFilter, searchQuery]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', width: '100%' }}>
      {/* 4 Metric / Stat Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon={Folder}
          badge="↑ 12%"
          color="purple"
          onClick={() => setActiveFilter('all')}
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={Clock}
          badge="↑ 2%"
          color="amber"
          onClick={() => setActiveFilter('pending')}
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={RefreshCw}
          badge="↑ 1%"
          color="blue"
          onClick={() => setActiveFilter('in-progress')}
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle2}
          badge="↑ 3%"
          color="green"
          onClick={() => setActiveFilter('completed')}
        />
      </div>

      {/* Main Content Split: Recent Tasks (Left) & AI Goals Banner (Right) */}
      <div className="dashboard-split-grid">
        {/* Left Column: Recent Tasks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#F8FAFC',
                  margin: '0 0 4px 0',
                }}
              >
                Recent Tasks
              </h2>
            </div>

            {/* Filter Pills */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#090D1B',
                padding: '4px',
                borderRadius: '10px',
                border: '1px solid rgba(103, 132, 255, 0.12)',
              }}
            >
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
                      padding: '6px 14px',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      color: isActive ? '#FFFFFF' : '#94A3B8',
                      backgroundColor: isActive ? '#3B82F6' : 'transparent',
                      transition: 'all 0.15s ease',
                      boxShadow: isActive ? '0 0 12px rgba(59, 130, 246, 0.4)' : 'none',
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Task List or States */}
          {loading ? (
            <SkeletonList count={4} />
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
              title={searchQuery ? 'No matching tasks' : 'No tasks in this category'}
              description={
                searchQuery
                  ? `No tasks match "${searchQuery}". Try a different keyword.`
                  : 'Start your productive day by creating a new task or generating one with AI.'
              }
              actionLabel="Create Task"
              onAction={openCreateModal}
            />
          )}
        </div>

        {/* Right Column: AI Goals Card Banner */}
        <div
          className="dashboard-banner-card"
          style={{
            background: 'linear-gradient(180deg, #0E162E 0%, #080D1D 100%)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '20px',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 24px rgba(139, 92, 246, 0.15)',
            boxSizing: 'border-box',
          }}
        >
          {/* Subtle aurora background */}
          <div
            style={{
              position: 'absolute',
              bottom: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '260px',
              height: '140px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.25) 0%, rgba(139, 92, 246, 0.3) 60%, transparent 80%)',
              filter: 'blur(30px)',
              pointerEvents: 'none',
            }}
          />

          {/* Glowing folded V logo */}
          <div
            style={{
              width: '76px',
              height: '76px',
              marginBottom: '22px',
              filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 35px rgba(34, 211, 238, 0.4))',
            }}
          >
            <img
              src={logoAsset}
              alt="VELTRIX AI"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>

          <h3
            style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              color: '#F8FAFC',
              margin: '0 0 8px 0',
              lineHeight: 1.25,
            }}
          >
            Your Goals <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #A855F7 0%, #38BDF8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Our Priority
            </span>
          </h3>

          <p
            style={{
              fontSize: '0.85rem',
              color: '#94A3B8',
              lineHeight: 1.5,
              margin: '0 0 24px 0',
              maxWidth: '240px',
            }}
          >
            Turn ideas into actionable plans with the power of AI.
          </p>

          <button
            type="button"
            onClick={() => navigate('/planner')}
            style={{
              width: '100%',
              padding: '11px 18px',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
              border: 'none',
              borderRadius: '12px',
              color: '#FFFFFF',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)',
              transition: 'all 0.2s ease',
            }}
          >
            <span>Open AI Planner</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
