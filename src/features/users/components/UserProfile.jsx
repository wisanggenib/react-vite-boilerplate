/**
 * User profile card
 *
 * @example
 * <UserProfile user={{ name: 'Alice', email: 'alice@ex.com', avatar: '👩‍💼', role: 'Admin' }} />
 */

import './users.css'

export function UserProfile({ user }) {
  if (!user) return null

  return (
    <div className="user-profile card">
      <div className="user-profile-avatar">{user.avatar || '👤'}</div>
      <h2 className="user-profile-name">{user.name}</h2>
      <p className="user-profile-email">{user.email}</p>
      <div className="user-profile-meta">
        <div className="user-profile-meta-item">
          <div className="user-profile-meta-value">{user.role}</div>
          <div className="user-profile-meta-label">Role</div>
        </div>
        <div className="user-profile-meta-item">
          <div className="user-profile-meta-value">{user.joinedAt || '-'}</div>
          <div className="user-profile-meta-label">Joined</div>
        </div>
      </div>
    </div>
  )
}
