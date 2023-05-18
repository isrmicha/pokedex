import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FavoriteWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => FavoriteWhereInputObjectSchema),
        z.lazy(() => FavoriteWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => FavoriteWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => FavoriteWhereInputObjectSchema),
        z.lazy(() => FavoriteWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    pokemonIds: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
      .optional(),
  })
  .strict();

export const FavoriteWhereInputObjectSchema = Schema;
