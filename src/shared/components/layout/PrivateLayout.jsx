/**
 * Private Layout — for authenticated pages (dashboard)
 * Contains Sidebar, Header, Main Content Area, and Footer
 */

import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

export function PrivateLayout({ children, activePage, onNavigate, title, subtitle }) {
  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <div className="app-main-area">
        <Header />
        <main className="app-content">
          {title && <h1 className="page-title">{title}</h1>}
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
