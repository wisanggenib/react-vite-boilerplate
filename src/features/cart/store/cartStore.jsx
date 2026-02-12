/**
 * Cart store — feature-specific state management using Context + useReducer
 *
 * @example
 * // Wrap app with CartProvider
 * <CartProvider><App /></CartProvider>
 *
 * // In any component:
 * const { items, addItem, removeItem, total } = useCart()
 */

import { createContext, useContext, useReducer, useMemo } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existing = state.items.find((i) => i.productId === action.payload.id)
            if (existing) {
                return {
                    ...state,
                    items: state.items.map((i) =>
                        i.productId === action.payload.id
                            ? { ...i, quantity: i.quantity + 1 }
                            : i,
                    ),
                }
            }
            return {
                ...state,
                items: [
                    ...state.items,
                    {
                        id: Date.now().toString(),
                        productId: action.payload.id,
                        name: action.payload.name,
                        price: action.payload.price,
                        image: action.payload.image,
                        quantity: 1,
                    },
                ],
            }
        }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter((i) => i.productId !== action.payload),
            }
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map((i) =>
                    i.productId === action.payload.productId
                        ? { ...i, quantity: Math.max(0, action.payload.quantity) }
                        : i,
                ).filter((i) => i.quantity > 0),
            }
        case 'CLEAR_CART':
            return { ...state, items: [] }
        default:
            return state
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] })

    const total = useMemo(
        () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [state.items],
    )

    const itemCount = useMemo(
        () => state.items.reduce((sum, item) => sum + item.quantity, 0),
        [state.items],
    )

    const addItem = (product) => dispatch({ type: 'ADD_ITEM', payload: product })
    const removeItem = (productId) => dispatch({ type: 'REMOVE_ITEM', payload: productId })
    const updateQuantity = (productId, quantity) =>
        dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
    const clearCart = () => dispatch({ type: 'CLEAR_CART' })

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                total,
                itemCount,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
