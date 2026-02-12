/**
 * Cart summary — shows items, total, and checkout button
 */

import { useCart } from '../store/cartStore'
import { CartItem } from './CartItem'
import { Button } from '../../../shared/components/ui/Button'
import './cart.css'

export function CartSummary() {
  const { items, total, itemCount, removeItem, updateQuantity, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="cart-empty card">
        <div className="cart-empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some products to get started!</p>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {items.map((item) => (
          <CartItem
            key={item.productId}
            item={item}
            onRemove={removeItem}
            onUpdateQuantity={updateQuantity}
          />
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>Items</span>
          <span>{itemCount}</span>
        </div>
        <div className="cart-summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="cart-summary-total">
          <span>Total</span>
          <span className="cart-summary-total-value">${total.toFixed(2)}</span>
        </div>
        <Button variant="primary" size="lg">
          Checkout
        </Button>
        <Button variant="secondary" size="sm" onClick={clearCart} style={{ marginTop: 'var(--space-2)' }}>
          Clear Cart
        </Button>
      </div>
    </div>
  )
}
