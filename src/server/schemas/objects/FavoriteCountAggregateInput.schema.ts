import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FavoriteCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    pokemonIds: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const FavoriteCountAggregateInputObjectSchema = Schema;
