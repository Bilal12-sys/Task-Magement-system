import apiClient from './client.js';

export const aiService = {
  async planTask(description, options = {}) {
    if (!description || !description.trim()) {
      throw new Error('Please describe what you want to accomplish.');
    }
    const data = await apiClient('/ai/plan-task', {
      method: 'POST',
      body: { description: description.trim() },
      signal: options.signal,
      timeout: 30000, // AI plan generation can take 5-15s
    });

    if (!data?.plan) {
      throw new Error('Invalid AI response received from server.');
    }

    return data.plan;
  },
};

export default aiService;
