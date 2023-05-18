import { z } from 'zod';
import { ExampleSelectObjectSchema } from './objects/ExampleSelect.schema';
import { ExampleUpdateInputObjectSchema } from './objects/ExampleUpdateInput.schema';
import { ExampleUncheckedUpdateInputObjectSchema } from './objects/ExampleUncheckedUpdateInput.schema';
import { ExampleWhereUniqueInputObjectSchema } from './objects/ExampleWhereUniqueInput.schema';

export const ExampleUpdateOneSchema = z.object({
  select: ExampleSelectObjectSchema.optional(),
  data: z.union([
    ExampleUpdateInputObjectSchema,
    ExampleUncheckedUpdateInputObjectSchema,
  ]),
  where: ExampleWhereUniqueInputObjectSchema,
});
