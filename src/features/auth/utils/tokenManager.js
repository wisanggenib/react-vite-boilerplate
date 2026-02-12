/**
 * Token management utilities
 *
 * @example
 * tokenManager.setToken('abc123')
 * tokenManager.getToken()   // "abc123"
 * tokenManager.clearToken()
 */

import { AUTH_CONSTANTS } from '../constants'

export const tokenManager = {
    getToken() {
        return localStorage.getItem(AUTH_CONSTANTS.TOKEN_KEY)
    },

    setToken(token) {
        localStorage.setItem(AUTH_CONSTANTS.TOKEN_KEY, token)
    },

    clearToken() {
        localStorage.removeItem(AUTH_CONSTANTS.TOKEN_KEY)
        localStorage.removeItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY)
        localStorage.removeItem(AUTH_CONSTANTS.TOKEN_EXPIRY_KEY)
    },

    isTokenValid() {
        const token = this.getToken()
        if (!token) return false

        const expiry = localStorage.getItem(AUTH_CONSTANTS.TOKEN_EXPIRY_KEY)
        if (expiry && Date.now() > Number(expiry)) {
            this.clearToken()
            return false
        }
        return true
    },
}
