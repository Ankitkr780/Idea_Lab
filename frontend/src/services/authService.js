import api from './api'

export const authService = {
  register: async (userData) => {
    return await api.post('/auth/register', userData)
  },

  login: async (email, password) => {
    return await api.post('/auth/login', { email, password })
  },

  getCurrentUser: async () => {
    return await api.get('/auth/me')
  },

  updateProfile: async (data) => {
    return await api.put('/auth/profile', data)
  }
}
