/**
 * Product API service
 */

const DEMO_PRODUCTS = [
    { id: '1', name: 'Wireless Headphones', description: 'Premium noise-cancelling headphones', price: 299.99, image: '🎧', category: 'electronics', stock: 15 },
    { id: '2', name: 'React T-Shirt', description: 'Comfortable cotton t-shirt with React logo', price: 29.99, image: '👕', category: 'clothing', stock: 50 },
    { id: '3', name: 'Clean Code Book', description: 'A handbook of agile software craftsmanship', price: 39.99, image: '📘', category: 'books', stock: 30 },
    { id: '4', name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard with Cherry MX switches', price: 149.99, image: '⌨️', category: 'electronics', stock: 8 },
    { id: '5', name: 'Coffee Beans', description: 'Premium arabica coffee beans, 1kg', price: 24.99, image: '☕', category: 'food', stock: 100 },
    { id: '6', name: 'USB-C Hub', description: '7-in-1 USB-C multiport adapter', price: 59.99, image: '🔌', category: 'electronics', stock: 25 },
]

export const productService = {
    async getAll() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(DEMO_PRODUCTS), 500)
        })
    },

    async getById(id) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(DEMO_PRODUCTS.find((p) => p.id === id)), 300)
        })
    },

    async getByCategory(category) {
        return new Promise((resolve) => {
            setTimeout(
                () => resolve(DEMO_PRODUCTS.filter((p) => p.category === category)),
                400,
            )
        })
    },
}
