import { z } from 'zod';
import { FavoriteSelectObjectSchema } from './objects/FavoriteSelect.schema';
import { FavoriteWhereUniqueInputObjectSchema } from './objects/FavoriteWhereUniqueInput.schema';

export const FavoriteFindUniqueSchema = z.object({
  select: FavoriteSelectObjectSchema.optional(),
  where: FavoriteWhereUniqueInputObjectSchema,
});
