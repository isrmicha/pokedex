import { z } from 'zod';
import { ExampleSelectObjectSchema } from './objects/ExampleSelect.schema';
import { ExampleCreateInputObjectSchema } from './objects/ExampleCreateInput.schema';
import { ExampleUncheckedCreateInputObjectSchema } from './objects/ExampleUncheckedCreateInput.schema';

export const ExampleCreateOneSchema = z.object({
  select: ExampleSelectObjectSchema.optional(),
  data: z.union([
    ExampleCreateInputObjectSchema,
    ExampleUncheckedCreateInputObjectSchema,
  ]),
});
