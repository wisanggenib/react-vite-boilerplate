/**
 * Application Providers — wraps the app in all required context providers
 * AuthProvider removed as we use Zustand
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CartProvider } from '../features/cart'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

export function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        {children}
      </CartProvider>
    </QueryClientProvider>
  )
}
