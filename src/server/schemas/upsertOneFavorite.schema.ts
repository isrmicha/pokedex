import { z } from 'zod';
import { FavoriteSelectObjectSchema } from './objects/FavoriteSelect.schema';
import { FavoriteWhereUniqueInputObjectSchema } from './objects/FavoriteWhereUniqueInput.schema';
import { FavoriteCreateInputObjectSchema } from './objects/FavoriteCreateInput.schema';
import { FavoriteUncheckedCreateInputObjectSchema } from './objects/FavoriteUncheckedCreateInput.schema';
import { FavoriteUpdateInputObjectSchema } from './objects/FavoriteUpdateInput.schema';
import { FavoriteUncheckedUpdateInputObjectSchema } from './objects/FavoriteUncheckedUpdateInput.schema';

export const FavoriteUpsertSchema = z.object({
  select: FavoriteSelectObjectSchema.optional(),
  where: FavoriteWhereUniqueInputObjectSchema,
  create: z.union([
    FavoriteCreateInputObjectSchema,
    FavoriteUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    FavoriteUpdateInputObjectSchema,
    FavoriteUncheckedUpdateInputObjectSchema,
  ]),
});
