import apiClient from './client.js';

export const taskService = {
  async getTasks() {
    const data = await apiClient('/tasks');
    // Normalize in case backend returns array directly or { tasks: [...] }
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.tasks)) return data.tasks;
    return [];
  },

  async getTaskById(id) {
    if (!id) throw new Error('Task ID is required');
    return await apiClient(`/tasks/${id}`);
  },

  async createTask(taskData) {
    const payload = {
      title: taskData.title?.trim(),
      description: taskData.description?.trim() || '',
      status: taskData.status || 'pending',
    };
    if (taskData.dueDate) {
      payload.dueDate = new Date(taskData.dueDate).toISOString();
    }
    return await apiClient('/tasks', {
      method: 'POST',
      body: payload,
    });
  },

  async updateTask(id, taskData) {
    if (!id) throw new Error('Task ID is required');
    const payload = {};
    if (taskData.title !== undefined) payload.title = taskData.title.trim();
    if (taskData.description !== undefined) payload.description = taskData.description.trim();
    if (taskData.status !== undefined) payload.status = taskData.status;
    if (taskData.dueDate !== undefined) {
      payload.dueDate = taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null;
    }

    return await apiClient(`/tasks/${id}`, {
      method: 'PUT',
      body: payload,
    });
  },

  async deleteTask(id) {
    if (!id) throw new Error('Task ID is required');
    return await apiClient(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};

export default taskService;
