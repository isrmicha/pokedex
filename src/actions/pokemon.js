export const fetchPokemons = (next, prevPressed) => dispatch => {
  dispatch(fetchPokemonsRequest())
  let apiEndpoint = next || 'https://pokeapi.co/api/v2/pokemon/'
  let offset
  if (next) {
    const url = new URL(apiEndpoint)
    const args = new URLSearchParams(url.search)
    offset = parseInt(args.get('offset'))
    if (prevPressed) {
      offset = offset == 20 ? 0 : offset - 40
      args.set('offset', offset)
      apiEndpoint = `https://pokeapi.co/api/v2/pokemon/?${args.toString()}`
    }
  }
  return fetch(apiEndpoint)
    .then(response => response.json())
    .then(({ results, next }) =>
      dispatch(fetchPokemonsSuccess({ results, next, offset }))
    )
    .catch(err => dispatch(fetchPokemonsFailure(err)))
}

export const fetchPokemon = url => dispatch => {
  dispatch(fetchPokemonRequest())
  const apiEndpoint = url
  return fetch(apiEndpoint)
    .then(
      response => response.json(),
      err => dispatch(fetchPokemonsFailure(err))
    )
    .then(pokemon => dispatch(fetchPokemonSuccess(pokemon)))
}

export const fetchPokemonsRequest = () => ({
  type: 'POKEMONS_FETCH_REQUEST'
})

export const fetchPokemonsSuccess = response => ({
  type: 'POKEMONS_FETCH_SUCCESS',
  payload: response
})
export const fetchPokemonsFailure = () => ({
  type: 'POKEMONS_FETCH_FAILURE'
})

export const fetchPokemonRequest = () => ({
  type: 'POKEMON_FETCH_REQUEST'
})

export const fetchPokemonSuccess = pokemon => ({
  type: 'POKEMON_FETCH_SUCCESS',
  payload: pokemon
})
export const fetchPokemonFailure = () => ({
  type: 'POKEMON_FETCH_FAILURE'
})
export const clearCurrentPokemon = () => ({
  type: 'POKEMON_CURRENT_CLEAR'
})
