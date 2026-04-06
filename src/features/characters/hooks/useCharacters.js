/**
 * useCharacters — fetches paginated characters via TanStack React Query
 */

import { useQuery } from '@tanstack/react-query'
import { characterService } from '../services/characterService'

export function useCharacters(page) {
  return useQuery({
    queryKey: ['characters', page],
    queryFn: () => characterService.getCharacters(page),
    placeholderData: (previousData) => previousData, // keep previous data while loading next page
  })
}
