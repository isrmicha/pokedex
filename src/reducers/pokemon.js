const initialState = {
  pokemons: null,
  status: null,
  currentPokemon: null,
  offset: 0
}
export const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POKEMONS_FETCH_REQUEST':
      return {
        status: 'loading'
      }
    case 'POKEMONS_FETCH_SUCCESS': {
      const { results, next, offset } = action.payload
      return {
        pokemons: results,
        next,
        status: 'done',
        offset
      }
    }

    case 'POKEMONS_FETCH_FAILURE':
      return {
        status: 'error'
      }
    case 'POKEMON_FETCH_REQUEST':
      return {
        ...state,
        currentPokemon: { status: 'loading' }
      }
    case 'POKEMON_FETCH_SUCCESS':
      return {
        ...state,
        currentPokemon: Object.assign({ status: 'done' }, action.payload)
      }
    case 'POKEMON_FETCH_FAILURE':
      return {
        ...state,
        currentPokemon: { status: 'error' }
      }
    case 'POKEMON_CURRENT_CLEAR':
      return {
        ...state,
        currentPokemon: null
      }
    default:
      return state
  }
}
