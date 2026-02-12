/**
 * Auth API service
 *
 * @example
 * const { token, user } = await authService.login({ email, password })
 */

import { apiClient } from '../../../shared/lib/apiClient'

export const authService = {
    async login(credentials) {
        // In a real app: return apiClient.post('/auth/login', credentials)
        // Demo: simulate API response
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    token: 'demo-jwt-token-' + Date.now(),
                    user: {
                        id: '1',
                        email: credentials.email,
                        name: credentials.email.split('@')[0],
                    },
                })
            }, 800)
        })
    },

    async register(data) {
        // In a real app: return apiClient.post('/auth/register', data)
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    token: 'demo-jwt-token-' + Date.now(),
                    user: {
                        id: '2',
                        email: data.email,
                        name: data.name,
                    },
                })
            }, 800)
        })
    },

    async logout() {
        // In a real app: return apiClient.post('/auth/logout')
        return new Promise((resolve) => setTimeout(resolve, 300))
    },

    async getProfile() {
        // In a real app: return apiClient.get('/auth/me')
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: '1',
                    email: 'demo@example.com',
                    name: 'Demo User',
                })
            }, 500)
        })
    },
}
