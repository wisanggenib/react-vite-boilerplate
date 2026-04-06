/**
 * App Sidebar — navigation menu
 * Dynamic items based on auth state
 */

import { useAuth } from '../../../features/auth'
import './layout.css'

export function Sidebar({ activePage = 'home', onNavigate }) {
  const { logout } = useAuth()

  // Define nav items dynamically or filter them
  const navItems = [
    { section: 'Main', items: [
      { id: 'home', label: 'Home', icon: '🏠' },
      { id: 'users', label: 'Users', icon: '👥' },
      { id: 'products', label: 'Products', icon: '📦' },
      { id: 'cart', label: 'Cart', icon: '🛒' },
      { id: 'characters', label: 'Characters', icon: '👾' },
    ]},
    { section: 'Account', items: [
      // Replaced Login/Register with Logout since Sidebar is valid only for auth users
      { id: 'logout', label: 'Logout', icon: '🚪', action: logout },
    ]},
  ]

  const handleItemClick = (item) => {
    if (item.action) {
      item.action()
    } else {
      onNavigate?.(item.id)
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand">⚛️ ReactApp</div>
        <div className="sidebar-subtitle">Feature Architecture</div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((group) => (
          <div key={group.section}>
            <div className="sidebar-section-label">{group.section}</div>
            {group.items.map((item) => (
              <button
                key={item.id}
                className={`sidebar-link ${activePage === item.id ? 'active' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                <span className="sidebar-link-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}
