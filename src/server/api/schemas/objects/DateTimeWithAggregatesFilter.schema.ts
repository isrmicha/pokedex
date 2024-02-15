import { z } from 'zod';
import { NestedDateTimeWithAggregatesFilterObjectSchema } from './NestedDateTimeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedDateTimeFilterObjectSchema } from './NestedDateTimeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z
  .object({
    equals: z.date().optional(),
    in: z.union([z.date().array(), z.date()]).optional(),
    notIn: z.union([z.date().array(), z.date()]).optional(),
    lt: z.date().optional(),
    lte: z.date().optional(),
    gt: z.date().optional(),
    gte: z.date().optional(),
    not: z
      .union([
        z.date(),
        z.lazy(() => NestedDateTimeWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterObjectSchema).optional(),
  })
  .strict();

export const DateTimeWithAggregatesFilterObjectSchema = Schema;
