import { useQuery } from "@tanstack/react-query";
import { POKEAPI_ENDPOINT, POKEMON_QUERY_KEY } from "../constants/query";
import { request, gql } from "graphql-request";

export const getPokemonsQuery = async ({ pageParam = 0 }) => {
  const { pokemon_v2_pokemon } = await request(
    POKEAPI_ENDPOINT,
    gql`
      query {
        pokemon_v2_pokemon(limit: 20, offset: ${pageParam}) {
          id
          name
          sprites: pokemon_v2_pokemonsprites {
            sprites
          }
          types: pokemon_v2_pokemontypes{
            type: pokemon_v2_type {
              name
            }
          }
        }
      }
    `
  );
  return pokemon_v2_pokemon;
};

export const usePokemonQuery = (id: number) => {
  return useQuery([POKEMON_QUERY_KEY, id], async () => {
    const { pokemon_v2_pokemon } = await request(
      POKEAPI_ENDPOINT,
      gql`
      query {
        pokemon_v2_pokemon(where: {id: {_eq: ${id}}}) {
          id
          name
          sprites: pokemon_v2_pokemonsprites {
            sprites
          }
          types: pokemon_v2_pokemontypes{
            type: pokemon_v2_type {
              name
            }
          }
        }
      }
      `
    );
    return pokemon_v2_pokemon?.[0];
  });
};
