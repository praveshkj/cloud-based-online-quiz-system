import { authService } from './auth';

const BASE_URL = '/api';

async function request(endpoint, options = {}) {
  const token = authService.getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        // If expired or invalid token on protected call
        if (token && endpoint !== '/auth/login' && endpoint !== '/auth/register') {
          console.warn('Session expired or unauthorized. Logging out.');
          // Optional: authService.logout();
        }
      }
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error on [${options.method || 'GET'} ${endpoint}]:`, error.message);
    throw error;
  }
}

export const api = {
  // Auth API
  auth: {
    login: (credentials) => request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),
    register: (userData) => request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),
    getProfile: () => request('/auth/me')
  },

  // Quizzes API
  quizzes: {
    getAll: () => request('/quizzes'),
    getById: (id) => request(`/quizzes/${id}`),
    create: (quizData) => request('/quizzes', {
      method: 'POST',
      body: JSON.stringify(quizData)
    }),
    update: (id, quizData) => request(`/quizzes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(quizData)
    }),
    delete: (id) => request(`/quizzes/${id}`, {
      method: 'DELETE'
    }),
    toggleStatus: (id) => request(`/quizzes/${id}/status`, {
      method: 'PATCH'
    }),
    submit: (id, answers) => request(`/quizzes/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers })
    })
  },

  // Results API
  results: {
    getMyResults: () => request('/results/my-results'),
    getAll: (quizId) => request(`/results/all${quizId ? `?quizId=${quizId}` : ''}`),
    getById: (id) => request(`/results/${id}`)
  },

  // Dashboard API
  dashboard: {
    getStats: () => request('/dashboard/stats')
  },

  // Health API
  health: {
    check: () => request('/health')
  }
};

