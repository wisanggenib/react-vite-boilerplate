/**
 * Cart service (API calls)
 */

export const cartService = {
    async checkout(items) {
        // In a real app: return apiClient.post('/cart/checkout', { items })
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ orderId: 'ORD-' + Date.now(), status: 'confirmed' })
            }, 1000)
        })
    },
}
