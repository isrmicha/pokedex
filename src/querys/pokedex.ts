import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetcher } from "../services/fetcher";

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
   `;

export const usePokemonGetQuery = (variables?: any, options?: any) =>
  useQuery(
    ["getPokemon", variables],
    (metaData) =>
      fetcher(GetPokemonDocument, {
        ...variables,
        ...(metaData.pageParam ?? {}),
      })(),
    options
  );

const ListPokemonsQuery = `
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
`;

export const useInfinitePokemonsListQuery = (
  _pageParamKey: keyof any,
  variables?: any,
  options?: any
) =>
  useInfiniteQuery(
    ["getPokemons", variables],
    (metaData) =>
      fetcher(ListPokemonsQuery, {
        ...variables,
        ...(metaData.pageParam ?? {}),
      })(),
    options
  );
