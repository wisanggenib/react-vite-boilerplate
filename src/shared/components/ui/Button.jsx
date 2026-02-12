/**
 * Reusable Button component
 *
 * @example
 * import { Button } from '@/shared/components/ui/Button'
 * <Button variant="primary" onClick={handleClick}>Save</Button>
 * <Button variant="danger" size="sm">Delete</Button>
 */

import './ui.css'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}) {
  const className = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    loading && 'btn-loading',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={className}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="btn-spinner" />}
      {children}
    </button>
  )
}
