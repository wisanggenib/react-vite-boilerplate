import { useState } from 'react'
import { useAuthStore } from '../../../store/authStore'

/**
 * Login form logic hook
 * Uses Zustand store actions
 */
export function useLogin() {
    const login = useAuthStore((state) => state.login)
    const isLoading = useAuthStore((state) => state.isLoading)
    const authError = useAuthStore((state) => state.error)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [localError, setLocalError] = useState(null)

    const handleSubmit = async (e) => {
        e?.preventDefault()
        setLocalError(null)

        try {
            await login({ email, password })
        } catch (err) {
            setLocalError(err.message)
        }
    }

    return {
        email,
        password,
        setEmail,
        setPassword,
        handleSubmit,
        loading: isLoading,
        error: localError || authError
    }
}
