/**
 * Single user card
 *
 * @example
 * <UserCard user={{ id: '1', name: 'Alice', email: 'alice@ex.com', role: 'Admin', avatar: '👩‍💼' }} />
 */

import './users.css'

export function UserCard({ user }) {
  return (
    <div className="user-card card">
      <div className="user-card-avatar">{user.avatar || '👤'}</div>
      <div className="user-card-info">
        <h3 className="user-card-name">{user.name}</h3>
        <p className="user-card-email">{user.email}</p>
        <span className={`user-card-role role-${user.role?.toLowerCase()}`}>
          {user.role}
        </span>
      </div>
    </div>
  )
}
