import { pokemonReducer } from './pokemon'
import { combineReducers } from 'redux'
export const Reducers = combineReducers({
  pokemon: pokemonReducer
})
