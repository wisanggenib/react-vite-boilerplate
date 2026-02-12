/**
 * API Client — fetch wrapper with base URL and error handling
 *
 * @example
 * import { apiClient } from '@/shared/lib/apiClient'
 *
 * // GET
 * const users = await apiClient.get('/users')
 *
 * // POST
 * const newUser = await apiClient.post('/users', { name: 'John' })
 */

import { env } from '../../config/env'

const BASE_URL = env.API_URL

async function request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    }

    // Attach auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(url, config)

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }))
        throw new Error(error.message || 'API request failed')
    }

    return response.json()
}

export const apiClient = {
    get: (endpoint) => request(endpoint, { method: 'GET' }),
    post: (endpoint, data) => request(endpoint, { method: 'POST', body: JSON.stringify(data) }),
    put: (endpoint, data) => request(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
    patch: (endpoint, data) => request(endpoint, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
}
