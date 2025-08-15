'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const supabase = createClient()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const raw = username.trim()
      const suffix = process.env.NEXT_PUBLIC_LOGIN_EMAIL_SUFFIX || '@gmail.com'
      const email = raw.includes('@') ? raw : `${raw}${suffix}`
      const { error: signErr } = await supabase.auth.signInWithPassword({ email, password })
      if (signErr) throw signErr
      // Clear outer marker; session cookies are set by auth-helpers client
      document.cookie = 'outer_ok=; Max-Age=0; Path=/; SameSite=Lax; Secure'
      window.location.href = '/trip/calendar'
    } catch (err: any) {
      setError(err?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="safe-area-pads min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm cute-card z-10">
        <h1 className="text-2xl mb-4 text-[color:var(--wood-900)] text-center">Sign in</h1>
        <label className="block mb-2 text-[color:var(--wood-900)]">Username</label>
        <input
          className="w-full mb-3 rounded border p-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="yourname"
          autoCapitalize="off"
        />
        <label className="block mb-2 text-[color:var(--wood-900)]">Password</label>
        <input
          className="w-full mb-4 rounded border p-3"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}
        <button className="w-full cute-button" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}


