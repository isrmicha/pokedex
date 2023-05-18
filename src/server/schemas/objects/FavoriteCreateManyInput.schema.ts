import { z } from 'zod';
import { FavoriteCreatepokemonIdsInputObjectSchema } from './FavoriteCreatepokemonIdsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FavoriteCreateManyInput> = z
  .object({
    id: z.string(),
    pokemonIds: z
      .union([
        z.lazy(() => FavoriteCreatepokemonIdsInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  .strict();

export const FavoriteCreateManyInputObjectSchema = Schema;
