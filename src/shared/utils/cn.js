/**
 * ClassName merger utility
 * Simplified version (no tailwind-merge dependency)
 *
 * @example
 * cn('btn', isActive && 'btn-active', className)
 * // => "btn btn-active custom-class"
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(' ')
}
