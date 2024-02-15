import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedDateTimeFilter> = z
  .object({
    equals: z.date().optional(),
    in: z.union([z.date().array(), z.date()]).optional(),
    notIn: z.union([z.date().array(), z.date()]).optional(),
    lt: z.date().optional(),
    lte: z.date().optional(),
    gt: z.date().optional(),
    gte: z.date().optional(),
    not: z
      .union([z.date(), z.lazy(() => NestedDateTimeFilterObjectSchema)])
      .optional(),
  })
  .strict();

export const NestedDateTimeFilterObjectSchema = Schema;
