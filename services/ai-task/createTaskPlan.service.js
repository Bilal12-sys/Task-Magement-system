import { InferenceClient } from '@huggingface/inference';
import HTTP_STATUS from '../../constants/httpStatus.js';

const invalidPlanError = () => {
  const error = new Error('AI provider returned an invalid response');
  error.statusCode = HTTP_STATUS.BAD_GATEWAY;
  return error;
};

export const parseTaskPlan = (content) => {
  let plan;

  try {
    plan = JSON.parse(content);
  } catch {
    throw invalidPlanError();
  }

  const isValid =
    plan !== null &&
    typeof plan === 'object' &&
    !Array.isArray(plan) &&
    typeof plan.summary === 'string' &&
    plan.summary.trim() !== '' &&
    ['low', 'medium', 'high'].includes(plan.priority) &&
    Number.isFinite(plan.estimatedHours) &&
    plan.estimatedHours > 0 &&
    Array.isArray(plan.steps) &&
    plan.steps.length > 0 &&
    plan.steps.every((step) => typeof step === 'string' && step.trim());

  if (!isValid) {
    throw invalidPlanError();
  }

  return {
    summary: plan.summary.trim(),
    priority: plan.priority,
    estimatedHours: plan.estimatedHours,
    steps: plan.steps.map((step) => step.trim()),
  };
};

export const requestTaskPlan = async (client, description) => {
  let response;

  try {
    response = await client.chatCompletion({
      model: 'Qwen/Qwen3-32B',
      provider: 'cerebras',
      messages: [
        {
          role: 'system',
          content:
            'Create a practical task plan. Reply only with a JSON object containing summary (short string), priority (low, medium, or high), estimatedHours (positive number), and steps (array of actionable strings).',
        },
        { role: 'user', content: description },
      ],
      max_tokens: 500,
      temperature: 0.2,
    });
  } catch {
    const error = new Error('AI provider request failed');
    error.statusCode = HTTP_STATUS.BAD_GATEWAY;
    throw error;
  }

  const content = response?.choices?.[0]?.message?.content;

  if (typeof content !== 'string') {
    throw invalidPlanError();
  }

  return parseTaskPlan(content);
};

const createTaskPlan = async (description) => {
  const apiKey = process.env.TASK_AI_API;

  if (!apiKey) {
    const error = new Error('AI API key is not configured');
    error.statusCode = HTTP_STATUS.SERVICE_UNAVAILABLE;
    throw error;
  }

  return requestTaskPlan(new InferenceClient(apiKey), description);
};

export default createTaskPlan;
