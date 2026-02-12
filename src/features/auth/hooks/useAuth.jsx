import { useAuthStore } from '../../../store/authStore'

/**
 * useAuth hook adapter
 * Keeps the API consistent but uses Zustand store under the hood
 */
export function useAuth() {
  const { user, isAuthenticated, login, logout } = useAuthStore()
  return { user, isAuthenticated, login, logout }
}

/**
 * Deprecated: AuthProvider is no longer needed with Zustand
 * Kept strictly for backward compatibility if needed, but should be removed from usage.
 */
export function AuthProvider({ children }) {
  return <>{children}</>
}
