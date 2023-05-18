import { z } from 'zod';
import { FavoriteSelectObjectSchema } from './FavoriteSelect.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.FavoriteArgs> = z
  .object({
    select: z.lazy(() => FavoriteSelectObjectSchema).optional(),
  })
  .strict();

export const FavoriteArgsObjectSchema = Schema;
