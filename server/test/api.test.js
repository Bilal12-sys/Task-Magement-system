import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { Task } from '../models/task.model.js';
import app from '../server.js';
import {
  parseTaskPlan,
  requestTaskPlan,
} from '../services/ai-task/createTaskPlan.service.js';

let server;
let baseUrl;

before(async () => {
  server = app.listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

const request = (path, method = 'GET', body) =>
  fetch(`${baseUrl}${path}`, {
    method,
    headers: body ? { 'content-type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  });

test('GET /api/tasks returns all tasks', async (context) => {
  const tasks = [{ _id: 'task-1', title: 'Write tests' }];
  context.mock.method(Task, 'find', () => ({
    sort: async () => tasks,
  }));

  const response = await request('/api/tasks');
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), tasks);
});

test('GET /api/tasks/:id returns a task, 404 if missing, and 400 for an invalid ID', async (context) => {
  const taskId = '507f1f77bcf86cd799439011';
  const task = { _id: taskId, title: 'Write tests' };
  context.mock.method(Task, 'findById', async (id) =>
    id === taskId ? task : null,
  );

  const found = await request(`/api/tasks/${taskId}`);
  assert.equal(found.status, 200);
  assert.deepEqual(await found.json(), task);

  const missing = await request('/api/tasks/507f1f77bcf86cd799439012');
  assert.equal(missing.status, 404);

  const invalid = await request('/api/tasks/not-an-id');
  assert.equal(invalid.status, 400);
});

test('POST /api/tasks creates a task and validates required fields', async (context) => {
  const task = { _id: 'task-1', title: 'Write tests', status: 'pending' };
  context.mock.method(Task, 'create', async () => task);

  const created = await request('/api/tasks', 'POST', {
    title: 'Write tests',
  });
  assert.equal(created.status, 201);
  assert.deepEqual(await created.json(), task);

  const invalid = await request('/api/tasks', 'POST', { title: '' });
  assert.equal(invalid.status, 400);
});

test('PUT and PATCH /api/tasks/:id update a task and return 404 when missing', async (context) => {
  const taskId = '507f1f77bcf86cd799439011';
  const task = { _id: taskId, title: 'Updated task' };
  context.mock.method(Task, 'findByIdAndUpdate', async (id) =>
    id === taskId ? task : null,
  );

  const updated = await request(`/api/tasks/${taskId}`, 'PUT', {
    title: 'Updated task',
  });
  assert.equal(updated.status, 200);
  assert.deepEqual(await updated.json(), task);

  const patched = await request(`/api/tasks/${taskId}`, 'PATCH', {
    title: 'Updated task',
  });
  assert.equal(patched.status, 200);
  assert.deepEqual(await patched.json(), task);

  const missing = await request(
    '/api/tasks/507f1f77bcf86cd799439012',
    'PUT',
    { title: 'Updated task' },
  );
  assert.equal(missing.status, 404);

  const invalidId = await request('/api/tasks/not-an-id', 'PUT', {
    title: 'Updated task',
  });
  assert.equal(invalidId.status, 400);
});

test('DELETE /api/tasks/:id deletes a task and returns 404 when missing', async (context) => {
  const taskId = '507f1f77bcf86cd799439011';
  context.mock.method(Task, 'findByIdAndDelete', async (id) =>
    id === taskId ? { _id: taskId } : null,
  );

  const deleted = await request(`/api/tasks/${taskId}`, 'DELETE');
  assert.equal(deleted.status, 204);

  const missing = await request(
    '/api/tasks/507f1f77bcf86cd799439012',
    'DELETE',
  );
  assert.equal(missing.status, 404);
});

test('POST /api/ai/plan-task validates descriptions and reports missing API key', async () => {
  const previousApiKey = process.env.TASK_AI_API;
  delete process.env.TASK_AI_API;

  try {
    const emptyDescription = await request('/api/ai/plan-task', 'POST', {
      description: ' ',
    });

    test('AI route is mounted at /api/ai/plan-task', async () => {
      const response = await request('/api/ai/plan-task', 'GET');
      assert.equal(response.status, 404);
      assert.deepEqual(await response.json(), { message: 'Route not found' });
    });
    assert.equal(emptyDescription.status, 400);

    const missingApiKey = await request('/api/ai/plan-task', 'POST', {
      description: 'Build a portfolio website',
    });
    assert.equal(missingApiKey.status, 503);
  } finally {
    if (previousApiKey === undefined) {
      delete process.env.TASK_AI_API;
    } else {
      process.env.TASK_AI_API = previousApiKey;
    }
  }
});

test('AI plan parser accepts valid output and rejects invalid output', () => {
  const plan = parseTaskPlan(
    JSON.stringify({
      summary: 'Build a portfolio.',
      priority: 'high',
      estimatedHours: 12,
      steps: ['Plan pages', 'Build and test'],
    }),
  );

  assert.equal(plan.summary, 'Build a portfolio.');
  assert.deepEqual(plan.steps, ['Plan pages', 'Build and test']);
  assert.throws(
    () => parseTaskPlan('not JSON'),
    { statusCode: 502 },
  );
  assert.throws(
    () =>
      parseTaskPlan(
        JSON.stringify({
          summary: 'Task',
          priority: 'urgent',
          estimatedHours: 0,
          steps: [],
        }),
      ),
    { statusCode: 502 },
  );
});

test('AI service returns the generated plan and reports provider failures', async () => {
  const expectedPlan = {
    summary: 'Build a portfolio.',
    priority: 'high',
    estimatedHours: 12,
    steps: ['Plan pages', 'Build and test'],
  };
  const mockFetch = async (url, options) => {
    assert.equal(url, 'https://openrouter.ai/api/v1/chat/completions');
    assert.equal(options.headers.Authorization, 'Bearer test-key');
    const requestData = JSON.parse(options.body);
    assert.equal(requestData.model, 'google/gemini-2.5-flash');
    assert.equal(requestData.messages[1].content, 'Build a portfolio');
    assert.deepEqual(requestData.response_format, { type: 'json_object' });
    return {
      ok: true,
      json: async () => ({
        choices: [{ message: { content: JSON.stringify(expectedPlan) } }],
      }),
    };
  };

  assert.deepEqual(
    await requestTaskPlan('test-key', 'Build a portfolio', mockFetch),
    expectedPlan,
  );

  await assert.rejects(
    requestTaskPlan(
      'test-key',
      'Build a portfolio',
      async () => {
        throw new Error('provider details');
      },
    ),
    { statusCode: 502, message: 'OpenRouter provider request failed' },
  );
});

test('AI service reports OpenRouter credit errors clearly', async () => {
  await assert.rejects(
    requestTaskPlan(
      'test-key',
      'Build a portfolio',
      async () => ({
        ok: false,
        status: 402,
        json: async () => ({ error: { message: 'Insufficient credits' } }),
      }),
    ),
    {
      statusCode: 503,
      message: 'OpenRouter account has insufficient credits',
    },
  );
});
