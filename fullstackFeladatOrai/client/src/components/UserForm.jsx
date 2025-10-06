import { useState } from 'react'

export default function UserForm({ onCreate }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setBusy(true)
    await onCreate({ name: name.trim(), email: email.trim() })
    setName('')
    setEmail('')
    setBusy(false)
  }

  return (
    <form className="row" onSubmit={submit}>
      <input className="input" placeholder="Név" value={name} onChange={e => setName(e.target.value)} />
      <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <button className="button" disabled={busy}>{busy ? 'Hozzáadás…' : 'Hozzáadás'}</button>
    </form>
  )
}
