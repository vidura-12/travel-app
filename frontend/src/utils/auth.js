// src/utils/auth.js

export function isAuthenticated() {
  const token = localStorage.getItem('token');
  // Basic check: if token exists
  return token !== null;
}

export function getRole() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded.role; // Return the role from the token
    } catch (error) {
      console.error('Failed to decode token', error);
    }
  }
  return null;
}
