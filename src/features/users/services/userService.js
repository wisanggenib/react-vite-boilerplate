/**
 * User API service
 *
 * @example
 * const users = await userService.getAll()
 * const user = await userService.getById('1')
 */

// import { apiClient } from '../../../shared/lib/apiClient'

// Demo data
const DEMO_USERS = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', avatar: '👩‍💼', joinedAt: '2025-01-15' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'User', avatar: '👨‍💻', joinedAt: '2025-03-22' },
    { id: '3', name: 'Carol Williams', email: 'carol@example.com', role: 'User', avatar: '👩‍🎨', joinedAt: '2025-06-10' },
    { id: '4', name: 'David Brown', email: 'david@example.com', role: 'Moderator', avatar: '👨‍🔧', joinedAt: '2025-08-05' },
]

export const userService = {
    async getAll() {
        // In a real app: return apiClient.get('/users')
        return new Promise((resolve) => {
            setTimeout(() => resolve(DEMO_USERS), 600)
        })
    },

    async getById(id) {
        // In a real app: return apiClient.get(`/users/${id}`)
        return new Promise((resolve) => {
            setTimeout(() => resolve(DEMO_USERS.find((u) => u.id === id)), 400)
        })
    },
}
