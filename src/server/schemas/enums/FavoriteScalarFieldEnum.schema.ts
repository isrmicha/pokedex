import { z } from 'zod';

export const FavoriteScalarFieldEnumSchema = z.enum([
  'id',
  'pokemonIds',
  'createdAt',
  'updatedAt',
]);
