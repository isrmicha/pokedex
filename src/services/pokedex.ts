import { useInfiniteQuery, useQuery, } from "@tanstack/react-query"
import { fetcher, } from "../services/fetcher"

const GetPokemonDocument = `
query getPokemon($id: Int) {
  data: pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
    id
    name
    sprites: pokemon_v2_pokemonsprites {
      sprites
    }
    height
    stats: pokemon_v2_pokemonstats{
      base_stat
      statName : pokemon_v2_stat{
        name
      }
    }
    types: pokemon_v2_pokemontypes{
      type: pokemon_v2_type {
        name
      }
    }
  }
}
   `

export const usePokemonGetQuery = (
    variables?: Record<string, any>,
    options?: Record<string, any>
) =>
    useQuery(
        ["getPokemon", variables,],
        (metaData) =>
            fetcher(GetPokemonDocument, {
                ...variables,
                ...(metaData.pageParam ?? {}),
            })(),
        options
    )

export const ListPokemonsQuery = `
query listPokemons($limit: Int, $offset: Int) {
  items: pokemon_v2_pokemon(limit: $limit, offset: $offset) {
    id
    name
    sprites: pokemon_v2_pokemonsprites {
      sprites
    }
    height
    stats: pokemon_v2_pokemonstats{
      base_stat
      statName : pokemon_v2_stat{
        name
      }
    }
    types: pokemon_v2_pokemontypes{
      type: pokemon_v2_type {
        name
      }
    }
  }
}
`

export const useInfinitePokemonsListQuery = <TData = unknown, TError = unknown>(
    _pageParamKey: "offset",
    variables?: Record<string, any>,
    options?: Record<string, any>
) =>
    useInfiniteQuery(
        ["getPokemons", variables,],
        (metaData) =>
            fetcher(ListPokemonsQuery, {
                ...variables,
                ...(metaData.pageParam ?? {}),
            })(),
        options
    )
