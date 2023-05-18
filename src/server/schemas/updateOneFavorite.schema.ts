import { z } from 'zod';
import { FavoriteSelectObjectSchema } from './objects/FavoriteSelect.schema';
import { FavoriteUpdateInputObjectSchema } from './objects/FavoriteUpdateInput.schema';
import { FavoriteUncheckedUpdateInputObjectSchema } from './objects/FavoriteUncheckedUpdateInput.schema';
import { FavoriteWhereUniqueInputObjectSchema } from './objects/FavoriteWhereUniqueInput.schema';

export const FavoriteUpdateOneSchema = z.object({
  select: FavoriteSelectObjectSchema.optional(),
  data: z.union([
    FavoriteUpdateInputObjectSchema,
    FavoriteUncheckedUpdateInputObjectSchema,
  ]),
  where: FavoriteWhereUniqueInputObjectSchema,
});
