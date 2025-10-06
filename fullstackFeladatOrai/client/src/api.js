import axios from 'axios'

const api = axios.create({
  baseURL: '/api'
})

export const UsersApi = {
  async list() {
    const { data } = await api.get('/users')
    return data
  },
  async create({ name, email }) {
    const { data } = await api.post('/users', { name, email })
    return data
  },
  async update(id, { name, email }) {
    const { data } = await api.put(`/users/${id}`, { name, email })
    return data
  },
  async remove(id) {
    const { data } = await api.delete(`/users/${id}`)
    return data
  }
}
