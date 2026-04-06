/**
 * Route configuration
 * Maps page IDs to their components
 */

import { LoginForm, RegisterForm, AuthGuard } from '../features/auth'
import { UserList } from '../features/users'
import { ProductList } from '../features/products'
import { CartSummary } from '../features/cart'
import { HomePage } from '../features/home'
import { CharacterList } from '../features/characters'

export function getPageComponent(pageId, { onAddToCart, onNavigate }) {
  switch (pageId) {
    case 'home':
      return {
        component: (
          <AuthGuard onNavigate={onNavigate}>
            <HomePage />
          </AuthGuard>
        ),
        title: 'Dashboard',
        subtitle: 'Welcome back',
      }
    case 'users':
      return {
        component: (
          <AuthGuard onNavigate={onNavigate}>
            <UserList />
          </AuthGuard>
        ),
        title: 'Users',
        subtitle: 'Manage team members and roles',
      }
    case 'products':
      return {
        component: (
          <AuthGuard onNavigate={onNavigate}>
            <ProductList onAddToCart={onAddToCart} />
          </AuthGuard>
        ),
        title: 'Products',
        subtitle: 'Browse and add items to your cart',
      }
    case 'cart':
      return {
        component: (
          <AuthGuard onNavigate={onNavigate}>
            <CartSummary />
          </AuthGuard>
        ),
        title: 'Shopping Cart',
        subtitle: 'Review your items and checkout',
      }
    case 'characters':
      return {
        component: (
          <AuthGuard onNavigate={onNavigate}>
            <CharacterList />
          </AuthGuard>
        ),
        title: 'Characters',
        subtitle: 'Rick & Morty characters from GraphQL',
      }
    case 'login':
      return {
        component: <LoginForm onSuccess={() => onNavigate('home')} />,
        title: 'Login',
        subtitle: 'Sign in to your account',
      }
    case 'register':
      return {
        component: <RegisterForm onSuccess={() => onNavigate('home')} />,
        title: 'Register',
        subtitle: 'Create a new account',
      }
    default:
      return null
  }
}
