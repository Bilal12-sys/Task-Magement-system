import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import taskService from '../api/taskService';

export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Global search & filter state
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [taskModalState, setTaskModalState] = useState({ isOpen: false, task: null });
  const [deleteModalState, setDeleteModalState] = useState({ isOpen: false, task: null });
  const [detailsModalState, setDetailsModalState] = useState({ isOpen: false, task: null });

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
      addToast(err.message || 'Failed to load tasks from server', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Statistics calculated dynamically from backend data
  const stats = useMemo(() => {
    const total = tasks.length;
    const pending = tasks.filter((t) => t.status === 'pending').length;
    const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    return { total, pending, inProgress, completed };
  }, [tasks]);

  // CRUD actions
  const createTask = async (taskData) => {
    try {
      const created = await taskService.createTask(taskData);
      setTasks((prev) => [created, ...prev]);
      addToast('Task created successfully!', 'success');
      return created;
    } catch (err) {
      addToast(err.message || 'Failed to create task', 'error');
      throw err;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const updated = await taskService.updateTask(id, taskData);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
      addToast('Task updated successfully!', 'success');
      return updated;
    } catch (err) {
      addToast(err.message || 'Failed to update task', 'error');
      throw err;
    }
  };

  const toggleTaskStatus = async (task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      const updated = await taskService.updateTask(task._id, { status: newStatus });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? updated : t)));
      addToast(
        newStatus === 'completed' ? 'Task marked as completed! 🎉' : 'Task moved back to pending',
        'success'
      );
      return updated;
    } catch (err) {
      addToast(err.message || 'Failed to update task status', 'error');
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      addToast('Task deleted successfully', 'success');
    } catch (err) {
      addToast(err.message || 'Failed to delete task', 'error');
      throw err;
    }
  };

  // Modal helpers
  const openCreateModal = () => setTaskModalState({ isOpen: true, task: null });
  const openEditModal = (task) => setTaskModalState({ isOpen: true, task });
  const closeTaskModal = () => setTaskModalState({ isOpen: false, task: null });

  const openDeleteModal = (task) => setDeleteModalState({ isOpen: true, task });
  const closeDeleteModal = () => setDeleteModalState({ isOpen: false, task: null });

  const openDetailsModal = (task) => setDetailsModalState({ isOpen: true, task });
  const closeDetailsModal = () => setDetailsModalState({ isOpen: false, task: null });

  const value = {
    tasks,
    loading,
    error,
    stats,
    searchQuery,
    setSearchQuery,
    fetchTasks,
    createTask,
    updateTask,
    toggleTaskStatus,
    deleteTask,
    // Modals
    taskModalState,
    openCreateModal,
    openEditModal,
    closeTaskModal,
    deleteModalState,
    openDeleteModal,
    closeDeleteModal,
    detailsModalState,
    openDetailsModal,
    closeDetailsModal,
    // Toasts
    toasts,
    addToast,
    removeToast,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}

export default TaskContext;
