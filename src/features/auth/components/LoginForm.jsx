/**
 * Login Form component
 * Redirects to home if already authenticated
 */

import { useEffect } from 'react'
import { useLogin } from '../hooks/useLogin'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../../../shared/components/ui/Button'
import { Input } from '../../../shared/components/ui/Input'
import './auth.css'

export function LoginForm({ onSuccess }) {
  const { isAuthenticated } = useAuth()
  const { email, password, setEmail, setPassword, handleSubmit, loading, error } = useLogin()

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (isAuthenticated) {
      onSuccess?.()
    }
  }, [isAuthenticated, onSuccess])

  const onSubmit = async (e) => {
    await handleSubmit(e)
    onSuccess?.()
  }

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <h2 className="auth-form-title">Login</h2>
      <p className="auth-form-subtitle">Sign in to your account</p>

      {error && <div className="auth-error">{error}</div>}

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit" variant="primary" size="lg" loading={loading}>
        Sign In
      </Button>
    </form>
  )
}
