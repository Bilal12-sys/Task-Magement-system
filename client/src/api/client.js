const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:1000/api').replace(/\/+$/, '');

export class ApiError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export async function apiClient(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const controller = new AbortController();
  const timeoutMs = options.timeout || 15000;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  // If external signal is provided (e.g. user clicks cancel), hook into it
  if (options.signal) {
    if (options.signal.aborted) {
      controller.abort();
    } else {
      options.signal.addEventListener('abort', () => controller.abort(), { once: true });
    }
  }

  const config = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    signal: controller.signal,
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const res = await fetch(url, config);

    if (res.status === 204) {
      return null;
    }

    let data;
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await res.json().catch(() => null);
    } else {
      const text = await res.text().catch(() => '');
      data = text ? { message: text } : null;
    }

    if (!res.ok) {
      const message =
        data?.message ||
        (Array.isArray(data?.details) ? data.details.map(d => d.message).join(', ') : null) ||
        `Request failed with status ${res.status}`;
      throw new ApiError(message, res.status, data);
    }

    return data;
  } catch (err) {
    if (err.name === 'AbortError') {
      if (options.signal?.aborted) {
        throw new ApiError('Request was cancelled by user', 499);
      }
      throw new ApiError('Request timed out. Please check your network and try again.', 408);
    }
    if (err instanceof ApiError) {
      throw err;
    }
    // Failed to fetch / Network error
    throw new ApiError(
      err.message === 'Failed to fetch'
        ? 'Cannot reach the backend server. Make sure it is running on ' + BASE_URL
        : err.message || 'Network request failed',
      0
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

export default apiClient;
