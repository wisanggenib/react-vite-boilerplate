import { useState, useEffect } from 'react'
import { userService } from '../services/userService'

/**
 * Hook for fetching users
 *
 * @example
 * const { users, loading, error } = useUsers()
 */
export function useUsers() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false

        async function fetchUsers() {
            try {
                const data = await userService.getAll()
                if (!cancelled) {
                    setUsers(data)
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message)
                }
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        fetchUsers()
        return () => { cancelled = true }
    }, [])

    return { users, loading, error }
}
