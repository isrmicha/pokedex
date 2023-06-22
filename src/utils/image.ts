export const getPokemonImage = (id: number): string =>
  id > 500
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    : `https://raw.githubusercontent.com/geekygreek7/animated-pokemon-gifs/master/${id}.gif`;
