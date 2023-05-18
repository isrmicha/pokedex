import { z } from 'zod';
import { ExampleSelectObjectSchema } from './ExampleSelect.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ExampleArgs> = z
  .object({
    select: z.lazy(() => ExampleSelectObjectSchema).optional(),
  })
  .strict();

export const ExampleArgsObjectSchema = Schema;
