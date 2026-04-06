/**
 * GraphQL Client — minimal wrapper for GraphQL POST requests
 *
 * Separate from apiClient because GraphQL uses a different protocol:
 * always POST with { query, variables } body, against a fixed endpoint.
 *
 * @example
 * import { graphqlClient } from '@/shared/lib/graphqlClient'
 *
 * const data = await graphqlClient.request(QUERY, { page: 1 })
 */

async function request(endpoint, query, variables = {}) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`)
  }

  const json = await response.json()

  if (json.errors?.length) {
    throw new Error(json.errors[0].message)
  }

  return json.data
}

export const graphqlClient = {
  request,
}
