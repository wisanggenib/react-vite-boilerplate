/**
 * Character service — GraphQL queries against the Rick and Morty API
 */

import { graphqlClient } from '../../../shared/lib/graphqlClient'

const ENDPOINT = 'https://rickandmortyapi.com/graphql'

const GET_CHARACTERS = `
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        name
      }
    }
  }
`

export const characterService = {
  /**
   * @param {number} page
   * @returns {Promise<import('../types/character.types').CharactersResponse>}
   */
  getCharacters: (page = 1) =>
    graphqlClient
      .request(ENDPOINT, GET_CHARACTERS, { page })
      .then((data) => data.characters),
}
