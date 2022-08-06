export type Pokemon = {
  id: number;
  name: string;
  sprites: { sprite: string }[];
  types: { type: { name: string } }[];
};
