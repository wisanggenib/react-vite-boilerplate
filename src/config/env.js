/**
 * Centralized environment configuration
 * Runtime env (Docker) takes priority, fallback to Vite build-time env
 */

export const env = {
    // App
    APP_NAME: window.__ENV?.VITE_APP_NAME || import.meta.env.VITE_APP_NAME || 'React App',
    USER: window.__ENV?.VITE_USER || import.meta.env.VITE_USER || 'Guest',

    // Auth Credentials (for simple login)
    AUTH_EMAIL: window.__ENV?.VITE_AUTH_EMAIL || import.meta.env.VITE_AUTH_EMAIL || 'admin@example.com',
    AUTH_PASSWORD: window.__ENV?.VITE_AUTH_PASSWORD || import.meta.env.VITE_AUTH_PASSWORD || 'admin123',

    // API
    API_URL: window.__ENV?.VITE_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:3000/api',

    // Feature flags
    ENABLE_AUTH: window.__ENV?.VITE_ENABLE_AUTH || import.meta.env.VITE_ENABLE_AUTH || 'true',
}
