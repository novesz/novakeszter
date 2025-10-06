import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import UserForm from './components/UserForm.jsx'
import UserTable from './components/UserTable.jsx'
import ErrorBox from './components/ErrorBox.jsx'
import Loader from './components/Loader.jsx'
import { UsersApi } from './api.js'

export default function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    try {
      setLoading(true)
      setError('')
      const data = await UsersApi.list()
      setUsers(data)
    } catch (e) {
      setError(e.message || String(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function createUser(payload) {
    await UsersApi.create(payload)
    await load()
  }
  async function updateUser(id, payload) {
    await UsersApi.update(id, payload)
    await load()
  }
  async function deleteUser(id) {
    await UsersApi.remove(id)
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  return (
    <div className="container">
      <Header />
      <div className="card grid">
        <UserForm onCreate={createUser} />
        {loading ? <Loader /> : <UserTable users={users} onUpdate={updateUser} onDelete={deleteUser} />}
        <ErrorBox message={error} />
      </div>
      <footer>
        <a href="http://localhost:3001/api/health" target="_blank" rel="noreferrer">API health</a>
      </footer>
    </div>
  )
}
