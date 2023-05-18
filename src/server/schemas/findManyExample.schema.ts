import { z } from 'zod';
import { ExampleSelectObjectSchema } from './objects/ExampleSelect.schema';
import { ExampleOrderByWithRelationInputObjectSchema } from './objects/ExampleOrderByWithRelationInput.schema';
import { ExampleWhereInputObjectSchema } from './objects/ExampleWhereInput.schema';
import { ExampleWhereUniqueInputObjectSchema } from './objects/ExampleWhereUniqueInput.schema';
import { ExampleScalarFieldEnumSchema } from './enums/ExampleScalarFieldEnum.schema';

export const ExampleFindManySchema = z.object({
  select: z.lazy(() => ExampleSelectObjectSchema.optional()),
  orderBy: z
    .union([
      ExampleOrderByWithRelationInputObjectSchema,
      ExampleOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ExampleWhereInputObjectSchema.optional(),
  cursor: ExampleWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(ExampleScalarFieldEnumSchema).optional(),
});
