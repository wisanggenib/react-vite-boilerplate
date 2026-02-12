/**
 * Product list — fetches and displays products in a grid
 */

import { useProducts } from '../hooks/useProducts'
import { ProductCard } from './ProductCard'
import { Skeleton } from '../../../shared/components/ui/Skeleton'

export function ProductList({ onAddToCart }) {
  const { products, loading, error } = useProducts()

  if (loading) {
    return (
      <div className="grid grid-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} variant="card" height="260px" />
        ))}
      </div>
    )
  }

  if (error) {
    return <p style={{ color: 'var(--color-danger)' }}>Error: {error}</p>
  }

  return (
    <div className="grid grid-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  )
}
