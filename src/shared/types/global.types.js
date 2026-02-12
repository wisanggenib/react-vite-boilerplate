/**
 * Global shared types (using JSDoc for type hints)
 *
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {*} data
 * @property {string} [message]
 *
 * @typedef {Object} PaginatedResponse
 * @property {Array} items
 * @property {number} total
 * @property {number} page
 * @property {number} pageSize
 *
 * @typedef {'idle' | 'loading' | 'success' | 'error'} RequestStatus
 */

export const REQUEST_STATUS = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
}
