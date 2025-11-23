import api from './api'

export const itemService = {
  getItems: async (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return await api.get(`/items?${query}`)
  },

  getItem: async (id) => {
    return await api.get(`/items/${id}`)
  },

  createItem: async (formData) => {
    return await api.post('/items', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  updateItem: async (id, formData) => {
    return await api.put(`/items/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  deleteItem: async (id) => {
    return await api.delete(`/items/${id}`)
  },

  getMyItems: async () => {
    return await api.get('/items/my/items')
  }
}
