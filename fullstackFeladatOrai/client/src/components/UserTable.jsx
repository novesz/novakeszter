import { useState } from 'react'

export default function UserTable({ users, onUpdate, onDelete }) {
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({ name: '', email: '' })
  const [busy, setBusy] = useState(false)

  function startEdit(u) {
    setEditId(u.id)
    setForm({ name: u.name, email: u.email })
  }
  function cancel() {
    setEditId(null); setForm({ name: '', email: '' })
  }

  async function save() {
    setBusy(true)
    await onUpdate(editId, form)
    setBusy(false)
    cancel()
  }

  if (!users?.length) return <p className="badge">Nincs még felhasználó.</p>

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th><th>Név</th><th>Email</th><th>Műveletek</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>
              {editId === u.id ? (
                <input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              ) : u.name}
            </td>
            <td>
              {editId === u.id ? (
                <input className="input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              ) : u.email}
            </td>
            <td>
              {editId === u.id ? (
                <>
                  <button className="button" onClick={save} disabled={busy}>{busy ? 'Mentés…' : 'Mentés'}</button>
                  <button className="button" onClick={cancel}>Mégse</button>
                </>
              ) : (
                <>
                  <button className="button" onClick={() => startEdit(u)}>Szerk.</button>
                  <button className="button" onClick={() => onDelete(u.id)}>Törlés</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
