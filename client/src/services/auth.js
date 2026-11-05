// Authentication State Management in LocalStorage

const TOKEN_KEY = 'quiz_auth_token';
const USER_KEY = 'quiz_auth_user';

export const authService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser() {
    const raw = localStorage.getItem(USER_KEY);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  setAuth(token, user) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.location.href = '/login';
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  isFaculty() {
    const user = this.getUser();
    return user && user.role === 'faculty';
  },

  isStudent() {
    const user = this.getUser();
    return user && user.role === 'student';
  }
};

