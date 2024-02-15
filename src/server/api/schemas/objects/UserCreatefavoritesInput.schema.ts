import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreatefavoritesInput> = z
  .object({
    set: z.string().array(),
  })
  .strict();

export const UserCreatefavoritesInputObjectSchema = Schema;
