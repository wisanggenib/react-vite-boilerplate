/**
 * Home Page Component
 * Dashboard view for authenticated users
 */

import { env } from '../../../config/env'

export function HomePage() {
  const user = env.USER

  return (
    <div className="welcome-card card">
      <div className="greeting-label">Welcome</div>
      <h1 className="greeting">
        HI <span className="username">{user}</span>
      </h1>
      <p className="page-subtitle" style={{ marginTop: 'var(--space-4)' }}>
        This app uses <strong>Feature-Based Architecture</strong>
      </p>
      <div className="env-badge" style={{ marginTop: 'var(--space-4)' }}>
        <span className="badge-dot" />
        VITE_USER = {user}
      </div>
    </div>
  )
}
