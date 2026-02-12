/**
 * User list — fetches and displays all users
 *
 * @example
 * <UserList />
 */

import { useUsers } from '../hooks/useUsers'
import { UserCard } from './UserCard'
import { Skeleton } from '../../../shared/components/ui/Skeleton'

export function UserList() {
  const { users, loading, error } = useUsers()

  if (loading) {
    return (
      <div className="grid grid-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} variant="card" height="100px" />
        ))}
      </div>
    )
  }

  if (error) {
    return <p style={{ color: 'var(--color-danger)' }}>Error: {error}</p>
  }

  return (
    <div className="grid grid-2">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
