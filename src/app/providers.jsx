/**
 * Application Providers — wraps the app in all required context providers
 * AuthProvider removed as we use Zustand
 */

import { CartProvider } from '../features/cart'

export function AppProviders({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  )
}
