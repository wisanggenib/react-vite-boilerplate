/**
 * Auth Store (Zustand)
 * Manages authentication state in memory (lost on refresh/restart)
 * as per user requirements.
 */

import { create } from 'zustand'
import { env } from '../config/env'

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,

    login: async ({ email, password }) => {
        set({ isLoading: true, error: null })

        // Simple logic: Check against ENV values
        // In a real app, this would be an API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === env.AUTH_EMAIL && password === env.AUTH_PASSWORD) {
                    const user = {
                        id: '1',
                        email: email,
                        name: 'Admin User',
                        role: 'admin',
                    }
                    const token = 'mock-jwt-token-' + Date.now()

                    set({
                        user,
                        token,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    })
                    resolve(user)
                } else {
                    set({
                        isLoading: false,
                        error: 'Invalid email or password',
                    })
                    reject(new Error('Invalid email or password'))
                }
            }, 500)
        })
    },

    logout: () => {
        set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
        })
    },
}))
