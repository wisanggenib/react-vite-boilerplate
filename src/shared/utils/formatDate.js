/**
 * Date formatting utilities
 *
 * @example
 * formatDate(new Date())                    // "12 Feb 2026"
 * formatDate(new Date(), 'long')            // "12 February 2026"
 * formatRelativeTime(new Date(Date.now() - 60000)) // "1 minute ago"
 */

export function formatDate(date, style = 'medium') {
    const d = new Date(date)

    const options = {
        short: { day: 'numeric', month: 'short' },
        medium: { day: 'numeric', month: 'short', year: 'numeric' },
        long: { day: 'numeric', month: 'long', year: 'numeric' },
    }

    return d.toLocaleDateString('en-US', options[style] || options.medium)
}

export function formatRelativeTime(date) {
    const now = Date.now()
    const diff = now - new Date(date).getTime()
    const seconds = Math.floor(diff / 1000)

    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minute(s) ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hour(s) ago`
    return `${Math.floor(seconds / 86400)} day(s) ago`
}
