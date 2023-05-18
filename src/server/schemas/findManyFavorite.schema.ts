import { z } from 'zod';
import { FavoriteSelectObjectSchema } from './objects/FavoriteSelect.schema';
import { FavoriteOrderByWithRelationInputObjectSchema } from './objects/FavoriteOrderByWithRelationInput.schema';
import { FavoriteWhereInputObjectSchema } from './objects/FavoriteWhereInput.schema';
import { FavoriteWhereUniqueInputObjectSchema } from './objects/FavoriteWhereUniqueInput.schema';
import { FavoriteScalarFieldEnumSchema } from './enums/FavoriteScalarFieldEnum.schema';

export const FavoriteFindManySchema = z.object({
  select: z.lazy(() => FavoriteSelectObjectSchema.optional()),
  orderBy: z
    .union([
      FavoriteOrderByWithRelationInputObjectSchema,
      FavoriteOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: FavoriteWhereInputObjectSchema.optional(),
  cursor: FavoriteWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(FavoriteScalarFieldEnumSchema).optional(),
});
