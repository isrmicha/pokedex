export const getPokemonImage = (sprites): string =>
  JSON.parse(sprites?.[0]?.sprites)?.front_default;
