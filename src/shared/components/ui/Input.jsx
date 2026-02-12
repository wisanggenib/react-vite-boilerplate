/**
 * Reusable Input component
 *
 * @example
 * <Input label="Email" type="email" placeholder="you@email.com" />
 * <Input label="Password" type="password" error="Min 8 characters" />
 */

import './ui.css'

export function Input({
  label,
  error,
  id,
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`input-wrapper ${error ? 'input-error' : ''}`}>
      {label && (
        <label className="input-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className="input-field"
        {...props}
      />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  )
}
