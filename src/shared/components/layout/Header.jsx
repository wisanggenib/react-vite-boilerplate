/**
 * App Header — fixed top bar
 *
 * @example
 * <Header user="Bagus" />
 */

import { env } from '../../../config/env'
import './layout.css'

export function Header() {
  const user = env.USER

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-logo">⚛️ React App</h1>
      </div>
      <div className="header-right">
        <div className="env-badge">
          <span className="badge-dot" />
          VITE_USER = {user}
        </div>
        <div className="header-avatar">
          {user.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  )
}
