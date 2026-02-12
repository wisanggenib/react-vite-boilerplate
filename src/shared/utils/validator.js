/**
 * Validation utility functions
 *
 * @example
 * isEmail('test@example.com')   // true
 * isRequired('')                // false
 * minLength('abc', 5)           // false
 */

export function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function isRequired(value) {
    return value !== null && value !== undefined && String(value).trim().length > 0
}

export function minLength(value, min) {
    return String(value).length >= min
}

export function maxLength(value, max) {
    return String(value).length <= max
}

/**
 * Run multiple validators on a value
 *
 * @example
 * const errors = validate('ab', [
 *   [isRequired, 'Email is required'],
 *   [isEmail, 'Invalid email format'],
 * ])
 * // => ['Invalid email format']
 */
export function validate(value, rules) {
    const errors = []
    for (const [fn, message] of rules) {
        if (!fn(value)) {
            errors.push(message)
        }
    }
    return errors
}
