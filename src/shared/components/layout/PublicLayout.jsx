/**
 * Public Layout — for login/register pages
 * Simple centered layout without sidebar/header
 */

export function PublicLayout({ children }) {
  return (
    <div className="public-layout" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--color-bg)',
      padding: 'var(--space-4)'
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        {children}
      </div>
    </div>
  )
}
