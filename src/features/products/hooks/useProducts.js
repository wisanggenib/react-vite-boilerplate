import { useState, useEffect } from 'react'
import { productService } from '../services/productService'

/**
 * Hook for fetching products
 *
 * @example
 * const { products, loading } = useProducts()
 */
export function useProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false

        async function fetchProducts() {
            try {
                const data = await productService.getAll()
                if (!cancelled) setProducts(data)
            } catch (err) {
                if (!cancelled) setError(err.message)
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        fetchProducts()
        return () => { cancelled = true }
    }, [])

    return { products, loading, error }
}
