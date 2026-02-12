/**
 * Auth feature — Public API (barrel file)
 *
 * Consumers should import from here, not from internal paths:
 *   import { LoginForm, useAuth, AuthGuard } from '@/features/auth'
 */

export { LoginForm } from './components/LoginForm'
export { RegisterForm } from './components/RegisterForm'
export { AuthGuard } from './components/AuthGuard'
export { useAuth } from './hooks/useAuth' // Adapter for Zustand
export { useLogin } from './hooks/useLogin'
// export { authService } from './services/authService' // Service bypassed/integrated in store
// export { tokenManager } from './utils/tokenManager' // Token manager bypassed (in-memory)
export { AUTH_CONSTANTS } from './constants'
export { AUTH_ROLES } from './types/auth.types'
