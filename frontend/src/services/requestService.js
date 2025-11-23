import api from './api'

export const requestService = {
  getRequests: async (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return await api.get(`/requests?${query}`)
  },

  getRequest: async (id) => {
    return await api.get(`/requests/${id}`)
  },

  createRequest: async (data) => {
    return await api.post('/requests', data)
  },

  updateRequestStatus: async (id, data) => {
    return await api.put(`/requests/${id}/status`, data)
  },

  cancelRequest: async (id) => {
    return await api.put(`/requests/${id}/cancel`)
  },

  getRequestStats: async () => {
    return await api.get('/requests/stats')
  }
}
