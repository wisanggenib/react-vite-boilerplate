/**
 * CharacterList — displays paginated Rick & Morty characters from GraphQL
 */

import { useState } from 'react'
import { useCharacters } from '../hooks/useCharacters'
import { Button } from '../../../shared/components/ui/Button'
import { Skeleton } from '../../../shared/components/ui/Skeleton'
import './characters.css'

export function CharacterList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, error, isFetching } = useCharacters(page)

  if (isLoading) {
    return (
      <div className="character-grid">
        {Array.from({ length: 20 }).map((_, i) => (
          <Skeleton key={i} style={{ height: '56px', borderRadius: 'var(--radius-lg)' }} />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="character-error">
        Failed to load characters: {error.message}
      </div>
    )
  }

  const { info, results } = data
  const totalPages = info.pages

  return (
    <div className="character-list">
      <div className={`character-grid ${isFetching ? 'character-fetching' : ''}`}>
        {results.map((character, i) => (
          <div key={i} className="character-card">
            {character.name}
          </div>
        ))}
      </div>

      <div className="pagination">
        <Button
          variant="secondary"
          size="sm"
          disabled={page === 1 || isFetching}
          onClick={() => setPage((p) => p - 1)}
        >
          ← Prev
        </Button>

        <span className="pagination-info">
          Page {page} / {totalPages}
        </span>

        <Button
          variant="secondary"
          size="sm"
          disabled={page === totalPages || isFetching}
          onClick={() => setPage((p) => p + 1)}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
