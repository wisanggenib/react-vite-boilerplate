/**
 * Product card component
 */

import { Button } from '../../../shared/components/ui/Button'
import './products.css'

export function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card card">
      <div className="product-card-image">{product.image}</div>
      <div className="product-card-body">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-desc">{product.description}</p>
        <div className="product-card-footer">
          <span className="product-card-price">${product.price.toFixed(2)}</span>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onAddToCart?.(product)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
