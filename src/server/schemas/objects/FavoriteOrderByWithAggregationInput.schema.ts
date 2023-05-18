import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { FavoriteCountOrderByAggregateInputObjectSchema } from './FavoriteCountOrderByAggregateInput.schema';
import { FavoriteMaxOrderByAggregateInputObjectSchema } from './FavoriteMaxOrderByAggregateInput.schema';
import { FavoriteMinOrderByAggregateInputObjectSchema } from './FavoriteMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FavoriteOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    pokemonIds: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => FavoriteCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => FavoriteMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => FavoriteMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const FavoriteOrderByWithAggregationInputObjectSchema = Schema;
