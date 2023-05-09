export const getPokemonImage = (sprites: any): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/${JSON.parse(sprites?.[0]?.sprites)?.front_default?.replaceAll('media', '')}`;
