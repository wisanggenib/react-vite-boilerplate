import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * ClassName merger utility — menggabungkan clsx dan tailwind-merge.
 * Aman digunakan untuk class biasa maupun Tailwind utility class
 * (conflict resolution otomatis, e.g. "p-2 p-4" → "p-4").
 *
 * @example
 * cn('btn', isActive && 'btn-active', className)
 * cn('px-2 py-1', 'px-4')  // => "py-1 px-4"
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs))
}
