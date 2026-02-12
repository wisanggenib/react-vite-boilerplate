/**
 * Auth types (JSDoc)
 *
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {string} [avatar]
 *
 * @typedef {Object} LoginCredentials
 * @property {string} email
 * @property {string} password
 *
 * @typedef {Object} RegisterData
 * @property {string} email
 * @property {string} password
 * @property {string} name
 *
 * @typedef {Object} AuthState
 * @property {User|null} user
 * @property {string|null} token
 * @property {boolean} isAuthenticated
 */

export const AUTH_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest',
}
