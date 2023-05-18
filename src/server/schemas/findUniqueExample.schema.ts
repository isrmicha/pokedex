import { z } from 'zod';
import { ExampleSelectObjectSchema } from './objects/ExampleSelect.schema';
import { ExampleWhereUniqueInputObjectSchema } from './objects/ExampleWhereUniqueInput.schema';

export const ExampleFindUniqueSchema = z.object({
  select: ExampleSelectObjectSchema.optional(),
  where: ExampleWhereUniqueInputObjectSchema,
});
