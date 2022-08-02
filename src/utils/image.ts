export const getPokemonImage = (sprites: any): string =>
  JSON.parse(sprites?.[0]?.sprites)?.front_default;
