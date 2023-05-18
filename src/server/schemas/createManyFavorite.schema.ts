import { z } from 'zod';
import { FavoriteCreateManyInputObjectSchema } from './objects/FavoriteCreateManyInput.schema';

export const FavoriteCreateManySchema = z.object({
  data: z.union([
    FavoriteCreateManyInputObjectSchema,
    z.array(FavoriteCreateManyInputObjectSchema),
  ]),
});