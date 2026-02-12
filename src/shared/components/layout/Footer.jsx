/**
 * App Footer
 *
 * @example
 * <Footer />
 */

import './layout.css'

export function Footer() {
  return (
    <footer className="footer">
      <p>
        © 2026 React Feature Architecture —{' '}
        <a className="footer-link" href="https://react.dev" target="_blank" rel="noreferrer">
          React
        </a>{' '}
        +{' '}
        <a className="footer-link" href="https://vitejs.dev" target="_blank" rel="noreferrer">
          Vite
        </a>
      </p>
    </footer>
  )
}
