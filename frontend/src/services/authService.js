// src/services/authService.js 
import axios from 'axios';


const API_BASE_URL = 'http://localhost:5000';

export const register = (formData) => axios.post(`${API_BASE_URL}/api/auth/register`, formData);

export const login = (formData) => axios.post(`${API_BASE_URL}/api/auth/login`, formData);

export const getProfile = (token) => axios.get(`${API_BASE_URL}/api/auth/profile`, {
  headers: { Authorization: `Bearer ${token}` }
});
