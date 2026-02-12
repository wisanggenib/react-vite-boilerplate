/**
 * Single cart item row
 */

import { Button } from '../../../shared/components/ui/Button'
import './cart.css'

export function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="cart-item">
      <div className="cart-item-image">{item.image}</div>
      <div className="cart-item-info">
        <h4 className="cart-item-name">{item.name}</h4>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
      </div>
      <div className="cart-item-controls">
        <button
          className="qty-btn"
          onClick={() => onUpdateQuantity?.(item.productId, item.quantity - 1)}
        >
          −
        </button>
        <span className="qty-value">{item.quantity}</span>
        <button
          className="qty-btn"
          onClick={() => onUpdateQuantity?.(item.productId, item.quantity + 1)}
        >
          +
        </button>
      </div>
      <div className="cart-item-subtotal">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
      <Button variant="ghost" size="sm" onClick={() => onRemove?.(item.productId)}>
        ✕
      </Button>
    </div>
  )
}
