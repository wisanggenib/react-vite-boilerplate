/**
 * Register Form component
 * Redirects to home if already authenticated
 */

import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../../../shared/components/ui/Button'
import { Input } from '../../../shared/components/ui/Input'
import { isEmail, minLength } from '../../../shared/utils/validator'
import { AUTH_CONSTANTS } from '../constants'
import './auth.css'

export function RegisterForm({ onSuccess }) {
  const { login, isAuthenticated } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (isAuthenticated) {
      onSuccess?.()
    }
  }, [isAuthenticated, onSuccess])

  const validate = () => {
    const errs = {}
    if (!name.trim()) errs.name = 'Name is required'
    if (!isEmail(email)) errs.email = 'Valid email is required'
    if (!minLength(password, AUTH_CONSTANTS.MIN_PASSWORD_LENGTH)) {
      errs.password = `Min ${AUTH_CONSTANTS.MIN_PASSWORD_LENGTH} characters`
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      await login({ email, password })
      onSuccess?.()
    } catch (err) {
      setErrors({ form: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-form-title">Register</h2>
      <p className="auth-form-subtitle">Create a new account</p>

      {errors.form && <div className="auth-error">{errors.form}</div>}

      <Input
        label="Full Name"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />

      <Button type="submit" variant="primary" size="lg" loading={loading}>
        Create Account
      </Button>
    </form>
  )
}
