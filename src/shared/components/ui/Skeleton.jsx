/**
 * Skeleton loading placeholder
 *
 * @example
 * <Skeleton variant="text" />
 * <Skeleton variant="title" />
 * <Skeleton variant="avatar" />
 * <Skeleton variant="card" width="100%" height="200px" />
 */

import './ui.css'

export function Skeleton({ variant = 'text', width, height, style = {} }) {
  const className = `skeleton skeleton-${variant}`

  return (
    <div
      className={className}
      style={{
        ...(width && { width }),
        ...(height && { height }),
        ...style,
      }}
    />
  )
}
