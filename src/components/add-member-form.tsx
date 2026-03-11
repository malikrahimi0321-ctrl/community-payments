'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function AddMemberPage() {
  const router = useRouter()
  const supabase = createClient()

  const [fullName, setFullName] = useState('')
  const [status, setStatus] = useState('active')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const { error } = await supabase.from('members').insert({
      full_name: fullName,
      status,
    })

    if (error) {
      setError(error.message)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <main className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Add Member</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded border p-2"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button type="submit" className="rounded border px-4 py-2">
          Save Member
        </button>
      </form>
    </main>
  )
}