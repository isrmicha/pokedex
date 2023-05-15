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
export const ListPokemonsQueryByIds = `
query listPokemons($ids: [Int]) {
  items: pokemon_v2_pokemon(where: {id: {_in: $ids}}) {
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

