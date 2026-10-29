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

export const requestTaskPlan = async (
  apiKey,
  description,
  fetchImpl = fetch,
  model = process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash',
) => {
  let response;

  try {
    response = await fetchImpl('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content:
              'Create a practical task plan. Reply only with a JSON object containing summary (short string), priority (low, medium, or high), estimatedHours (positive number), and steps (array of actionable strings).',
          },
          { role: 'user', content: description },
        ],
        response_format: { type: 'json_object' },
        max_tokens: 500,
        temperature: 0.2,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      const providerMessage =
        typeof result?.error?.message === 'string'
          ? result.error.message
          : 'Unknown provider error';
      const error = new Error(providerMessage);
      error.statusCode = response.status;
      throw error;
    }

    const content = result?.choices?.[0]?.message?.content;

    if (typeof content !== 'string') {
      throw invalidPlanError();
    }

    return parseTaskPlan(content);
  } catch (providerError) {
    if (providerError.statusCode === HTTP_STATUS.BAD_GATEWAY) {
      throw providerError;
    }

    const statusCode = providerError.statusCode;
    console.error(
      `OpenRouter request failed${statusCode ? ` (${statusCode})` : ''}: ${providerError.message}`,
    );
    const errorMessage =
      statusCode === 402
        ? 'OpenRouter account has insufficient credits'
        : statusCode === 429
          ? 'OpenRouter rate limit exceeded'
          : statusCode === HTTP_STATUS.SERVICE_UNAVAILABLE
            ? 'OpenRouter is temporarily unavailable'
            : 'OpenRouter provider request failed';
    const error = new Error(errorMessage);
    error.statusCode =
      statusCode === 402 ||
      statusCode === 429 ||
      statusCode === HTTP_STATUS.SERVICE_UNAVAILABLE
        ? HTTP_STATUS.SERVICE_UNAVAILABLE
        : HTTP_STATUS.BAD_GATEWAY;
    throw error;
  }
};

const createTaskPlan = async (description) => {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.TASK_AI_API;

  if (!apiKey) {
    const error = new Error('OpenRouter API key is not configured');
    error.statusCode = HTTP_STATUS.SERVICE_UNAVAILABLE;
    throw error;
  }

  return requestTaskPlan(apiKey, description);
};

export default createTaskPlan;
