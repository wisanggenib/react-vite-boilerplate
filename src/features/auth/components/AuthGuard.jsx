/**
 * AuthGuard — protects routes that require authentication
 * Redirects to login if not authenticated
 */

import { useEffect } from 'react'
import { useAuthStore } from '../../../store/authStore'

export function AuthGuard({ children, onNavigate }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) {
      onNavigate('login')
    }
  }, [isAuthenticated, onNavigate])

  if (!isAuthenticated) {
    return null // Render nothing while redirecting
  }

  return children
}
