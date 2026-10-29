import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileNav from './MobileNav';
import TaskModal from '../tasks/TaskModal';
import DeleteModal from '../tasks/DeleteModal';
import TaskDetailsModal from '../tasks/TaskDetailsModal';
import Toast from '../ui/Toast';
import { useTasks } from '../../context/useTasks';

export default function Shell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const {
    taskModalState,
    closeTaskModal,
    createTask,
    updateTask,
    deleteModalState,
    closeDeleteModal,
    deleteTask,
    detailsModalState,
    closeDetailsModal,
    openEditModal,
    openDeleteModal,
    toasts,
    removeToast,
  } = useTasks();

  const handleSaveTask = async (idOrPayload, payload) => {
    if (typeof idOrPayload === 'string') {
      return await updateTask(idOrPayload, payload);
    }
    return await createTask(idOrPayload);
  };

  return (
    <div className="app-container">
      {/* Desktop & Mobile Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => {
          if (window.innerWidth <= 768) {
            setSidebarOpen(!sidebarOpen);
          } else {
            setSidebarCollapsed(!sidebarCollapsed);
          }
        }}
      />

      {/* Main Content Area */}
      <div className={`app-main-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main
          style={{
            flex: 1,
            padding: '28px',
            maxWidth: '1440px',
            width: '100%',
            boxSizing: 'border-box',
            margin: '0 auto',
            paddingBottom: '80px',
          }}
        >
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Modals */}
      <TaskModal
        isOpen={taskModalState.isOpen}
        task={taskModalState.task}
        onClose={closeTaskModal}
        onSave={handleSaveTask}
      />

      <DeleteModal
        isOpen={deleteModalState.isOpen}
        task={deleteModalState.task}
        onClose={closeDeleteModal}
        onConfirm={deleteTask}
      />

      <TaskDetailsModal
        isOpen={detailsModalState.isOpen}
        task={detailsModalState.task}
        onClose={closeDetailsModal}
        onEdit={(task) => openEditModal(task)}
        onDelete={(task) => openDeleteModal(task)}
      />

      {/* Global Floating Toasts */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
