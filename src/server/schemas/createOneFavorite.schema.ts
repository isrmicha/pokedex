import { z } from 'zod';
import { FavoriteSelectObjectSchema } from './objects/FavoriteSelect.schema';
import { FavoriteCreateInputObjectSchema } from './objects/FavoriteCreateInput.schema';
import { FavoriteUncheckedCreateInputObjectSchema } from './objects/FavoriteUncheckedCreateInput.schema';

export const FavoriteCreateOneSchema = z.object({
  select: FavoriteSelectObjectSchema.optional(),
  data: z.union([
    FavoriteCreateInputObjectSchema,
    FavoriteUncheckedCreateInputObjectSchema,
  ]),
});
