import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const register = async (username, password, bio, age, gender) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      password,
      bio,
      age,
      gender,
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getToken = () => localStorage.getItem('token');

export const logout = () => {
  localStorage.removeItem('token');
};
